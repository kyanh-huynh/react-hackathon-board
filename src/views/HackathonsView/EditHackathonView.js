import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, Field, Form, actions} from 'react-redux-form';
import { actions as hackathonActions } from '../../redux/modules/hackathon';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import DropzoneSingleImageComponent from '../HacksView/DropzoneComponent';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import DatePickerCss from 'react-datepicker/dist/react-datepicker.css';
import ReactMarkdown from 'react-markdown';
import { Translate, Localize } from 'react-i18nify';

type
Props = {
  hackathon: object,
  fetchFromServer: Function,
  updateToSever: Function,
  reset: Function
};

var DatePickerStartInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon ? this.props.hackathon.startDate : {}) };
  },

  handleChange: function(date) {
    this.props.hackathon.startDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="three wide field">
        <label>
          <Translate value="hackathon.startDate"/>
        </label>
        <DatePicker name="startDate"
        selected={this.state.value}
        onChange={this.handleChange} />
      </span>);
  }
});

var DatePickerEndInput = React.createClass({
  getInitialState: function() {
    return {value: moment(this.props.hackathon ? this.props.hackathon.endDate : {}) };
  },

  handleChange: function(date) {
    this.props.hackathon.endDate = date;
    this.setState({
      value: date
    });
  },

  render: function() {
    return (
      <span className="three wide field">
      <label>
        <Translate value="hackathon.endDate"/>
      </label>
        <DatePicker selected={this.state.value} onChange={this.handleChange} name="endDate" />
      </span>);
  }
});

var TitleInput = React.createClass ({
  getInitialState: function() {
    return {
      value: this.props.hackathon ? this.props.hackathon.title ? this.props.hackathon.title : '' : ''
    };
  },

  handleChange: function(event) {
    this.props.hackathon.title = event.target.value;
    this.setState({
      value: event.target.value
    });
  },

  render: function() {
    return (
        <div className="eight wide field">
          <div className="field">
            <label>
              <Translate value="hackathon.title"/>
            </label>
            <input type="text" name="title" value={ this.state.value }
                   onChange={this.handleChange}>
            </input>
          </div>
        </div>
    );
  }
});

var LocationInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.location ? this.props.hackathon.location : '' : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.location = event.target.value;
    this.setState({
      value: event.target.value
    });
  },
  render: function() {
    return (
        <div className="two wide field">
          <div className="field">
            <label>
              <Translate value="hackathon.location"/>
            </label>
            <input type="text" name="location" value={ this.state.value }
                   onChange={this.handleChange}>
            </input>
          </div>
        </div>
    );
  }
});

var ShortDescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.shortDescription : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.shortDescription = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="eight wide field">
        <div className="field">
          <label>
            <Translate value="hackathon.shortDescription"/>
          </label>
          <textarea value={ this.state.value } name="shortDescription" rows="2"
                      onChange={this.handleChange}>
          </textarea>
        </div>
      </div>
    );
  }
});


var DescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.description : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.description = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <div className="field">
            <label><Translate value="hackathon.description"/> (markdown)</label>
            <textarea value={ this.state.value } name="description"
                      onChange={this.handleChange}>
            </textarea>
          </div>
        </div>
        <div className="eight wide field">
          <label><Translate value="hackathon.descriptionPreview"/></label>
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.description ? this.props.hackathon.description : ''}/>
        </div>
      </div>
    );
  }
});

var RulesInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.rules : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.rules = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label><Translate value="hackathon.rules"/> (markdown)</label>
          <textarea value={ this.state.value } name="rules"
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label><Translate value="hackathon.rulesPreview"/></label>
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.rules ? this.props.hackathon.rules : ''}/>
        </div>
      </div>
    );
  }
});

var PrizesInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.prizes : '' };
  },
  handleChange: function(event) {
    this.props.hackathon.prizes = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label><Translate value="hackathon.prizes"/> (markdown)</label>
          <textarea value={ this.state.value } name="prizes"
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label><Translate value="hackathon.prizesPreview"/></label>
          <ReactMarkdown source={this.props.hackathon && this.props.hackathon.prizes ? this.props.hackathon.prizes : ''}/>
        </div>
      </div>
    );
  }
});


var OpenInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.open ? this.props.hackathon.open : true : true };
  },
  handleChange: function(event) {
    this.props.hackathon.open = !this.props.hackathon.open;
    this.setState({ value: this.props.hackathon.open });
  },
  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value} name="open"
                 onChange={this.handleChange}/>
          <label><Translate value="hackathon.open"/></label>
        </div>
      </div>
    );
  }
});

var ActiveInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hackathon ? this.props.hackathon.active ? this.props.hackathon.active : false : false };
  },
  handleChange: function(event) {
    this.props.hackathon.active = !this.props.hackathon.active;
    this.setState({ value: this.props.hackathon.active });
  },
  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value} name="active"
                 onChange={this.handleChange}/>
          <label><Translate value="hackathon.active"/></label>
        </div>
      </div>
    );
  }
});

export class HackathonViewComponent extends React.Component {

  static propTypes = {
    hackathon: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    updateToSever: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchFromServer(this.props.params.id);
    } else {
      this.props.reset();
    }
  }

  componentDidMount() {
    $('.ui.form')
      .form({
        fields: {
          title: {
            identifier: 'title',
            rules: [
              {
                type   : 'empty',
                prompt : <Translate value="hackathon.description"/>
              }
            ]
          }
        }
      });
  }

  componentWillUnmount () {
    this.props.reset();
  }

  handleSubmit(val) {
    if(!val.hackathon.title) {
      return;
    }
    this.props.updateToSever(this.props.hackathon.hackathon._id, val);
    // TODO - We should use react-router's history
    //this.props.history.push('#/'); // deprecated?
    window.location = '#/';
  }

  render() {
    if(!this.props.hackathon.hackathon) {
      return (
        <div className="ui basic segment loading-height">
          <div className="ui active inverted dimmer row">
            <div className="ui medium inverted text loader">
              <Translate value="common.loading"/>
            </div>
          </div>
          <p></p>
          <p></p>
        </div>
      );
    }
    return (
      // The key is important for the component to be reset properly
      <Segment key={this.props.hackathon.hackathon ? this.props.hackathon.hackathon._id : null}>
          <div className="ui form">
            <h1>{ this.props.hackathon && this.props.hackathon.hackathon ? this.props.hackathon.hackathon.title : ''}</h1>

            <div className="ui horizontal divider header">
              <Translate value="hackathon.summary"/>
            </div>
            <div className="fields">
              <TitleInput hackathon={ this.props.hackathon.hackathon } />
              <DatePickerStartInput hackathon={ this.props.hackathon.hackathon } />
              <DatePickerEndInput hackathon={ this.props.hackathon.hackathon } />
              <LocationInput hackathon={ this.props.hackathon.hackathon } />
            </div>

            <div className="fields">
              <ShortDescriptionInput hackathon={ this.props.hackathon.hackathon } />
              <OpenInput hackathon={ this.props.hackathon.hackathon } />
              <ActiveInput hackathon={ this.props.hackathon.hackathon } />
            </div>

            <div className="ui horizontal divider header">
              <Translate value="hackathon.details"/>
            </div>

            <DescriptionInput hackathon={ this.props.hackathon.hackathon } />
            <RulesInput hackathon={ this.props.hackathon.hackathon } />
            <PrizesInput hackathon={ this.props.hackathon.hackathon } />

            <DropzoneSingleImageComponent hack={ this.props.hackathon.hackathon } />
            <p>
              <button className="ui submit tiny teal button"
                      onClick={(hackathon) => this.handleSubmit(this.props.hackathon)}>
                <Translate value="common.save"/>
              </button>
            </p>
            <div className="ui error message"></div>
          </div>

      </Segment>
    );
  }

}

const mapStateToProps = (state) => ({
  hackathon: state.hackathon
});
export default connect(mapStateToProps, hackathonActions)(HackathonViewComponent);
