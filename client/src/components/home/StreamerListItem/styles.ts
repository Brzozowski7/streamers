import { SxProps, Theme } from '@mui/material';
import theme from '../../../constants/theme';

export const streamersListItemWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  backgroundColor: `${theme.palette.backgrounds.blue}80`,
  boxShadow: '0px 0px 14px 5px #00000010',
  p: 2,
  borderRadius: '10px',
  width: '100%',
  gap: 2,
  textDecoration: 'none',
  ':hover': {
    backgroundColor: `${theme.palette.backgrounds.blue}40`,
  },
};

export const streamerName: SxProps<Theme> = {
  color: theme.palette.textColors.white,
  fontSize: '28px',
};

export const thumb: SxProps<Theme> = {
  color: theme.palette.textColors.white,
  fontSize: '16px',
};

export const thumbCountWrapper: SxProps<Theme> = {
  color: theme.palette.textColors.white,
  fontSize: '24px',
};
