import { Box, Typography } from '@mui/material';
import { Streamer, VoteType } from '../../services/networking/streamers/types';
import { ThumbDown, ThumbUp } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { useVote } from '../../services/networking/streamers/useVote';
import { Link } from 'react-router-dom';

interface StreamersListItemProps {
  streamer: Streamer;
}

function StreamersListItem({ streamer }: StreamersListItemProps) {
  const { mutate: vote, isLoading: isVoting } = useVote(streamer._id);

  const handleLike = () => {
    vote({ vote: VoteType.UP });
  };

  const handleDislike = () => {
    vote({ vote: VoteType.DOWN });
  };

  return (
    <Box display="flex" alignItems="center" gap={2}>
      <Typography component={Link} to={streamer._id}>
        {streamer.name}
      </Typography>
      <Typography display="flex" alignItems="center">
        {streamer.upVotes} <ThumbUp fontSize="small" />
      </Typography>
      <Typography>
        {streamer.downVotes} <ThumbDown fontSize="small" />
      </Typography>
      <LoadingButton loading={isVoting} onClick={handleLike}>
        Like
      </LoadingButton>
      <LoadingButton loading={isVoting} onClick={handleDislike}>
        Dislike
      </LoadingButton>
    </Box>
  );
}

export default StreamersListItem;
