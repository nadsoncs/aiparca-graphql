import { extendTheme } from 'native-base';

export const theme = extendTheme({
  colors: {
    primary: {
      100: '#F9F5F2',
      500: '#C7BDBD',
      600: '#AE896E',
      700: '#894F2C',
      800: '#A8A29E',
      900: '#57534E',
    },
    secondary: {
      700: '#FBA94C'
    }, 
    gray: {
      700: '#121214',
      600: '#202024',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
      50: '#FAFAFC',
    },
    white: '#FFFFFF'
  },
  fonts: {
    heading: 'Roboto_700Bold',
    body: 'Roboto_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56
  }
});