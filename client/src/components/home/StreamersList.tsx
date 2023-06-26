import { Stack, Typography } from '@mui/material';
import StreamersListItem from './StreamersListItem';
import { Streamer } from '../../services/networking/streamers/types';

interface StreamersListProps {
  streamers: Streamer[];
}

function StreamersList({ streamers }: StreamersListProps) {
  return (
    <Stack alignItems="center">
      <Typography variant="h5" component="h1">
        Streamers
      </Typography>
      {streamers?.map((streamer) => (
        <StreamersListItem key={streamer._id} streamer={streamer} />
      ))}
    </Stack>
  );
}

export default StreamersList;
