import { Box, Modal } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { contentBox } from './styles';

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
    <Modal open={isOpen} onClose={handleClose}>
      <Box sx={contentBox}>{children}</Box>
    </Modal>
  );
};

export default ModalWrapper;
