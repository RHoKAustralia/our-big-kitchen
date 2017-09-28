import React from "react";
import DateTimePicker from "react-datetime";
import "react-datetime/css/react-datetime.css";
import moment from "moment";

import { base } from "../firebase/init";
import { withRouter, Link } from "react-router-dom";

export default withRouter(
  class EditEvent extends React.Component {
    constructor(props) {
      super(props);

      this.state = {};
    }

    componentDidMount() {
      base.fetch(`opportunities/${this.props.match.params.id}`, {
        context: this,
        then: data => {
          this.setState({
            event: {
              ...data,
              start: moment(data.start),
              finish: moment(data.finish)
            }
          });
        }
      });
    }

    onChangeEvent(key, event) {
      const newValue = event.target.value;

      this.onChange(key, newValue);
    }

    onChange(key, value) {
      this.setState(state => ({
        event: {
          ...state.event,
          [key]: value
        }
      }));
    }

    onDelete(event) {
      event.preventDefault();

      if (
        window.confirm(
          `Are you sure you want to delete ${this.state.event.title}?`
        )
      ) {
        base
          .remove(`opportunities/${this.props.match.params.id}`)
          .then(result => this.props.history.push("/events"))
          .catch(error => {
            this.setState({
              error
            });
          });
      }
    }

    onSave(event) {
      event.preventDefault();
      const stateEvent = this.state.event;

      const format = "YYYY-MM-DDTHH:mm:ssZZ";

      base
        .update(`opportunities/${this.props.match.params.id}`, {
          data: {
            ...stateEvent,
            start: stateEvent.start.format(format),
            finish: stateEvent.finish.format(format)
          }
        })
        .then(() => {
          this.props.history.push(`/events/${this.props.match.params.id}`);
        })
        .catch(error => {
          this.setState({
            error
          });
        });
    }

    render() {
      const event = this.state.event;

      return event ? (
        <div>
          <Link to={`/events/${this.props.match.params.id}`}>Back</Link>
          {this.state.error && <div>Error: {this.state.error.message}</div>}
          <div>
            <label>
              Title:{" "}
              <input
                type="text"
                value={event.title}
                onChange={this.onChangeEvent.bind(this, "title")}
              />
            </label>
          </div>
          <div>
            <label>
              Description: <br />
              <textarea
                value={event.description}
                onChange={this.onChangeEvent.bind(this, "description")}
              />
            </label>
          </div>
          <div>
            <label>
              Event Type:{" "}
              <input
                type="text"
                value={event.event_type}
                onChange={this.onChangeEvent.bind(this, "event_type")}
              />
            </label>
          </div>
          <div>
            <label>
              Start:{" "}
              <DateTimePicker
                value={event.start}
                onChange={this.onChange.bind(this, "start")}
              />
            </label>
          </div>
          <div>
            <label>
              End:{" "}
              <DateTimePicker
                value={event.finish}
                onChange={this.onChange.bind(this, "finish")}
              />
            </label>
          </div>
          <div>
            <label>
              Spots Left:{" "}
              <input
                type="text"
                value={event.spots_left}
                onChange={this.onChangeEvent.bind(this, "spots_left")}
              />
            </label>
          </div>
          <div>
            <label>
              Max Volunteers:{" "}
              <input
                type="text"
                value={event.max_volunteers}
                onChange={this.onChangeEvent.bind(this, "max_volunteers")}
              />
            </label>
          </div>
          <button onClick={this.onDelete.bind(this)}>Delete</button>{" "}
          <button onClick={this.onSave.bind(this)}>Save</button>
        </div>
      ) : (
        <div>Loading...</div>
      );
    }
  }
);
