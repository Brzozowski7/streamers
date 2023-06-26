import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClientPut } from '../apiClient';
import { apiRoutes } from '../apiRoutes';
import { AddVote, Streamer } from './types';

export const useVote = (
  streamerId: string,
  options?: UseMutationOptions<Streamer, AxiosError, AddVote>,
) => {
  return useMutation<Streamer, AxiosError, AddVote>(
    (vars) => apiClientPut(apiRoutes.streamer_by_id_vote(streamerId), vars),
    { ...options },
  );
};
