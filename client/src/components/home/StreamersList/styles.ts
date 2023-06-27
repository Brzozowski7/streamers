import { SxProps, Theme } from '@mui/material';
import theme from '../../../constants/theme';

export const streamersListWrapper: SxProps<Theme> = {
  alignItems: 'center',
  height: '100%',
  width: '100%',
  overflowY: 'auto',
};

export const emptyListText: SxProps<Theme> = {
  color: theme.palette.textColors.white,
};
