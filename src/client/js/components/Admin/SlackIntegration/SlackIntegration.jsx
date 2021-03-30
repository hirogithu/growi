import React from 'react';
import { useTranslation } from 'react-i18next';

import AccessTokenSettings from './AccessTokenSettings';
import CustomBotWithoutProxySettings from './CustomBotWithoutProxySettings';

function SlackIntegration() {

  const { t } = useTranslation('admin');
  return (
    <>
      <div className="row">
        <div className="col-lg-12">
          <h2 className="admin-setting-header">Access Token</h2>
          <AccessTokenSettings />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-12">
          <h2 className="admin-setting-header">{t('slack_integration.custom_bot_without_proxy_settings')}</h2>
          <CustomBotWithoutProxySettings />
        </div>
      </div>
    </>
  );
}

export default SlackIntegration;
