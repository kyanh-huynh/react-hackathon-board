import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import HackCardComponent from './HackCardComponent';

import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  hacks: Array,
  selectedHackathon: Object,
  listFromServer: Function
};

export class HacksAsCardsComponent extends React.Component {

  static propTypes = {
    hacks: PropTypes.array.isRequired,
    selectedHackathon: PropTypes.object.isRequired,
    listFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    var selectedHackathon = this.props.selectedHackathon ? this.props.selectedHackathon : "-1";
    this.props.listFromServer(selectedHackathon);
    this.getData();
    this.onSearch = this.onSearch.bind(this);
  }

  getData() {
    this.setState({
      search: ''
    });
  }

  handleCreate() {
    window.location = '#/hacks/create/new/';
  }

  onSearch(event) {
    this.setState({
      search: event.target.value
    });
  }

  render() {
    var searchString = this.state.search;
    var cards = this.props.hacks
    .filter(function(hack) {
        return !hack.title || hack.title.toLowerCase().indexOf(searchString.toLowerCase()) != -1;
    })
    .map(function (card) {
      return (
        <HackCardComponent hack={card} key={card._id}>
        </HackCardComponent>
      );
    });

    return(
      <div className="hacks-summary-margin">
        <div className="ui items stackable sixteen column relaxed grid basic">
          <div className="three wide column">
            <div className="ui field">
              <Button className={!this.props.user || !this.props.user.user || !this.props.user.user._id ? 'hide-it' : "fluid"} color="blue" onClick={this.handleCreate} >
                <Icon className="plus"/> Create Hack
              </Button>
              <div className="ui items form">
                <div className="field">
                  <input type="text" name="search"
                  value={this.props.hacks.search}
                  onChange={this.onSearch}
                  placeholder="Search"/>
                </div>
              </div>
            </div>
          </div>

          <div className="thirteen wide column">
            <div className="">
              <ReactCSSTransitionGroup component="div" className="ui stackable four column grid basic"
                transitionName="card-disabled" transitionEnterTimeout={500} transitionLeaveTimeout={1}>
                {cards}
              </ReactCSSTransitionGroup>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    hacks: state.hacks,
    selectedHackathon: state.selectedHackathon,
    user: state.user
  }
};

export default connect(mapStateToProps, hacksActions)(HacksAsCardsComponent);
