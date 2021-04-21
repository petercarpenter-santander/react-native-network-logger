"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactNative = require("react-native");

var _theme = require("../theme");

var _ResultItem = _interopRequireDefault(require("./ResultItem"));

var _Button = _interopRequireDefault(require("./Button"));

var _SearchBar = _interopRequireDefault(require("./SearchBar"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RequestList = ({
  requests,
  onPressItem,
  onShowMore,
  showDetails
}) => {
  const styles = (0, _theme.useThemedStyles)(themedStyles);
  const [searchValue, onChangeSearchText] = (0, _react.useState)('');
  const filteredRequests = requests.filter(request => request.url.toLowerCase().includes(searchValue.toLowerCase()));
  return /*#__PURE__*/_react.default.createElement(_reactNative.View, {
    style: styles.container
  }, !showDetails && /*#__PURE__*/_react.default.createElement(_SearchBar.default, {
    value: searchValue,
    onChangeText: onChangeSearchText
  }), /*#__PURE__*/_react.default.createElement(_reactNative.FlatList, {
    keyExtractor: item => item.id,
    ListHeaderComponent: () => /*#__PURE__*/_react.default.createElement(_Button.default, {
      onPress: onShowMore,
      style: styles.more
    }, "More"),
    data: filteredRequests,
    renderItem: ({
      item
    }) => /*#__PURE__*/_react.default.createElement(_ResultItem.default, {
      request: item,
      onPress: () => onPressItem(item)
    })
  }));
};

const themedStyles = theme => _reactNative.StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    flex: 1
  },
  more: {
    marginLeft: 10
  }
});

var _default = RequestList;
exports.default = _default;
//# sourceMappingURL=RequestList.js.map