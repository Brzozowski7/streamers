import { SxProps, Theme } from '@mui/material';
import theme from '../../../constants/theme';

export const streamerFormWrapper: SxProps<Theme> = {
  boxShadow: `inset 0px 0px 8px 4px ${theme.palette.backgrounds.purple}`,
  bgColor: theme.palette.backgrounds.darkPurple,
};

export const avatarName: SxProps<Theme> = {
  color: theme.palette.textColors.white,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  textAlign: 'center',
  width: '160px',
};

export const uploadAvatarButton: SxProps<Theme> = {
  // boxShadow: `inset 0px 0px 8px 4px ${theme.palette.backgrounds.purple}`,
  maxHeight: '50px',
  width: '100%',
  color: theme.palette.textColors.white,
  '&.MuiButton-outlined': {
    borderColor: theme.palette.backgrounds.purple,
    borderStyle: 'dashed',
  },
};

export const streamerFormInput: SxProps<Theme> = {
  '& .MuiInputLabel-root': {
    color: theme.palette.textColors.white,
    '&.Mui-focused': {
      color: theme.palette.textColors.white,
      backgroundColor: theme.palette.backgrounds.blue,
      borderRadius: 1,
    },
  },
};

export const createStreamerBtn: SxProps<Theme> = {
  bgcolor: theme.palette.backgrounds.purple,
  flex: 1,
  ':hover': {
    bgcolor: theme.palette.backgrounds.darkPurple,
  },
};
