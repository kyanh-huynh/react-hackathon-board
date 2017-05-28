import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';
import { connect } from 'react-redux';
import { actions } from '../../redux/modules/locale';
import { Menu, Item, Dropdown } from 'react-semantify';

class LocalePickerView extends React.Component {

  static propTypes = {
    locale: PropTypes.object,
    user: PropTypes.object,
    update: PropTypes.func.isRequired
  };

  componentWillMount () {
    this.handleSwitch = this.handleSwitch.bind(this);
  }

  handleSwitch (lang) {
    this.props.update(lang);
  }

  render () {
    return (
      <Dropdown init className="half-width">
        <div className="item">
          <i className={this.props.locale.lang ? this.props.locale.lang + ' flag' : 'gb flag'} />
        </div>
        <Menu className="ui borderless">
          <Item className="" onClick={this.handleSwitch('gb')}>
            <i className="gb flag" />English
          </Item>
          <Item className="" onClick={this.handleSwitch('fr')}>
            <i className="fr flag" />French
          </Item>
          <Item className="disabled" onClick={this.handleSwitch('de')}>
            <i className="de flag" />German
          </Item>
        </Menu>
      </Dropdown>

    );
  }
}

const mapStateToProps = (state) => ({
  locale: state.locale,
  user: state.user
});
export default connect(mapStateToProps, actions)(LocalePickerView);
