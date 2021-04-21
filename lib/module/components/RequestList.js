import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useThemedStyles } from '../theme';
import ResultItem from './ResultItem';
import Button from './Button';
import SearchBar from './SearchBar';

const RequestList = ({
  requests,
  onPressItem,
  onShowMore,
  showDetails
}) => {
  const styles = useThemedStyles(themedStyles);
  const [searchValue, onChangeSearchText] = useState('');
  const filteredRequests = requests.filter(request => request.url.toLowerCase().includes(searchValue.toLowerCase()));
  return /*#__PURE__*/React.createElement(View, {
    style: styles.container
  }, !showDetails && /*#__PURE__*/React.createElement(SearchBar, {
    value: searchValue,
    onChangeText: onChangeSearchText
  }), /*#__PURE__*/React.createElement(FlatList, {
    keyExtractor: item => item.id,
    ListHeaderComponent: () => /*#__PURE__*/React.createElement(Button, {
      onPress: onShowMore,
      style: styles.more
    }, "More"),
    data: filteredRequests,
    renderItem: ({
      item
    }) => /*#__PURE__*/React.createElement(ResultItem, {
      request: item,
      onPress: () => onPressItem(item)
    })
  }));
};

const themedStyles = theme => StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  more: {
    marginLeft: 10
  }
});

export default RequestList;
//# sourceMappingURL=RequestList.js.map