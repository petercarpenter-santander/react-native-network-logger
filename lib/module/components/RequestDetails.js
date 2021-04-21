import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Share, TextInput, Platform } from 'react-native';
import { useThemedStyles } from '../theme';
import { backHandlerSet } from '../backHandler';
import ResultItem from './ResultItem';
import Header from './Header';
import Button from './Button';

const Headers = ({
  title = 'Headers',
  headers
}) => {
  const styles = useThemedStyles(themedStyles);
  return /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Header, {
    shareContent: headers && JSON.stringify(headers, null, 2)
  }, title), /*#__PURE__*/React.createElement(View, {
    style: styles.content
  }, Object.entries(headers || {}).map(([name, value]) => /*#__PURE__*/React.createElement(View, {
    style: styles.headerContainer,
    key: name
  }, /*#__PURE__*/React.createElement(Text, {
    style: styles.headerKey
  }, name, ": "), /*#__PURE__*/React.createElement(Text, {
    style: styles.headerValue
  }, value)))));
};

const LargeText = ({
  children
}) => {
  const styles = useThemedStyles(themedStyles);

  if (Platform.OS === 'ios') {
    /**
     * A readonly TextInput is used because large Text blocks sometimes don't render on iOS
     * See this issue https://github.com/facebook/react-native/issues/19453
     * Note: Even with the fix mentioned in the comments, text with ~10,000 lines still fails to render
     */
    return /*#__PURE__*/React.createElement(TextInput, {
      style: [styles.content, styles.largeContent],
      multiline: true,
      editable: false
    }, children);
  }

  return /*#__PURE__*/React.createElement(View, {
    style: styles.largeContent
  }, /*#__PURE__*/React.createElement(ScrollView, {
    nestedScrollEnabled: true
  }, /*#__PURE__*/React.createElement(View, null, /*#__PURE__*/React.createElement(Text, {
    style: styles.content
  }, children))));
};

const RequestDetails = ({
  request,
  onClose
}) => {
  const [responseBody, setResponseBody] = useState('Loading...');
  const styles = useThemedStyles(themedStyles);
  useEffect(() => {
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

  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, /*#__PURE__*/React.createElement(ResultItem, {
    request: request,
    style: styles.info
  }), /*#__PURE__*/React.createElement(ScrollView, {
    style: styles.scrollView,
    nestedScrollEnabled: true
  }, /*#__PURE__*/React.createElement(Headers, {
    title: "Request Headers",
    headers: request.requestHeaders
  }), /*#__PURE__*/React.createElement(Header, {
    shareContent: requestBody
  }, "Request Body"), /*#__PURE__*/React.createElement(LargeText, null, requestBody), /*#__PURE__*/React.createElement(Headers, {
    title: "Response Headers",
    headers: request.responseHeaders
  }), /*#__PURE__*/React.createElement(Header, {
    shareContent: responseBody
  }, "Response Body"), /*#__PURE__*/React.createElement(LargeText, null, responseBody), /*#__PURE__*/React.createElement(Header, null, "More"), /*#__PURE__*/React.createElement(Button, {
    onPress: () => Share.share({
      message: getFullRequest()
    }),
    fullWidth: true
  }, "Share full request"), /*#__PURE__*/React.createElement(Button, {
    onPress: () => Share.share({
      message: request.curlRequest
    }),
    fullWidth: true
  }, "Share as cURL")), !backHandlerSet() && /*#__PURE__*/React.createElement(Button, {
    onPress: onClose,
    style: styles.close
  }, "Close"));
};

const themedStyles = theme => StyleSheet.create({
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

export default RequestDetails;
//# sourceMappingURL=RequestDetails.js.map