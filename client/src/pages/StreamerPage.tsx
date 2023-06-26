import React from 'react';
import { useParams } from 'react-router-dom';
import useGetStreamerById from '../services/networking/streamers/useGetStreamerById';
import LoadingSpinner from '../components/shared/LoadingSpinner';

function StreamerPage() {
  const { id } = useParams();
  const { data: streamer, isLoading: isLoadingStreamer } =
    useGetStreamerById(id);

  if (isLoadingStreamer) return <LoadingSpinner />;

  return <div>{streamer.name}</div>;
}

export default StreamerPage;
