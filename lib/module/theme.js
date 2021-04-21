import React, { useContext } from 'react';
export const ThemeContext = /*#__PURE__*/React.createContext('light');
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
export const useTheme = () => {
  const themeName = useContext(ThemeContext);
  return themes[themeName];
};
export const useThemedStyles = styles => {
  const theme = useTheme();
  return styles(theme);
};
//# sourceMappingURL=theme.js.map