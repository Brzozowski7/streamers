export const apiRoutes = {
  //Streamers
  streamers: 'streamers',
  streamer_by_id: (streamerId: string) => `streamers/${streamerId}`,
  streamer_by_id_vote: (streamerId: string) => `streamers/${streamerId}/vote`,
  streamer_by_id_photo: (streamerId: string) => `streamers/${streamerId}/photo`,
};
