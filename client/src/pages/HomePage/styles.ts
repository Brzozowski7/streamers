import { SxProps, Theme } from '@mui/material';
import theme from '../../constants/theme';

export const homePageWrapper: SxProps<Theme> = {
  width: '100vw',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  bgcolor: theme.palette.backgrounds.darkBlue,
  gap: 2,
};

export const createStreamerBtn: SxProps<Theme> = {
  bgcolor: theme.palette.backgrounds.purple,
  width: '250px',
  ':hover': {
    bgcolor: theme.palette.backgrounds.darkPurple,
  },
};

export const homePageHeading: SxProps<Theme> = {
  color: theme.palette.backgrounds.purple,
};

export const createStreamerAndFilterBarWrapper: SxProps<Theme> = {
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  gap: 2,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    flexDirection: 'row',
    p: 2,
    borderBottom: `0.5px solid ${theme.palette.strokes.white}`,
  },
};

export const homePagePagination: SxProps<Theme> = {
  mb: 2,
  justifySelf: 'flex-end',
  '& .MuiPagination-ul': {
    '& .MuiPaginationItem-root': {
      color: theme.palette.textColors.white,
    },
    '& .MuiPaginationItem-root.Mui-selected': {
      bgcolor: theme.palette.backgrounds.purple,
      color: theme.palette.textColors.white,
    },
    '& .MuiPaginationItem-icon': {
      color: theme.palette.textColors.white,
    },
    '& .MuiPaginationItem-ellipsis': {
      color: theme.palette.textColors.white,
    },
  },
};

export const matchingResults: SxProps<Theme> = {
  color: theme.palette.textColors.white,
};
