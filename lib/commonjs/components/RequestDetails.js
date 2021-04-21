"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

var _backHandler = require("../backHandler");

var _ResultItem = _interopRequireDefault(require("./ResultItem"));

var _Header = _interopRequireDefault(require("./Header"));

var _Button = _interopRequireDefault(require("./Button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const Headers = ({
  title = 'Headers',
  headers
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_Header.default, {
    shareContent: headers && JSON.stringify(headers, null, 2)
  }, title), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.content
  }, Object.entries(headers || {}).map(([name, value]) => /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.headerContainer,
    key: name
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerKey
  }, name, ": "), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.headerValue
  }, value)))));
};

const LargeText = ({
  children
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);

  if (_reactNative.Platform.OS === 'ios') {
    /**
     * A readonly TextInput is used because large Text blocks sometimes don't render on iOS
     * See this issue https://github.com/facebook/react-native/issues/19453
     * Note: Even with the fix mentioned in the comments, text with ~10,000 lines still fails to render
     */
    return /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
      style: [styles.content, styles.largeContent],
      multiline: true,
      editable: false
    }, children);
  }

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.largeContent
  }, /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    nestedScrollEnabled: true
  }, /*#__PURE__*/_react.default.createElement(_reactNative.View, null, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.content
  }, children))));
};

const RequestDetails = ({
  request,
  onClose
}) => {
  const [responseBody, setResponseBody] = (0, _react.useState)('Loading...');
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  (0, _react.useEffect)(() => {
    (async () => {
      const body = await request.getResponseBody();
      setResponseBody(body);
    })();
  }, [request]);
  const requestBody = request.getRequestBody();

  const getFullRequest = () => {
    let response;

    if (responseBody) {
      try {
        response = JSON.parse(responseBody);
      } catch {
        response = `${responseBody}`;
      }
    }

    const processedRequest = { ...request,
      response,
      duration: request.duration
    };
    return JSON.stringify(processedRequest, null, 2);
  };

  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, /*#__PURE__*/_react.default.createElement(_ResultItem.default, {
    request: request,
    style: styles.info
  }), /*#__PURE__*/_react.default.createElement(_reactNative.ScrollView, {
    style: styles.scrollView,
    nestedScrollEnabled: true
  }, /*#__PURE__*/_react.default.createElement(Headers, {
    title: "Request Headers",
    headers: request.requestHeaders
  }), /*#__PURE__*/_react.default.createElement(_Header.default, {
    shareContent: requestBody
  }, "Request Body"), /*#__PURE__*/_react.default.createElement(LargeText, null, requestBody), /*#__PURE__*/_react.default.createElement(Headers, {
    title: "Response Headers",
    headers: request.responseHeaders
  }), /*#__PURE__*/_react.default.createElement(_Header.default, {
    shareContent: responseBody
  }, "Response Body"), /*#__PURE__*/_react.default.createElement(LargeText, null, responseBody), /*#__PURE__*/_react.default.createElement(_Header.default, null, "More"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onPress: () => _reactNative.Share.share({
      message: getFullRequest()
    }),
    fullWidth: true
  }, "Share full request"), /*#__PURE__*/_react.default.createElement(_Button.default, {
    onPress: () => _reactNative.Share.share({
      message: request.curlRequest
    }),
    fullWidth: true
  }, "Share as cURL")), !(0, _backHandler.backHandlerSet)() && /*#__PURE__*/_react.default.createElement(_Button.default, {
    onPress: onClose,
    style: styles.close
  }, "Close"));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 10
  },
  info: {
    margin: 0
  },
  close: {
    position: 'absolute',
    right: 10,
    top: 0
  },
  scrollView: {
    width: '100%'
  },
  headerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  headerKey: {
    fontWeight: 'bold',
    color: theme.colors.text
  },
  headerValue: {
    color: theme.colors.text
  },
  text: {
    fontSize: 16,
    color: theme.colors.text
  },
  content: {
    backgroundColor: theme.colors.card,
    padding: 10,
    color: theme.colors.text
  },
  largeContent: {
    maxHeight: 300
  }
});

var _default = RequestDetails;
exports.default = _default;
//# sourceMappingURL=RequestDetails.js.map