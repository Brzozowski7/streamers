import { createTheme } from '@mui/material/styles';
import './mui.theme.d.ts';
import colorPalette from './colorPallete';

const theme = createTheme({
  palette: {
    textColors: {
      white: colorPalette.white,
      purple: colorPalette.purple,
      pink: colorPalette.pink,
    },
    backgrounds: {
      darkBlue: colorPalette.darkBlue,
      blue: colorPalette.blue,
      purple: colorPalette.purple,
      darkPurple: colorPalette.darkPurple,
    },
    strokes: {
      white: colorPalette.white,
    },
  },
  typography: {
    allVariants: {
      fontFamily: 'Roboto',
    },
  },
});

export default theme;
