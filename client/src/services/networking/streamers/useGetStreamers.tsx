import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { apiRoutes } from '../apiRoutes';
import { apiClientGet } from '../apiClient';
import { objectToURLSearchParams } from '../../utils/objectToURLSearchParams';
import { Streamer } from './types';

import { PaginatedResponse } from '../types';
import { IQueryParams } from '../../../components/home/FilterBar/FilterBar';

const getByQuery = async (query: IQueryParams) => {
  const data = await apiClientGet<PaginatedResponse<Streamer>>(
    apiRoutes.streamers + objectToURLSearchParams(query),
  );
  return data;
};

export const useGetStreamers = (
  query: IQueryParams,
  options?: UseQueryOptions<PaginatedResponse<Streamer>, AxiosError>,
) => {
  return useQuery<PaginatedResponse<Streamer>, AxiosError>(
    [apiRoutes.streamers, query],
    () => getByQuery(query),
    { ...options },
  );
};
