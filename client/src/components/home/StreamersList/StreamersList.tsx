import { Stack, Typography } from '@mui/material';
import StreamersListItem from '../StreamerListItem';
import { Streamer } from '../../../services/networking/streamers/types';
import { emptyListText, streamersListWrapper } from './styles';

interface StreamersListProps {
  streamers: Streamer[];
}

function StreamersList({ streamers }: StreamersListProps) {
  return (
    <Stack sx={streamersListWrapper} spacing={1}>
      {!!streamers?.length ? (
        streamers?.map((streamer) => (
          <StreamersListItem key={streamer._id} streamer={streamer} />
        ))
      ) : (
        <Typography sx={emptyListText}>There is no streamers yet.</Typography>
      )}
    </Stack>
  );
}

export default StreamersList;
