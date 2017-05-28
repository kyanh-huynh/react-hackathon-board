import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';
import { connect } from 'react-redux';
import { actions as notifActions, Notifs } from 're-notif';
import { Link } from 'react-router';
import AccountNavBarView from './AccountNavBar';
import HackathonHeaderView from './HackathonHeader';
import LocalePickerView from './LocalePicker';

import {Menu, Icon} from 'react-semantify';
var Hamburger = require('react-burger-menu').slide;

const Translate = require('react-i18nify').Translate;

const kindToClassMap = {
  info: 'info',
  success: 'positive',
  warning: 'warning',
  danger: 'negative'
};

class CustomNotif extends React.Component {
  render () {
    return (
      <div className={'ui ' + kindToClassMap[this.props.kind] + ' message'}>
        <div className="header">
          {this.props.message}
        </div>
      </div>
    );
  }
}

// Note: Stateless/function components *will not* hot reload!
// react-transform *only* works on component classes.
//
// Since layouts rarely change, they are a good place to
// leverage React's new Stateless Functions:
// https://facebook.github.io/react/docs/reusable-components.html#stateless-functions
//
// CoreLayout is a pure function of its props, so we can
// define it with a plain javascript function...
const CoreLayout = ({ children }) => (
  <div className="">
    <All children={children} />
  </div>
);

const NavBarLeft = () => (
  <div>
    <div>
      <div className="fixed-menu">
        <Menu className="borderless stackable">
          <Link activeClassName="active" className="item" to="hackathons">
            <Icon className="home" /> <Translate value="menu.home" />
          </Link>
          <Link activeClassName="active" className="item" to="hacks">
            <Icon className="lab" /> <Translate value="menu.hacks" />
          </Link>
          <Link activeClassName="active" className="item" to="rules">
            <Icon className="book" /> <Translate value="menu.rules" />
          </Link>
          <Link activeClassName="active" className="item" to="prizes">
            <Icon className="gift" /> <Translate value="menu.prizes" />
          </Link>
          <Link activeClassName="active" className="item" to="judging">
            <Icon className="trophy" /> <Translate value="menu.judging" />
          </Link>
          <Link activeClassName="active" className="item" to="people">
            <Icon className="users" /> <Translate value="menu.people" />
          </Link>
          <Link activeClassName="active" className="item" to="beautifier">
            <Icon className="code" /> <Translate value="menu.beautifier" />
          </Link>
          <AccountNavBarView />
        </Menu>
      </div>
      <div className="ui fluid padding-top-70px">
        <HackathonHeaderView />
      </div>
    </div>
  </div>
);

class All extends React.Component {
  constructor () {
    super();
    this.showHamburger = this.showHamburger.bind(this);
  }

  showHamburger (event) {
    event.preventDefault();
  }

  render () {
    return (
      <div>
        <div className="mobile">
          <Hamburger width={250} isOpen={false} customBurgerIcon={<i className="icon content hamburger" />}>
            <NavBarLeft />
          </Hamburger>
          <a onClick={this.showHamburger} className="menu-item--small" href="">
            <i className="icon content hamburger" />
          </a>
        </div>
        <div className="page-container padding-bottom-footer">
          <div className="">
            <div className="desktop">
              <NavBarLeft />
            </div>
          </div>
          <div className="view-container">
            <Notifs CustomComponent={CustomNotif} />
            {this.props.children}
          </div>
        </div>
        <div className="ui vertical footer segment desktop">
          <div className="ui stackable sixteen column grid basic">
            <div className="ui eight wide column content">
              <Translate value="footer.madeWith" /> <a href="https://facebook.github.io/react/"> React </a>
              <Translate value="footer.and" /><a href="http://semantic-ui.com/"> Semantic-ui</a>,&nbsp;
              <Translate value="footer.backedBy" /><a href="https://nodejs.org/en/"> Node </a>
              <Translate value="footer.and" /><a href="https://github.com/mongodb/mongo"> mongoDB</a>.
            </div>

            <div className="two wide column">
              <LocalePickerView />
            </div>

            <div className="ui six wide column content">
              <div className="float-right">
                <Translate value="footer.foundABugReportAn" />
                <a href="https://github.com/hirako2000/react-hackathon-board/issues">
                  <Translate value="footer.issue" />.
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

All.propTypes = {
  children: PropTypes.element
};

CustomNotif.propTypes = {
  message: PropTypes.node,
  kind: PropTypes.oneOf(['info', 'success', 'warning', 'danger'])
};

CoreLayout.propTypes = {
  children: PropTypes.element
};

// Map Redux state to component props
function mapStateToProps (state) {
  return {
    value: state.count
  };
}

export default connect(mapStateToProps, notifActions)(CoreLayout);
