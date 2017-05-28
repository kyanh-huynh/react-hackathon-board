import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { actions as hacksActions } from '../../redux/modules/hacks';
import classes from './HacksView.scss';
import ReactDOM from 'react-dom';
import HackCardComponent from './HackCardComponent';
import { Translate, Localize } from 'react-i18nify';
import {Button, Card, Content, Header, Column, Image, Reveal, Segment, Icon} from 'react-semantify';

type
Props = {
  nominatedHacks: Array,
  selectedHackathon: Object,
  listNominatedHacksFromServer: Function
};

var NoNomination = React.createClass({
  render: function() {
    return (
      <div>
        No Nomination yet...
      </div>
    );
  }
});

export class NominatedComponent extends React.Component {

  static propTypes = {
    nominatedHacks: PropTypes.array,
    selectedHackathon: PropTypes.object.isRequired,
    listNominatedHacksFromServer: PropTypes.func.isRequired
  };

  componentWillMount() {
    var selectedHackathon = this.props.selectedHackathon ? this.props.selectedHackathon : "-1";
    this.props.listNominatedHacksFromServer(selectedHackathon);
    this.getData();
  }

  getData() {
  }

  render() {
    if(!this.props.nominatedHacks) {
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
    var cards = this.props.nominatedHacks
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
            </div>
          </div>

          <div className="thirteen wide column">
            <div className="">
              <div className="ui stackable four column grid basic">
                {cards}
              </div>
            </div>

          </div>

        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    nominatedHacks: state.nominatedHacks,
    selectedHackathon: state.selectedHackathon
  }
};

export default connect(mapStateToProps, hacksActions)(NominatedComponent);
