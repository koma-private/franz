import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactTooltip from 'react-tooltip';
import { defineMessages, intlShape } from 'react-intl';

import Tabbar from '../services/tabs/Tabbar';
import { ctrlKey } from '../../environment';

const messages = defineMessages({
  settings: {
    id: 'sidebar.settings',
    defaultMessage: '!!!Settings',
  },
  addNewService: {
    id: 'sidebar.addNewService',
    defaultMessage: '!!!Add new service',
  },
  mute: {
    id: 'sidebar.mute',
    defaultMessage: '!!!Disable audio',
  },
  unmute: {
    id: 'sidebar.unmute',
    defaultMessage: '!!!Enable audio',
  },
});

export default class Sidebar extends Component {
  static propTypes = {
    openSettings: PropTypes.func.isRequired,
    toggleMuteApp: PropTypes.func.isRequired,
    isAppMuted: PropTypes.bool.isRequired,
  }

  static contextTypes = {
    intl: intlShape,
  };

  state = {
    tooltipEnabled: true,
  };

  enableToolTip() {
    this.setState({ tooltipEnabled: true });
  }

  disableToolTip() {
    this.setState({ tooltipEnabled: false });
  }

  render() {
    const { openSettings, toggleMuteApp, isAppMuted } = this.props;
    const { intl } = this.context;

    return (
      <div className="sidebar">
        <Tabbar
          {...this.props}
          enableToolTip={() => this.enableToolTip()}
          disableToolTip={() => this.disableToolTip()}
        />
        <button
          onClick={toggleMuteApp}
          className={`sidebar__button sidebar__button--audio ${isAppMuted ? 'is-muted' : ''}`}
          data-tip={`${intl.formatMessage(isAppMuted ? messages.unmute : messages.mute)} (${ctrlKey}+Shift+M)`}
        >
          <i className={`mdi mdi-bell${isAppMuted ? '-off' : ''}`} />
        </button>
        <button
          onClick={() => openSettings({ path: 'recipes' })}
          className="sidebar__button sidebar__button--new-service"
          data-tip={`${intl.formatMessage(messages.addNewService)} (${ctrlKey}+N)`}
        >
          <i className="mdi mdi-plus-box" />
        </button>
        <button
          onClick={() => openSettings({ path: 'app' })}
          className="sidebar__button sidebar__button--settings"
          data-tip={`${intl.formatMessage(messages.settings)} (${ctrlKey}+,)`}
        >
          <i className="mdi mdi-settings" />
        </button>
        {this.state.tooltipEnabled && (
          <ReactTooltip place="right" type="dark" effect="solid" />
        )}
      </div>
    );
  }
}
