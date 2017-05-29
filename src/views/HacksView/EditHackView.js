import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import { modelReducer, formReducer, Field, Form, actions} from 'react-redux-form';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import DropzoneSingleImageComponent from './DropzoneComponent';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Translate, Localize, I18n } from 'react-i18nify';

type
Props = {
  hack: Object,
  hackathons: Object,
  fetchFromServer: Function,
  fetchHackathonsFromServer: Function,
  updateToSever: Function,
  reset: Function
};

/* I prefer to extend React.Component
 But creating Classes for nested elements to use both
 Differences are minor between the two, but we might want to stick with React.Component going forward
*/
var TitleInput = React.createClass ({
  getInitialState: function() {
    return { value: this.props.hack.title || '' };
  },
  handleChange: function(event) {
    this.props.hack.title = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="field">
        <label>
          <Translate value="hack.title"/>
        </label>
        <input type="text" name="title" value={ this.state.value }
               onChange={this.handleChange}>
        </input>
      </div>
    );
  }
});

var ShortDescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.shortDescription || '' };
  },
  handleChange: function(event) {
    this.props.hack.shortDescription = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div  className="field">
        <label>
          <Translate value="hack.shortDescription"/>
        </label>
          <textarea value={ this.state.value } name="shortDescription" rows="2"
                    onChange={this.handleChange}>
        </textarea>
      </div>
    );
  }
});

var DescriptionInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.description || '' };
  },
  handleChange: function(event) {
    this.props.hack.description = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
      <div className="fields">
        <div className="eight wide field">
          <label>
            <Translate value="hack.description"/> (markdown)
          </label>
          <textarea value={ this.state.value } name="description"
                    onChange={this.handleChange}>
          </textarea>
        </div>
        <div className="eight wide field">
          <label>
            <Translate value="hack.descriptionPreview"/>
          </label>
          <ReactMarkdown source={this.props.hack.description || ''}/>
        </div>
      </div>
    );
  }
});

var LocationInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.location || '' };
  },
  handleChange: function(event) {
    this.props.hack.location = event.target.value;
    this.setState({value: event.target.value});
  },
  render: function() {
    return (
        <div className="field">
          <label>
            <Translate value="hack.location"/>
          </label>
          <input type="text" name="location" value={ this.state.value }
                 onChange={this.handleChange}>
          </input>
        </div>
    );
  }
});

var OpenInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.open || false };
  },
  handleChange: function(event) {
    this.props.hack.open = !this.props.hack.open;
    this.setState({ value: this.props.hack.open });
  },
  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value}
                 onChange={this.handleChange}/>
          <label>
            <Translate value="hack.open"/>
          </label>
        </div>
        <span className="ui" data-position="top left" data-tooltip={I18n.t('hack.openTooltip')} data-inverted="">
          <i className="help icon"></i>
        </span>
      </div>
    );
  }
});

var CompletedInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.completed || false };
  },
  handleChange: function(event) {
    this.props.hack.completed = !this.props.hack.completed;
    this.setState({ value: this.props.hack.completed });
  },

  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value}
                 onChange={this.handleChange}/>
          <label>
            <Translate value="hack.completed"/>
          </label>
        </div>
        <span className="ui" data-position="top left" data-tooltip={I18n.t('hack.completedTooltip')} data-inverted="">
          <i className="help icon"></i>
        </span>
      </div>
    );
  }
});

var ScienceInput = React.createClass ({
  getInitialState: function() {
    return {value: this.props.hack.science || false };
  },
  handleChange: function(event) {
    this.props.hack.science = !this.props.hack.science;
    this.setState({ value: this.props.hack.science });
  },

  render: function() {
    return (
      <div className="field">
        <div className="ui checkbox">
          <input type="checkbox" checked={this.state.value}
                 onChange={this.handleChange}/>
          <label>
            <Translate value="hack.science"/>
          </label>
        </div>
        <span className="ui" data-position="top left" data-tooltip={I18n.t('hack.scienceTooltip')} data-inverted="">
          <i className="help icon"></i>
        </span>
      </div>
    );
  }
});

