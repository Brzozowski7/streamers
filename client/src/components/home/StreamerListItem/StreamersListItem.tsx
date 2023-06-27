import { Box, Container, Typography } from '@mui/material';
import { Streamer } from '../../../services/networking/streamers/types';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import {
  streamersListItemWrapper,
  thumb,
  thumbCountWrapper,
  streamerName,
} from './styles';

interface StreamersListItemProps {
  streamer: Streamer;
}

function StreamersListItem({ streamer }: StreamersListItemProps) {
  return (
    <Container component={Link} to={streamer._id} sx={streamersListItemWrapper}>
      <Typography sx={streamerName}>{streamer.name}</Typography>
      <Box display="flex" gap={8} alignItems="center">
        <Box display="flex" gap={2}>
          <Typography sx={thumbCountWrapper}>
            {streamer.upVotes} <ThumbUp sx={thumb} />
          </Typography>
          <Typography sx={thumbCountWrapper}>
            {streamer.downVotes} <ThumbDown sx={thumb} />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}

export default StreamersListItem;
