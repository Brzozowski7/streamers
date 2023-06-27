import { SxProps, Theme } from '@mui/material';
import { CSSProperties } from 'react';
import theme from '../../constants/theme';

export const streamerPageWrapper: SxProps<Theme> = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: theme.palette.backgrounds.darkBlue,
};

export const streamerCard: SxProps<Theme> = {
  display: 'flex',
  flexDirection: 'column',
  bgcolor: theme.palette.backgrounds.blue,
  color: theme.palette.textColors.white,
  borderRadius: '24px',
  gap: 2,
  p: 6,
  mx: 1,
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    width: '50%',
    borderTopLeftRadius: '200px',
    borderBottomLeftRadius: '200px',
    borderTopRightRadius: '24px',
    borderBottomRightRadius: '24px',
  },
};

export const streamerInfoWrapper: SxProps<Theme> = {
  alignItems: 'center',
  justifyContent: 'space-around',
  flex: 1,
  gap: 4,
};

export const avatarWrapper: SxProps<Theme> = {
  width: '300px',
  height: '300px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: theme.palette.backgrounds.purple,
  border: `2px solid #ffffff`,
  boxShadow: `0px 0px 10px 4px ${theme.palette.backgrounds.purple}`,
  borderRadius: '50%',
};

export const avatar: CSSProperties = {
  borderRadius: '50%',
  width: '290px',
  height: '290px',
  objectFit: 'cover',
};

export const voteButton: SxProps<Theme> = {
  color: theme.palette.textColors.white,
  '&.MuiButton-outlined': {
    borderColor: theme.palette.common.white,
    '&:hover': {
      boxShadow: `inset 0px 0px 8px 4px ${theme.palette.backgrounds.purple}`,
      borderColor: theme.palette.backgrounds.darkPurple,
    },
  },
  '&.MuiButton-contained': {
    borderColor: theme.palette.common.white,
    bgcolor: theme.palette.backgrounds.darkPurple,
    '&:hover': {
      boxShadow: `inset 0px 0px 8px 4px ${theme.palette.strokes.white}`,
      borderColor: theme.palette.strokes.white,
    },
  },
  ':disabled': {
    opacity: 0.4,
    color: theme.palette.textColors.white,
    backgroundColor: theme.palette.backgrounds.darkBlue,
    border:0
  },
};

export const descriptionWrapper: SxProps<Theme> = {
  maxHeight: '72px',
  overflowY: 'auto',
};
