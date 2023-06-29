import {
  Button,
  Container,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';
import StreamersList from '../../components/home/StreamersList';
import { useEffect, useState } from 'react';
import socket from '../../services/networking/socket/socket';
import { SocketResponseMessage } from '../../services/networking/socket/socketResponseMessage';
import { apiRoutes } from '../../services/networking/apiRoutes';
import ModalWrapper from '../../components/shared/ModalWrapper';
import { useGetStreamers } from '../../services/networking/streamers/useGetStreamers';
import {
  createStreamerAndFilterBarWrapper,
  createStreamerBtn,
  homePageHeading,
  homePagePagination,
  homePageWrapper,
  matchingResults,
} from './styles';
import FilterBar, {
  IQueryParams,
} from '../../components/home/FilterBar/FilterBar';
import StreamerForm from '../../components/home/StreamerForm';

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

    socket.on(SocketResponseMessage.NewStreamer, () => {
      queryClient.invalidateQueries([apiRoutes.streamers]);
    });

    return () => {
      socket.disconnect();
      socket.removeAllListeners();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ModalWrapper
        isOpen={isCreateStreamerModalOpen}
        handleClose={handleCloseCreateStreamerModal}
      >
        <StreamerForm onCreateSuccess={handleCloseCreateStreamerModal} />
      </ModalWrapper>
      <Stack sx={homePageWrapper}>
        <Container sx={createStreamerAndFilterBarWrapper}>
          <Typography sx={homePageHeading} variant="h3" component="h1">
            Streamers
          </Typography>
          <FilterBar setQueryParams={setQueryParams} />
          <Button
            sx={createStreamerBtn}
            variant="contained"
            color="primary"
            onClick={handleOpenCreateStreamerModal}
          >
            Create streamer
          </Button>
        </Container>
        <StreamersList streamers={streamersData?.docs} />
        <Typography sx={matchingResults}>
          Matching results: {streamersData?.totalDocs}
        </Typography>
        <Pagination
          sx={homePagePagination}
          onChange={(e, page) =>
            setQueryParams((prev) => {
              return { ...prev, page };
            })
          }
          count={streamersData?.totalPages || 10}
        />
      </Stack>
    </>
  );
}

export default HomePage;
