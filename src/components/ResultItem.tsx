import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import NetworkRequestInfo from '../NetworkRequestInfo';
import { Theme, useThemedStyles, useTheme } from '../theme';
import { backHandlerSet } from '../backHandler';

interface Props {
  request: NetworkRequestInfo;
  onPress?(): void;
  style?: any;
}

const ResultItem: React.FC<Props> = ({ style, request, onPress }) => {
  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();
  const onDetailsPage = !onPress;
  const getUrlTextColor = (status: number) => {
    if (status >= 400) {
      return {
        color: getStatusTextColor(status),
      };
    }
    return {};
  };
  const getStatusTextColor = (status: number) => {
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

  const getStatusStyles = (status: number) => ({
    color: getStatusTextColor(status),
  });

  const getStatusWrapperStyles = (status: number) => ({
    borderColor: getStatusTextColor(status),
  });

  const MaybeTouchable: any = onPress ? TouchableOpacity : View;

  const status = request.status > 0 ? request.status : '-';

  const pad = (num: number) => `0${num}`.slice(-2);

  const getTime = (time: number) => {
    const date = new Date(time);
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <MaybeTouchable
      style={[styles.container, style]}
      {...(onPress && { accessibilityRole: 'button', onPress })}
    >
      <View style={styles.leftContainer}>
        <Text
          style={[styles.text, styles.method]}
          accessibilityLabel={`Method: ${request.method}`}
        >
          {request.method}
        </Text>
        <View
          style={[styles.statusWrapper, getStatusWrapperStyles(request.status)]}
        >
          <Text
            style={[styles.status, getStatusStyles(request.status)]}
            accessibilityLabel={`Response status ${status}`}
          >
            {status}
          </Text>
        </View>
        <Text style={styles.text}>
          {request.duration > 0 ? `${request.duration}ms` : 'pending'}
        </Text>
        <Text style={styles.time}>{getTime(request.startTime)}</Text>
      </View>
      <Text
        style={[
          styles.text,
          styles.content,
          getUrlTextColor(request.status),
          onDetailsPage && !backHandlerSet() && styles.paddedUrl,
        ]}
      >
        {request.url}
      </Text>
    </MaybeTouchable>
  );
};

const themedStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      flexDirection: 'row',
      margin: 5,
      paddingTop: 10,
      paddingBottom: 10,
      borderRadius: 5,
    },
    leftContainer: {
      flexDirection: 'column',
      alignItems: 'center',
    },
    status: {
      fontWeight: 'bold',
      textAlign: 'center',
    },
    statusWrapper: {
      borderWidth: 1,
      borderRadius: 10,
      paddingVertical: 1,
      paddingHorizontal: 4,
      marginVertical: 3,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      color: theme.colors.text,
      fontSize: 16,
    },
    content: {
      paddingLeft: 5,
      paddingRight: 5,
      flexShrink: 1,
      flex: 1,
    },
    method: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      padding: 0,
      width: 80,
    },
    time: {
      color: theme.colors.muted,
      marginTop: 5,
      marginHorizontal: 2,
    },
    paddedUrl: {
      paddingVertical: 20,
    },
  });

export default ResultItem;
