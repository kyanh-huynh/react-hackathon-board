/* @flow */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as hackathonActions } from '../../redux/modules/hackathon';
import classes from './HackathonsView.scss';
import ReactDOM from 'react-dom';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';
import ReactMarkdown from 'react-markdown';
import moment from 'moment';
import { Translate, Localize } from 'react-i18nify';

type
Props = {
  hackathon: object,
  fetchFromServer: Function
};

export class HackathonViewComponent extends React.Component {

  static propTypes = {
    hackathon: PropTypes.object,
    fetchFromServer: PropTypes.func.isRequired
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
    if(!this.props.hackathon || !this.props.hackathon.hackathon || !this.props.hackathon.hackathon.pictureURL) {
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
    var hackathon = this.props.hackathon;
      return (
        <div className="hacks-summary-margin padding-top-20px">
          <div className="ui stackable internally grid">
            <div className="row">
              <div className="four wide column">
                <div className={!this.props.user || !this.props.user.user
                                || this.props.user.user.judge !== true ? "hide-it" : "ui visible items fluid"}>
                  <a href={ '#/hackathons/edit/' + hackathon.hackathon._id}>
                    <div className="ui blue fluid tiny button">
                      <Translate value="common.edit"/>
                    </div>
                  </a>
                </div>
                <Content className="visible fluid">
                  <Image src={'user-images/' + hackathon.hackathon.pictureURL} className="fluid" />
                </Content>

                <div className="ui card fluid">
                  <div className="content">
                    <div className="header">
                      <Translate value="hackathon.organizer" />
                    </div>
                    <div className="">
                      <span>{hackathon.ownerDisplay}</span>
                    </div>
                  </div>
                </div>

                <div className="ui card fluid">
                  <div className="content">
                    <div className="header">
                      <Translate value="hackathon.date"/>
                    </div>
                    <div className="ui description">
                      { (moment(hackathon.hackathon.startDate).month() !== moment(hackathon.hackathon.endDate).month() ?
                        moment(hackathon.hackathon.startDate).format('Do MMM YY') :
                        moment(hackathon.hackathon.startDate).format('Do'))
                      + " - "
                      + moment(hackathon.hackathon.endDate).format('Do MMM YY')
                      }
                    </div>
                  </div>
                </div>


                <div className={hackathon.hackathon.location ? "ui card fluid" : "hide-it"}>
                  <div className="content">
                    <div className="header">
                      <Translate value="hackathon.location"/>
                    </div>
                    <div className="">
                      <span>{hackathon.hackathon.location}</span>
                    </div>
                  </div>
                </div>

              </div>
              <div className="twelve wide column">
                <div key={this.props.hackathon.hackathon._id} className="ui stackable internally celled grid">

                  <div className="sixteen wide column">
                    <Segment>
                      <h3>
                        <Translate value="common.about"/>
                      </h3>
                      <div className="">
                        <ReactMarkdown source={this.props.hackathon.hackathon.description ? this.props.hackathon.hackathon.description : ''}/>
                      </div>
                    </Segment>
                    <Segment>
                      <h3>
                        <Translate value="hackathon.rules"/>
                      </h3>
                      <div className="">
                        <ReactMarkdown source={this.props.hackathon.hackathon.rules ? this.props.hackathon.hackathon.rules : ''}/>
                      </div>
                    </Segment>
                    <Segment>
                      <h3>
                        <Translate value="hackathon.prizes"/>
                      </h3>
                      <div className="">
                        <ReactMarkdown source={this.props.hackathon.hackathon.prizes ? this.props.hackathon.hackathon.prizes : ''}/>
                      </div>
                    </Segment>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
  }
}

const mapStateToProps = (state) => ({
  hackathon: state.hackathon,
  user: state.user
});
export default connect(mapStateToProps, hackathonActions)(HackathonViewComponent);
