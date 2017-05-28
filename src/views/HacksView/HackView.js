/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as hackActions } from '../../redux/modules/hack';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';
import ReactMarkdown from 'react-markdown';
import CommentsComponent from './CommentsComponent';
import { Translate, Localize } from 'react-i18nify';

type
Props = {
  hack: Object,
  user: Object,
  fetchFromServer: Function,
  join: Function,
  leave: Function,
  nominate: Function
};

var TeamList = React.createClass ({
  getInitialState: function() {
    if (this.props.hack.joiners) {
      return { value: this.props.hack.joiners };
    } else {
      return { value: []};
    }
  },

  render: function() {
    if (!this.props.hack || !this.props.hack.joinersDisplay) {
      return (
        <Translate value="common.loading"/>
      );
    }
    var members = this.props.hack.joinersDisplay.map(function (member) {
      return (
        <a href={ '#/people/' + member.id} key={member.id}>
          <p className="word-wrap" key={member.id}>{member.username}</p>
        </a>
      );
    });

    return (
      <div className="field">
        {members}
      </div>
    );
   }
});

var LeftBar = React.createClass ({
  getInitialState: function() {
    if (this.props.hack) {
      return { value: this.props.hack };
    } else {
      return { value: null};
    }
  },

  handleJoin(hack) {
    this.props.join(hack);
  },

  handleLeave(hack) {
    this.props.leave(hack);
  },

  handleNominate(hack) {
    this.props.nominate(hack);
  },

  render: function() {
    if(!this.props.hack.hack) {
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
      <div>
        <a href={ '#/hacks/edit/' + this.props.hack.hack._id }
            className={this.props.hack.isOwner || (this.props.user.user && this.props.user.user.judge) ? 'items' : 'hide-it'}>
          <Button className="fluid tiny" color="blue">
            <Translate value="common.edit"/>
          </Button>
        </a>
        <p/>

        <Button color="yellow"
                className={this.props.hack.hack.nominated === true
                        || !this.props.user.user || !this.props.user.user._id
                        || this.props.user.user.judge !== true ? 'hide-it' : 'fluid tiny' }
                onClick={(hack) => this.handleNominate(this.props.hack.hack)}>
          <Translate value="hack.nominate"/>
        </Button>
        <p/>

        <Button color="teal"
                className={!this.props.user.user || !this.props.user.user._id
                          || this.props.hack.hasJoined ? 'hide-it' : 'fluid tiny'}
                onClick={(hack) => this.handleJoin(this.props.hack.hack)}>
          <Translate value="hack.join"/>
        </Button>
        <p/>
        <Button color="red"
                className={!this.props.user.user || !this.props.user.user._id
                          || !this.props.hack.hasJoined ? 'hide-it' : 'fluid tiny'}
                onClick={(hack) => this.handleLeave(this.props.hack.hack)}>
          <Translate value="hack.leave"/>
        </Button>

        <div className="ui card fluid">
          <div className="content">
            <div className="header">
              <Translate value="hack.organizer"/>
            </div>
            <div className="">
              <a href={ '#/people/' + this.props.hack.hack.owner}>
                <span className="word-wrap">{this.props.hack.ownerDisplay}</span>
              </a>
            </div>
          </div>
          <div className="extra content">
                    <span className="left floated">
                      <Translate value="hack.science"/>
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.science !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>

        </div>
        <div className="ui card fluid">
          <div className={this.props.hack.hack.nominated === true ? "extra content" : "hide-it"}>
                    <span className="left floated">
                      {this.props.hack.hack.nominated === true ? "Nominated" : ""}
                    </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.nominated !== true ? 'float-right minus circle icon' : 'float-right red trophy icon'}>
            </i>
          </div>
          <div className="content">
            <div className="header">
              <Translate value="hack.team"/>
            </div>
            <TeamList hack={ this.props.hack } />
          </div>
          <div className="extra content">
              <span className="left floated">
                {this.props.hack.hack.open === true ? <Translate value="hack.open"/> : <Translate value="hack.closed"/> }
              </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.open !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>
          <div className="extra content">
              <span className="left floated">
                {this.props.hack.hack.completed === true ?  <Translate value="hack.completed"/> :  <Translate value="hack.uncompleted"/> }
              </span>
            <i className="float-right minus circle icon"
               className={this.props.hack.hack.completed !== true ? 'float-right minus circle icon' : 'float-right checkmark icon'}>
            </i>
          </div>
        </div>

        <div className="ui card fluid">
          <div className="content">
            <div className="header">
              <Translate value="hack.location"/>
            </div>
            <div className="">
              <span className="word-wrap">{this.props.hack.hack.location}</span>
            </div>
          </div>
        </div>

      </div>
    )
  }
});

var MainPart = React.createClass ({
  getInitialState: function() {
    if (this.props.hack) {
      return { value: this.props.hack };
    } else {
      return { value: null};
    }
  },

  render: function() {
    if(!this.props.hack.hack) {
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

    return(
      <div key={this.props.hack.hack._id} className="ui internally stackable grid">
        <div className="six wide column">
          <Content className="visible fluid">
            <Image src={'user-images/' + this.props.hack.hack.pictureURL} className="fluid"/>
          </Content>
        </div>
        <div className="ten wide column">
          <div className="text-center">
            <h2>
              {this.props.hack.hack.title}
            </h2>
          </div>
          <div className="padding-top-20px">
            <div className="ui fluid">
              <div className="segment">
                <div className="word-wrap">
                  <ReactMarkdown source={this.props.hack.hack.description}/>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="sixteen wide column">
          <div className="ui divider"></div>
          <Content>
            <CommentsComponent params={this.props.params} />
          </Content>
        </div>
      </div>);
  }

});

export class HackViewComponent extends React.Component {

  static propTypes = {
    hack: PropTypes.object,
    user: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired,
    join: PropTypes.func.isRequired,
    leave: PropTypes.func.isRequired,
    nominate: PropTypes.func.isRequired
  };

  componentWillMount() {
    this.props.fetchFromServer(this.props.params.id);
    this.getData();
  }

  componentWillUnmount () {
    this.props.reset();
  }

  getData() {
    this.setState({
    });
  }

  render() {
    return (
      <div className="hacks-summary-margin padding-top-20px">
        <div className="ui internally stackable grid">
          <div className="row">
            <div className="four wide column">
              <LeftBar hack={this.props.hack} user={this.props.user} join={this.props.join}
              leave={this.props.leave} nominate={this.props.nominate}/>
            </div>
            <div className="twelve wide column">
              <div className="row">
                <MainPart hack={this.props.hack} params={this.props.params}/>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  hack: state.hack,
  user: state.user
});
export default connect(mapStateToProps, hackActions)(HackViewComponent);
