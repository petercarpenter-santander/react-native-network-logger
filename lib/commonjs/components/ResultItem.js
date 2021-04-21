"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

var _backHandler = require("../backHandler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const ResultItem = ({
  style,
  request,
  onPress
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const theme = (0, _theme.useTheme)();
  const onDetailsPage = !onPress;

  const getUrlTextColor = status => {
    if (status >= 400) {
      return {
        color: getStatusTextColor(status)
      };
    }

    return {};
  };

  const getStatusTextColor = status => {
    if (status < 0) {
      return theme.colors.text;
    }

    if (status < 400) {
      return theme.colors.statusGood;
    }

    if (status < 500) {
      return theme.colors.statusWarning;
    }

    return theme.colors.statusBad;
  };

  const getStatusStyles = status => ({
    color: getStatusTextColor(status)
  });

  const getStatusWrapperStyles = status => ({
    borderColor: getStatusTextColor(status)
  });

  const MaybeTouchable = onPress ? _reactNative.TouchableOpacity : _reactNative.View;
  const status = request.status > 0 ? request.status : '-';

  const pad = num => `0${num}`.slice(-2);

  const getTime = time => {
    const date = new Date(time);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  };

  return /*#__PURE__*/_react.default.createElement(MaybeTouchable, _extends({
    style: [styles.container, style]
  }, onPress && {
    accessibilityRole: 'button',
    onPress
  }), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.leftContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, styles.method],
    accessibilityLabel: `Method: ${request.method}`
  }, request.method), /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: [styles.statusWrapper, getStatusWrapperStyles(request.status)]
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.status, getStatusStyles(request.status)],
    accessibilityLabel: `Response status ${status}`
  }, status)), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.text
  }, request.duration > 0 ? `${request.duration}ms` : 'pending'), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: styles.time
  }, getTime(request.startTime))), /*#__PURE__*/_react.default.createElement(_reactNative.Text, {
    style: [styles.text, styles.content, getUrlTextColor(request.status), onDetailsPage && !(0, _backHandler.backHandlerSet)() && styles.paddedUrl]
  }, request.url));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: theme.colors.card,
    flexDirection: 'row',
    margin: 5,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 5
  },
  leftContainer: {
    flexDirection: 'column',
    alignItems: 'center'
  },
  status: {
    fontWeight: 'bold',
    textAlign: 'center'
  },
  statusWrapper: {
    borderWidth: 1,
    borderRadius: 10,
    paddingVertical: 1,
    paddingHorizontal: 4,
    marginVertical: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: theme.colors.text,
    fontSize: 16
  },
  content: {
    paddingLeft: 5,
    paddingRight: 5,
    flexShrink: 1,
    flex: 1
  },
  method: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 0,
    width: 80
  },
  time: {
    color: theme.colors.muted,
    marginTop: 5,
    marginHorizontal: 2
  },
  paddedUrl: {
    paddingVertical: 20
  }
});

var _default = ResultItem;
exports.default = _default;
//# sourceMappingURL=ResultItem.js.map