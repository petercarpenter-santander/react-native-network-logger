function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useThemedStyles, useTheme } from '../theme';
import { backHandlerSet } from '../backHandler';

const ResultItem = ({
  style,
  request,
  onPress
}) => {
  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();
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

  const MaybeTouchable = onPress ? TouchableOpacity : View;
  const status = request.status > 0 ? request.status : '-';

  const pad = num => `0${num}`.slice(-2);

  const getTime = time => {
    const date = new Date(time);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());
    return `${hours}:${minutes}:${seconds}`;
  };

  return /*#__PURE__*/React.createElement(MaybeTouchable, _extends({
    style: [styles.container, style]
  }, onPress && {
    accessibilityRole: 'button',
    onPress
  }), /*#__PURE__*/React.createElement(View, {
    style: styles.leftContainer
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, styles.method],
    accessibilityLabel: `Method: ${request.method}`
  }, request.method), /*#__PURE__*/React.createElement(View, {
    style: [styles.statusWrapper, getStatusWrapperStyles(request.status)]
  }, /*#__PURE__*/React.createElement(Text, {
    style: [styles.status, getStatusStyles(request.status)],
    accessibilityLabel: `Response status ${status}`
  }, status)), /*#__PURE__*/React.createElement(Text, {
    style: styles.text
  }, request.duration > 0 ? `${request.duration}ms` : 'pending'), /*#__PURE__*/React.createElement(Text, {
    style: styles.time
  }, getTime(request.startTime))), /*#__PURE__*/React.createElement(Text, {
    style: [styles.text, styles.content, getUrlTextColor(request.status), onDetailsPage && !backHandlerSet() && styles.paddedUrl]
  }, request.url));
};

const themedStyles = theme => StyleSheet.create({
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

export default ResultItem;
//# sourceMappingURL=ResultItem.js.map