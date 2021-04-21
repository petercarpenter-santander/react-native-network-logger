"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _loggerSingleton = _interopRequireDefault(require("../loggerSingleton"));

var _theme = require("../theme");

var _RequestList = _interopRequireDefault(require("./RequestList"));

var _RequestDetails = _interopRequireDefault(require("./RequestDetails"));

var _backHandler = require("../backHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

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
  const [requests, setRequests] = (0, _react.useState)(sortRequests(_loggerSingleton.default.getRequests(), sort));
  const [request, setRequest] = (0, _react.useState)();
  const [showDetails, _setShowDetails] = (0, _react.useState)(false);
  const setShowDetails = (0, _react.useCallback)(shouldShow => {
    _setShowDetails(shouldShow);

    if (shouldShow) {
      (0, _backHandler.setBackHandler)(() => setShowDetails(false));
    } else {
      (0, _backHandler.setBackHandler)(undefined);
    }
  }, []);
  (0, _react.useEffect)(() => {
    _loggerSingleton.default.setCallback(updatedRequests => {
      setRequests(sortRequests(updatedRequests, sort));
    });

    _loggerSingleton.default.enableXHRInterception();

    return () => {
      // no-op if component is unmounted
      _loggerSingleton.default.setCallback(() => {});
    };
  }, [sort]);
  (0, _react.useEffect)(() => {
    const onBack = () => {
      if (showDetails) {
        setShowDetails(false);
        return true;
      } // Let default back handler take over


      return false;
    };

    const backHandler = _reactNative.BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [showDetails, setShowDetails]);

  const showMore = () => {
    _reactNative.Alert.alert('More Options', undefined, [{
      text: 'Clear Logs',
      onPress: () => _loggerSingleton.default.clearRequests(),
      style: 'destructive'
    }, {
      text: 'Cancel',
      style: 'cancel'
    }]);
  };

  return /*#__PURE__*/_react.default.createElement(_theme.ThemeContext.Provider, {
    value: theme
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.visible
  }, showDetails && !!request && /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.visible
  }, /*#__PURE__*/_react.default.createElement(_RequestDetails.default, {
    onClose: () => setShowDetails(false),
    request: request
  })), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: showDetails && !!request ? styles.hidden : styles.visible
  }, /*#__PURE__*/_react.default.createElement(_RequestList.default, {
    requests: requests,
    onShowMore: showMore,
    showDetails: showDetails && !!request,
    onPressItem: item => {
      setRequest(item);
      setShowDetails(true);
    }
  }))));
};

const styles = _reactNative.StyleSheet.create({
  visible: {
    flex: 1
  },
  hidden: {
    flex: 0
  }
});

var _default = NetworkLogger;
exports.default = _default;
//# sourceMappingURL=NetworkLogger.js.map