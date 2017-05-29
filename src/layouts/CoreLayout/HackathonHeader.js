import React from 'react';
import PropTypes from 'prop-types';
import '../../styles/core.scss';
import { connect } from 'react-redux';
import { actions as selectedHackathonActions } from '../../redux/modules/selectedHackathon';

import { Image, Content, Header } from 'react-semantify';
import moment from 'moment';
import { Translate } from 'react-i18nify';

class HackathonHeaderView extends React.Component {

  static propTypes = {
    selectedHackathon: PropTypes.object,
    listFromServer: PropTypes.func
  };

  componentWillMount () {
    this.props.listFromServer();
  }

  render () {
    if (!this.props.selectedHackathon || !this.props.selectedHackathon._id) {
      return null;
    }

    return (
      <Content>
        <div className="center aligned hackathon-header">
          <div className="ui six column stackable grid">
            <div className="three wide column" />
            <div className="three wide column center aligned desktop">
              <Image
                className="hackathon-header-image-effect"
                src={'user-images/' + this.props.selectedHackathon.pictureURL}
              />;
              <div className="hackathon-header-image-effect-shadow" />
            </div>
            <div className="four wide column center aligned">
              <Content className="padding-20px">
                <Header className="center aligned">
                  <span className="hackathon-header-title">{this.props.selectedHackathon.title} </span>
                </Header>
                <div className="center aligned hackathon-header-description desktop">
                  <p className="">
                    {this.props.selectedHackathon.shortDescription}
                  </p>
                </div>
                <div className="ui description center aligned hackathon-header-date desktop">
                  {
                    (moment(this.props.selectedHackathon.startDate).month() !==
                      moment(this.props.selectedHackathon.endDate).month()
                      ? moment(this.props.selectedHackathon.startDate).format('Do MMM YY')
                      : moment(this.props.selectedHackathon.startDate).format('Do')) +
                      ' - ' +
                      moment(this.props.selectedHackathon.endDate).format('Do MMM YY')
                  }
                </div>
              </Content>
              <div className="extra center aligned">
                <a href={'#/hackathons/' + this.props.selectedHackathon._id}>
                  <Translate value="common.details" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </Content>
    );
  }
}

const mapStateToProps = (state) => ({
  selectedHackathon: state.selectedHackathon
});
export default connect(mapStateToProps, selectedHackathonActions)(HackathonHeaderView);
