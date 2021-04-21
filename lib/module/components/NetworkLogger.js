import React, { useEffect, useState, useCallback } from 'react';
import { Alert, View, StyleSheet, BackHandler } from 'react-native';
import logger from '../loggerSingleton';
import { ThemeContext } from '../theme';
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import { setBackHandler } from '../backHandler';

const sortRequests = (requests, sort) => {
  if (sort === 'asc') {
    return requests.reverse();
  }

  return [...requests];
};

const NetworkLogger = ({
  theme = 'light',
  sort = 'desc'
}) => {
  const [requests, setRequests] = useState(sortRequests(logger.getRequests(), sort));
  const [request, setRequest] = useState();
  const [showDetails, _setShowDetails] = useState(false);
  const setShowDetails = useCallback(shouldShow => {
    _setShowDetails(shouldShow);

    if (shouldShow) {
      setBackHandler(() => setShowDetails(false));
    } else {
      setBackHandler(undefined);
    }
  }, []);
  useEffect(() => {
    logger.setCallback(updatedRequests => {
      setRequests(sortRequests(updatedRequests, sort));
    });
    logger.enableXHRInterception();
    return () => {
      // no-op if component is unmounted
      logger.setCallback(() => {});
    };
  }, [sort]);
  useEffect(() => {
    const onBack = () => {
      if (showDetails) {
        setShowDetails(false);
        return true;
      } // Let default back handler take over


      return false;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, [showDetails, setShowDetails]);

  const showMore = () => {
    Alert.alert('More Options', undefined, [{
      text: 'Clear Logs',
      onPress: () => logger.clearRequests(),
      style: 'destructive'
    }, {
      text: 'Cancel',
      style: 'cancel'
    }]);
  };

  return /*#__PURE__*/React.createElement(ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/React.createElement(View, {
    style: styles.visible
  }, showDetails && !!request && /*#__PURE__*/React.createElement(View, {
    style: styles.visible
  }, /*#__PURE__*/React.createElement(RequestDetails, {
    onClose: () => setShowDetails(false),
    request: request
  })), /*#__PURE__*/React.createElement(View, {
    style: showDetails && !!request ? styles.hidden : styles.visible
  }, /*#__PURE__*/React.createElement(RequestList, {
    requests: requests,
    onShowMore: showMore,
    showDetails: showDetails && !!request,
    onPressItem: item => {
      setRequest(item);
      setShowDetails(true);
    }
  }))));
};

const styles = StyleSheet.create({
  visible: {
    flex: 1
  },
  hidden: {
    flex: 0
  }
});
export default NetworkLogger;
//# sourceMappingURL=NetworkLogger.js.map