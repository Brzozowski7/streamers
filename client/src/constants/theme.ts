import { createTheme } from '@mui/material/styles';
import colorPalette from './colorPallete';

const theme = createTheme({
  palette: {
    primary: {
      main: colorPalette.purple,
    },
    secondary: {
      main: colorPalette.white,
    },
    background: {
      default: colorPalette.darkBackground,
    },
  },
  typography: {
    fontFamily: 'Roboto',
  },
});

export default theme;
