import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';


const MessageBasedOnConnection = (props) => {
  const { isLatestConnectionSuccess, logsValue } = props;
  const { t } = useTranslation();

  console.log(isLatestConnectionSuccess);
  if (isLatestConnectionSuccess) {
    return <p className="text-info text-center my-4">{t('admin:slack_integration.accordion.send_message_to_slack_work_space')}</p>;
  }

  if (logsValue === '') {
    return <p></p>;
  }

  return <p className="text-danger text-center my-4">{t('admin:slack_integration.accordion.error_check_logs_below')}</p>;
};

MessageBasedOnConnection.propTypes = {
  isLatestConnectionSuccess: PropTypes.bool.isRequired,
  logsValue: PropTypes.string.isRequired,
};

export default MessageBasedOnConnection;
