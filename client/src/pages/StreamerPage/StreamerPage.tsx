import { useParams } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { Stack, Container, Typography, Box } from '@mui/material';
import useGetStreamerById from '../../services/networking/streamers/useGetStreamerById';
import LoadingSpinner from '../../components/shared/LoadingSpinner';
import {
  streamerPageWrapper,
  avatarWrapper,
  avatar,
  voteButton,
  streamerCard,
  descriptionWrapper,
  streamerInfoWrapper,
} from './styles';
import defaultAvatar from '../../assets/images/defaultAvatar.png';
import { VoteType } from '../../services/networking/streamers/types';
import { useVote } from '../../services/networking/streamers/useVote';
import { useState } from 'react';

function StreamerPage() {
  // normally information if user can vote would be received from BE
  const [voted, setVoted] = useState(false);
  const { id } = useParams();
  const { data: streamer, isLoading: isLoadingStreamer } =
    useGetStreamerById(id);

  const { mutate: vote, isLoading: isVoting } = useVote(streamer?._id);

  const handleLike = () => {
    setVoted(true);
    vote({ vote: VoteType.UP });
  };

  const handleDislike = () => {
    setVoted(true);
    vote({ vote: VoteType.DOWN });
  };

  if (isLoadingStreamer) return <LoadingSpinner />;

  return (
    <Stack sx={streamerPageWrapper}>
      <Container sx={streamerCard}>
        <Box flex={1}>
          <Container sx={avatarWrapper}>
            <img
              style={avatar}
              src={streamer?.photo?.url ? streamer.photo.url : defaultAvatar}
              alt="streamer-avatar"
            />
          </Container>
        </Box>
        <Stack sx={streamerInfoWrapper}>
          <Typography variant="h4" component="h1">
            {streamer?.name}
          </Typography>
          <Typography variant="subtitle1" component="p">
            Platform: {streamer?.platform}
          </Typography>
          <Stack alignItems="center" spacing={1}>
            <Typography variant="subtitle1" component="p">
              Description:
            </Typography>
            <Typography
              sx={descriptionWrapper}
              variant="subtitle1"
              component="p"
            >
              {streamer?.description}
            </Typography>
          </Stack>
          <Box display="flex" alignItems="center" gap={1}>
            <LoadingButton
              sx={voteButton}
              variant="contained"
              loading={isVoting}
              disabled={voted}
              onClick={handleLike}
            >
              Like
            </LoadingButton>
            <LoadingButton
              variant="outlined"
              sx={voteButton}
              loading={isVoting}
              disabled={voted}
              onClick={handleDislike}
            >
              Dislike
            </LoadingButton>
          </Box>
        </Stack>
      </Container>
    </Stack>
  );
}

export default StreamerPage;