var HackathonInput = React.createClass ({
  getInitialState: function() {
    if (this.props.hack.hackathon) {
      return { value: this.props.hack.hackathon._id };
    } else {
      if(this.props.selectedHackathon._id && this.props.selectedHackathon.open === true) {
        this.props.hack.hackathon = this.props.selectedHackathon._id;
        return {value: this.props.hack.hackathon}
      } else {
        for (var hackathon in this.props.hackathons) {
          if(hackathon.active === true && hackathon.open === true){
            this.props.hack.hackathon = hackathon._id;
            return { value: hackathon._id};
          }
        }
        return { value: -1};

      }
    }
  },

  handleChange: function(event) {
    this.setState({ value: event.target.value });
    this.props.hack.hackathon = event.target.value;
  },

  render: function() {
    if (!this.props.hackathons || !this.props.hackathons.hackathons) {
      return (
        <option key="-1" value="-1">Loading...</option>
      );
    }

    var hackathons = this.props.hackathons.hackathons.map(function (hackathon) {
      var date = (moment(hackathon.startDate).month() !== moment(hackathon.endDate).month() ?
        moment(hackathon.startDate).format('Do MMM YY') :
          moment(hackathon.startDate).format('Do'))
          + " - "
          + moment(hackathon.endDate).format('Do MMM YY');
      if(hackathon.open === true) {
        return (
          <option key={hackathon._id} value={hackathon._id}>
            {hackathon.title}  { date }
          </option>
        );
      } else {
          return(
            <option key={hackathon._id} value={hackathon._id} disabled>
              {hackathon.title}  { date }
            </option>
          );
      }

    });

    return (
      <div className="field">
        <select className="ui dropdown"
                value={this.props.hack.hackathon}
                onChange={this.handleChange}>
          {hackathons}
        </select>
      </div>
    );
   }
});

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
    hackathons: PropTypes.object.isRequired,
    fetchFromServer: PropTypes.func.isRequired,
    fetchHackathonsFromServer: PropTypes.func.isRequired,
    updateToSever: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (this.props.params.id) {
      this.props.fetchFromServer(this.props.params.id);
    } else {
      this.props.reset();
    }
    this.props.fetchHackathonsFromServer();
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
                prompt : I18n.t('hack.validate.title')
              }
            ]
          },
          location: {
            identifier: 'location',
            rules: [
              {
                type   : 'empty',
                prompt : I18n.t('hack.validate.location')
              }
            ]
          },
          shortDescription: {
            identifier: 'shortDescription',
            rules: [
              {
                type   : 'empty',
                prompt : I18n.t('hack.validate.shortDescription')
              }
            ]
          },
          description: {
            identifier: 'description',
            rules: [
              {
                type   : 'empty',
                prompt : I18n.t('hack.validate.description')
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
    if(!val.hackathon && this.props.selectedHackathon._id && this.props.selectedHackathon.open === true) {
      val.hackathon = this.props.selectedHackathon._id;
    }
    if (!val.title || !val.hackathon) {
      return;
    }
    this.props.updateToSever(this.props.hack.hack ? this.props.hack.hack._id : null, val);
    // TODO - We should use react-router's history
    //this.props.history.push('#/hacks'); // deprecated?
    window.location = '#/hacks';
  }

  render() {
    if(!this.props.hack) {
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
    if (!this.props.hack.hack) {
      this.props.hack.hack = new Object();
    }
    var hack = this.props.hack.hack;
    return (
      // The key is important for the component to be reset properly
      <Segment key={ hack._id }>
          <div className="ui form">
            <h1>{ hack.title  }</h1>
            <div className="fields">
              <div className="eight wide field">
                <TitleInput hack={ this.props.hack.hack } />
              </div>
              <div className="eight wide field">
                <LocationInput  hack={ this.props.hack.hack } />
              </div>
            </div>
            <ShortDescriptionInput hack={ this.props.hack.hack } />
            <DescriptionInput hack={ this.props.hack.hack } />
            <OpenInput  hack={ this.props.hack.hack } />
            <ScienceInput  hack={ this.props.hack.hack } />

            <CompletedInput  hack={ this.props.hack.hack } />
            <HackathonInput  hack={ this.props.hack.hack } hackathons= {this.props.hackathons} selectedHackathon={this.props.selectedHackathon}/>
            <DropzoneSingleImageComponent hack={ this.props.hack.hack } />
            <p>
              <button className="ui submit tiny teal button"
                      onClick={(hack) => this.handleSubmit(this.props.hack.hack)}>
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
  hack: state.hack,
  hackathons: state.hackathons,
  selectedHackathon: state.selectedHackathon
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
