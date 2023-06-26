import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClientGet } from '../apiClient';
import { apiRoutes } from '../apiRoutes';
import { Streamer } from './types';

const useGetStreamerById = (
  streamerId: string,
  options?: UseQueryOptions<Streamer, AxiosError>,
) => {
  return useQuery<Streamer, AxiosError>(
    [apiRoutes.streamer_by_id(streamerId)],
    () => apiClientGet(apiRoutes.streamer_by_id(streamerId)),
    { ...options },
  );
};

export default useGetStreamerById;
