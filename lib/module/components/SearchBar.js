import React from 'react';
import { View, Image, TextInput, StyleSheet } from 'react-native';
import { useThemedStyles, useTheme } from '../theme';

const SearchBar = ({
  value,
  onChangeText
}) => {
  const styles = useThemedStyles(themedStyles);
  const theme = useTheme();
  return /*#__PURE__*/React.createElement(View, {
    style: styles.searchContainer
  }, /*#__PURE__*/React.createElement(Image, {
    source: require('./search.png'),
    resizeMode: "contain",
    style: styles.searchIcon
  }), /*#__PURE__*/React.createElement(TextInput, {
    onChangeText: onChangeText,
    value: value,
    placeholder: "Filter URLs",
    underlineColorAndroid: "transparent",
    style: styles.textInputSearch,
    placeholderTextColor: theme.colors.muted
  }));
};

const themedStyles = theme => StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    margin: 5,
    borderWidth: 1,
    borderColor: theme.colors.muted,
    borderRadius: 20
  },
  searchIcon: {
    width: 20,
    height: 20,
    marginRight: 10
  },
  textInputSearch: {
    height: 30,
    padding: 0,
    flexGrow: 1,
    color: theme.colors.text
  }
});

export default SearchBar;
//# sourceMappingURL=SearchBar.js.map