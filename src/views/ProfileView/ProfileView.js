import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon, Label} from 'react-semantify';
import { actions as userActions } from '../../redux/modules/user';
import DropzoneSingleImageComponent from '../HacksView/DropzoneComponent';
import { Translate, Localize } from 'react-i18nify';

type
Props = {
  user: Object,
  fetchFromServer: Function,
  updateToSever: Function,
  reset: Function
};

export class ProfileView extends React.Component<void, Props, void> {

  static propTypes = {
    user: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    updateToSever: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      name: '',
      website: '',
      location: '',
      picture: '',
      description: '',
      password: ''
    };


    this.onUsernameChange = this.onUsernameChange.bind(this);
    this.onNameChange = this.onNameChange.bind(this);
    this.onPasswordChange = this.onPasswordChange.bind(this);
    this.onWebsiteChange = this.onWebsiteChange.bind(this);
    this.onLocationChange = this.onLocationChange.bind(this);
    this.onPictureChange = this.onPictureChange.bind(this);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  };

  onUsernameChange(ev) {
      //username: ev.target.value
  };

  onNameChange(ev) {
    if (ev.target.value.length > 35) {
      return;
    }
    this.props.user.user.profile.name = ev.target.value;
    this.setState({name: event.target.value});
  };

  onPasswordChange(ev) {
    if (ev.target.value.length > 35) {
      return;
    }
    this.props.user.user.password = ev.target.value;
    this.setState({password: event.target.value});
  };

  onWebsiteChange(ev) {
    this.props.user.user.profile.website = ev.target.value;
    this.setState({website: event.target.value});
  };

  onLocationChange(ev) {
    if (ev.target.value.length > 35) {
      return;
    }
    this.props.user.user.profile.location = ev.target.value;
    this.setState({location: event.target.value});
  };

  onPictureChange(ev) {
    this.props.user.user.profile.picture = ev.target.value;
    this.setState({picture: event.target.value});
  };

  onDescriptionChange(ev) {
    this.props.user.user.profile.description = ev.target.value;
    this.setState({description: event.target.value});
  };

  componentWillMount() {
    this.props.fetchFromServer();
  }

  componentWillUnmount () {
  }

  componentDidMount() {

  }

  handleSubmit(val) {
    this.props.updateToSever(val);
  }

  render () {
    if(!this.props.user || !this.props.user.user) {
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
      <div className="login-margin">
        <Segment className="ui stackable sixteen columns grid basic">
          <div className="sixteen wide column">
            <div className="ui form" id="validating-form">
              <div className="field">
                <label>
                  <Translate value="profile.email"/>
                </label>
                <input disabled="true" type= "text" name="username" value={this.props.user.user.email}
                       onChange={this.onUsernameChange} placeholder="Email" />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.fullName"/>
                </label>
                <input type="text" name="name" placeholder="Full name"
                       value={this.props.user.user.profile.name}
                       onChange={this.onNameChange} />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.password"/>
                </label>
                <input type="password" name="password" placeholder="password"
                       defaultValue={this.state.password}
                       onChange={this.onPasswordChange} />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.website"/>
                </label>
                <input type="text" name="website" placeholder="http://example.com"
                       value={this.props.user.user.profile.website}
                       onChange={this.onWebsiteChange} />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.location"/>
                </label>
                <input type="text" name="location" placeholder="Edinburgh"
                       value={this.props.user.user.profile.location}
                       onChange={this.onLocationChange} />
              </div>
              <div className="field">
                <label>
                  <Translate value="profile.description"/>
                </label>
                <textarea type="text" name="description" placeholder="description"
                       value={this.props.user.user.profile.description}
                       onChange={this.onDescriptionChange} />
              </div>

              <DropzoneSingleImageComponent user={ this.props.user.user } />
              <p>
                <button className="ui fluid teal tiny button"
                        onClick={(user) => this.handleSubmit(this.props.user.user)}>
                  <Translate value="common.save"/>
                </button>
              </p>
              <div className="ui error message"></div>
            </div>
          </div>

        </Segment>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user
});
export default connect(mapStateToProps, userActions)(ProfileView);
