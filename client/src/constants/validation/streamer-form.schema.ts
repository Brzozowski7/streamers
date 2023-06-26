import { object, string } from 'yup';
import { StreamingPlatform } from '../../services/networking/streamers/types';

export const streamerFormInitialValues = {
  name: '',
  description: '',
  platform: '' as StreamingPlatform,
};

export const streamerFormValidationSchema = object({
  name: string().required(),
  description: string().required(),
  platform: string().oneOf(Object.values(StreamingPlatform)).required(),
});
