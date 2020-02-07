import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';

import StatusActivateButton from './StatusActivateButton';
import StatusSuspendedButton from './StatusSuspendedButton';
import RemoveUserButton from './UserRemoveButton';
import RemoveAdminButton from './RemoveAdminButton';
import GiveAdminButton from './GiveAdminButton';

import { createSubscribedElement } from '../../UnstatedUtils';
import AppContainer from '../../../services/AppContainer';
import AdminUsersContainer from '../../../services/AdminUsersContainer';

class UserMenu extends React.Component {

  constructor(props) {
    super(props);

    this.state = {

    };

    this.onPasswordResetClicked = this.onPasswordResetClicked.bind(this);
  }

  onPasswordResetClicked() {
    this.props.adminUsersContainer.showPasswordResetModal(this.props.user);
  }

  renderEditMenu() {
    const { t } = this.props;

    return (
      <Fragment>
        <li className="dropdown-divider"></li>
        <li className="dropdown-header">{ t('user_management.edit_menu') }</li>
        <li>
          <a className="btn" href="#" role="button" onClick={this.onPasswordResetClicked}>
            <div className="px-4">
              <i className="icon-fw icon-key mb-2"></i>{ t('user_management.reset_password') }
            </div>
          </a>
        </li>
      </Fragment>
    );
  }

  renderStatusMenu() {
    const { t, user } = this.props;

    return (
      <Fragment>
        <li className="dropdown-divider"></li>
        <li className="dropdown-header">{ t('status') }</li>
        <li>
          {(user.status === 1 || user.status === 3) && <StatusActivateButton user={user} />}
          {user.status === 2 && <StatusSuspendedButton user={user} />}
          {(user.status === 1 || user.status === 3 || user.status === 5) && <RemoveUserButton user={user} />}
        </li>
      </Fragment>
    );
  }

  renderAdminMenu() {
    const { t, user } = this.props;

    return (
      <Fragment>
        <li className="dropdown-divider pl-0"></li>
        <li className="dropdown-header">{ t('user_management.administrator_menu') }</li>
        <li>
          {user.admin === true && <RemoveAdminButton user={user} />}
          {user.admin === false && <GiveAdminButton user={user} />}
        </li>
      </Fragment>
    );
  }

  render() {
    const { user } = this.props;

    return (
      <Fragment>
        <div className="btn-group admin-user-menu" role="group">
          <button type="button" className="btn btn-light btn-sm dropdown-toggle" data-toggle="dropdown">
            <i className="icon-settings"></i>
          </button>
          <div className="dropdown-menu" role="menu">
            {this.renderEditMenu()}
            {user.status !== 4 && this.renderStatusMenu()}
            {user.status === 2 && this.renderAdminMenu()}
          </div>
        </div>
      </Fragment>
    );
  }

}

const UserMenuWrapper = (props) => {
  return createSubscribedElement(UserMenu, props, [AppContainer, AdminUsersContainer]);
};

UserMenu.propTypes = {
  t: PropTypes.func.isRequired, // i18next
  appContainer: PropTypes.instanceOf(AppContainer).isRequired,
  adminUsersContainer: PropTypes.instanceOf(AdminUsersContainer).isRequired,

  user: PropTypes.object.isRequired,
};

export default withTranslation()(UserMenuWrapper);
