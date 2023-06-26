import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiClientPost } from '../apiClient';
import { apiRoutes } from '../apiRoutes';
import { Photo } from '../types';

type MutationParams = {
  formData: FormData;
  streamerId: string;
};

const postImage = async ({ formData, streamerId }: MutationParams) => {
  const data = await apiClientPost<Photo>(
    apiRoutes.streamer_by_id_photo(streamerId),
    formData,
    {
      headers: { 'Content-Type': 'multipart/form-data' },
    },
  );
  return data;
};

export const useAddStreamerPhoto = (
  options?: UseMutationOptions<Photo, AxiosError<any>, MutationParams>,
) => {
  return useMutation<Photo, AxiosError, MutationParams>(
    (vars) => postImage(vars),
    {
      ...options,
    },
  );
};
