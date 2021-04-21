"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useThemedStyles = exports.useTheme = exports.ThemeContext = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const ThemeContext = /*#__PURE__*/_react.default.createContext('light');

exports.ThemeContext = ThemeContext;
const darkTheme = {
  colors: {
    background: '#2d2a28',
    link: '#0077ff',
    card: '#3a3a3c',
    text: '#ffffff',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    muted: '#cccccc'
  }
};
const lightTheme = {
  colors: {
    background: '#ededed',
    link: '#0077ff',
    card: '#ffffff',
    text: '#000000',
    statusGood: '#28a844',
    statusWarning: '#ffc007',
    statusBad: '#dd3444',
    muted: '#757575'
  }
};
const themes = {
  dark: darkTheme,
  light: lightTheme
};

const useTheme = () => {
  const themeName = (0, _react.useContext)(ThemeContext);
  return themes[themeName];
};

exports.useTheme = useTheme;

const useThemedStyles = styles => {
  const theme = useTheme();
  return styles(theme);
};

exports.useThemedStyles = useThemedStyles;
//# sourceMappingURL=theme.js.map