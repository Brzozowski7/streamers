import { PaletteColorOptions } from '@mui/material/styles';

export interface CustomPalette {
  textColors: PaletteColorOptions & {
    white: string;
    purple: string;
    pink: string;
  };
  backgrounds: PaletteColorOptions & {
    darkBlue: string;
    purple: string;
    darkPurple: string;
    blue: string;
  };
  strokes: PaletteColorOptions & {
    white: string;
  };
}
