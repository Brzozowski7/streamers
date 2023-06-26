import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClientPost } from '../apiClient';
import { apiRoutes } from '../apiRoutes';
import { CreateStreamer, Streamer } from './types';

export const useCreateStreamer = (
  options?: UseMutationOptions<Streamer, AxiosError<any>, CreateStreamer>,
) => {
  return useMutation<Streamer, AxiosError<any>, CreateStreamer>(
    (vars) => apiClientPost(apiRoutes.streamers, vars),
    { ...options },
  );
};
