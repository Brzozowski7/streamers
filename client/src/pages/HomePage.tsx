import { Box, Button, Pagination, Stack } from '@mui/material';
import StreamerForm from '../components/home/StreamerForm';
import StreamersList from '../components/home/StreamersList';
import { useEffect, useState } from 'react';

import socket from '../services/networking/socket/socket';
import { SocketResponseMessage } from '../services/networking/socket/socketResponseMessage';
import { useQueryClient } from '@tanstack/react-query';
import { apiRoutes } from '../services/networking/apiRoutes';
import ModalWrapper from '../components/shared/ModalWrapper';
import FilterBar, { IQueryParams } from '../components/home/FilterBar';
import { useGetStreamers } from '../services/networking/streamers/useGetStreamers';

function HomePage() {
  const queryClient = useQueryClient();
  const [queryParams, setQueryParams] = useState<IQueryParams>();
  const [isCreateStreamerModalOpen, setIsCreateStreamerModalOpen] =
    useState(false);

  const { data: streamersData } = useGetStreamers(queryParams);

  const handleOpenCreateStreamerModal = () => {
    setIsCreateStreamerModalOpen(true);
  };

  const handleCloseCreateStreamerModal = () => {
    setIsCreateStreamerModalOpen(false);
  };

  useEffect(() => {
    socket.connect();

    socket.on(SocketResponseMessage.NewVote, () => {
      queryClient.invalidateQueries([apiRoutes.streamers]);
    });

    socket.on(SocketResponseMessage.NewVote, () => {
      queryClient.invalidateQueries([apiRoutes.streamers]);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Stack
      alignItems="center"
      spacing={2}
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        pt: 3,
        // background: theme.palette.background.default,
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={handleOpenCreateStreamerModal}
      >
        Create streamer
      </Button>
      <ModalWrapper
        isOpen={isCreateStreamerModalOpen}
        handleClose={handleCloseCreateStreamerModal}
      >
        <StreamerForm onCreateSuccess={handleCloseCreateStreamerModal} />
      </ModalWrapper>
      <Box sx={{}}>
        <FilterBar setQueryParams={setQueryParams} />
        <StreamersList streamers={streamersData?.docs} />
      </Box>

      <Pagination
        onChange={(e, page) =>
          setQueryParams((prev) => {
            return { ...prev, page };
          })
        }
        count={streamersData?.totalPages || 10}
      />
    </Stack>
  );
}

export default HomePage;
