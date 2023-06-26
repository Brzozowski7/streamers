import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import theme from '../../constants/theme';

interface ModalWrapperProps {
  isOpen: boolean;
  handleClose: () => void;
}

const ModalWrapper: FC<PropsWithChildren<ModalWrapperProps>> = ({
  isOpen,
  handleClose,
  children,
}) => {
  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: 'absolute' as 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          maxHeight: '80%',
          overflowY: 'auto',
          boxShadow: 24,
          pt: 2,
          px: 4,
          pb: 3,
          [theme.breakpoints.down('md')]: {
            width: '80%',
          },
        }}
      >
        {children}
      </Box>
    </Modal>
  );
};

export default ModalWrapper;
