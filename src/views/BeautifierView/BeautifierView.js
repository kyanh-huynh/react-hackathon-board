import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';
import { render } from 'react-dom';
import { Provider, connect } from 'react-redux';
import { Router, Route, Link } from 'react-router';
import { actions as beautifierActions } from '../../redux/modules/beautifier';

import SyntaxHighlighter, { registerLanguage } from 'react-syntax-highlighter/dist/light';
import js from 'highlight.js/lib/languages/javascript';
import html from 'highlight.js/lib/languages/htmlbars';
import xml from 'highlight.js/lib/languages/xml';
import sql from 'highlight.js/lib/languages/sql';
import css from 'highlight.js/lib/languages/css';
import java from 'highlight.js/lib/languages/java';
import defaultStyle from 'react-syntax-highlighter/dist/styles/defaultStyle';
import { Translate, Localize } from 'react-i18nify';

registerLanguage('javascript', js);
registerLanguage('htmlbars', html);
registerLanguage('xml', xml);
registerLanguage('sql', sql);
registerLanguage('css', css);
registerLanguage('java', java);

type
Props = {
  beautifier: Object,
  update: Function,
  reset: Function
};

var BeautifyForm = React.createClass({
  getInitialState: function () {
    return {value: '' };
  },

  handleChange: function (event) {
    this.props.beautifier.content = event.target.value;
    this.setState({value: event.target.value});
  },

  handleSubmit: function (val) {
    if (!val.content) {
      return;
    }
    this.props.update(val);
  },
  render: function () {
    var beautifier = this.props.beautifier;
    return (
      <div className="hacks-summary-margin padding-top-20px">
        <div className="ui form">
          <div className="field">
            <label>
              <TypeInput beautifier={this.props.beautifier} />
            </label>
            <textarea value={this.state.value} rows="10"
              onChange={this.handleChange} />
          </div>
          <p>
            <button className={this.props.beautifier.loading === 'true' ? 'ui tiny disabled loading teal button' : 'ui tiny teal button'}
              onClick={(beautifier) => this.handleSubmit(this.props.beautifier)}>
              <Translate value="menu.beautify" />
            </button>
          </p>
        </div>
      </div>
    );
  }
});

var TypeInput = React.createClass({
  getInitialState: function () {
    return { value: 'js'};
  },

  handleChange: function (event) {
    this.props.beautifier.type = event.target.value;
    this.setState({ value: event.target.value });
  },

  render: function () {
    var types = [
                  {key: 'js', display: 'JavaScript/JSON'},
                  {key: 'css', display: 'CSS'},
                  {key: 'html', display: 'HTML'},
                  {key: 'xml', display: 'XML'},
                  {key: 'sql', display: 'SQL'}
    ].map(function (type) {
          return (
            <option key={type.key} value={type.key}>
              {type.display}
            </option>
          );
        });

    return (
      <div className="field">
        <select className="ui dropdown"
          value={this.state.value}
          onChange={this.handleChange}>
          {types}
        </select>
      </div>
    );
  }
});

var Beautified = React.createClass({
  getInitialState: function () {
    return {value: this.props.beautifier.beautified ? this.props.beautifier.beautified : '' };
  },

  render: function () {
    var type = this.props.beautifier.type;
    var lang = '';

    return (

      <div className="hacks-summary-margin">
        <div className="ui">
          <div className="field">
            <div className="ui segment">
              <SyntaxHighlighter style={defaultStyle}>
                { this.props.beautifier.beautified ? this.props.beautifier.beautified : '' }
              </SyntaxHighlighter>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

class BeautifierView extends React.Component {

  static propTypes = {
    beautifier: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.props.reset();
  }

  componentDidMount () {
  }

  render () {
    return (
      <div>
        <div>
          <BeautifyForm beautifier={this.props.beautifier}
            update={this.props.update} />
        </div>
        <div className={this.props.beautifier.beautified ? 'ui' : 'hide-it'}>
          <Beautified beautifier= {this.props.beautifier} />
        </div>
      </div>
    );

    return (
      <div className="ui basic segment loading-height">
        <div className="ui active inverted dimmer row">
          <div className="ui medium inverted text loader">
            <Translate value="common.loading" />
          </div>
        </div>
        <p />
        <p />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  beautifier: state.beautifier
});
export default connect(mapStateToProps, beautifierActions)(BeautifierView);
