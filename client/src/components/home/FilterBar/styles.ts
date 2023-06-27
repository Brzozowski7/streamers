import { SxProps, Theme } from '@mui/material';
import theme from '../../../constants/theme';

export const filterBarWrapper: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  justifyContent: 'center',
  alignItems: 'center',
  gap: 3,
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 3,
  },
};

export const filterBarInput: SxProps<Theme> = {
  marginTop: '4px',
  '& .MuiInputLabel-root': {
    color: theme.palette.textColors.white,
    '&.Mui-focused': {
      color: theme.palette.textColors.white,
      backgroundColor: theme.palette.backgrounds.darkBlue,
      borderRadius: 1,
    },
  },
  '& .MuiInputBase-root': {
    width: '100%',
    height: '42px',
    borderRadius: '4px',
    fontSize: '16px',
    lineHeight: '24px',
    color: theme.palette.textColors.white,
    border: theme.palette.backgrounds.purple,
    boxShadow: `inset 0px 0px 8px 4px ${theme.palette.backgrounds.purple}`,
  },
  '& .MuiOutlinedInput-root.Mui-focused': {
    '& > fieldset': {
      border: `1px solid ${theme.palette.textColors.white}`,
    },
  },
  '& .MuiOutlinedInput-root:hover': {
    '& > fieldset': {
      borderColor: theme.palette.strokes.white,
    },
  },
};
