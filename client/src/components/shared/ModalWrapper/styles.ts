import { SxProps, Theme } from '@mui/material';
import theme from '../../../constants/theme';

export const contentBox: SxProps<Theme> = {
  boxShadow: `0px 0px 18px 14px #00000020`,
  borderRadius: '20px',
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: theme.palette.backgrounds.blue,
  border: '2px solid #000',
  maxHeight: '80%',
  overflowY: 'auto',
  pt: 2,
  px: 4,
  pb: 3,
  [theme.breakpoints.down('md')]: {
    width: '80%',
  },
};
