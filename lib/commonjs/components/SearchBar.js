"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SearchBar = ({
  value,
  onChangeText
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const theme = (0, _theme.useTheme)();
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.searchContainer
  }, /*#__PURE__*/_react.default.createElement(_reactNative.Image, {
    source: require('./search.png'),
    resizeMode: "contain",
    style: styles.searchIcon
  }), /*#__PURE__*/_react.default.createElement(_reactNative.TextInput, {
    onChangeText: onChangeText,
    value: value,
    placeholder: "Filter URLs",
    underlineColorAndroid: "transparent",
    style: styles.textInputSearch,
    placeholderTextColor: theme.colors.muted
  }));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
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

var _default = SearchBar;
exports.default = _default;
//# sourceMappingURL=SearchBar.js.map