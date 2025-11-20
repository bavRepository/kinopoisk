export const AUTH_TOKEN = 'auth-token'
export const AUTH_KEYS = {
  accessToken: 'musicfun-access-token',
  refreshToken: 'musicfun-refresh-token',
} as const

export const SOCKET_EVENTS = {
  TRACK_PUBLISHED: 'tracks.track-published',
  TRACK_ADDED_TO_PLAYLIST: 'tracks.track-added-to-playlist',
  TRACK_LIKED: 'tracks.track-liked',
  TRACK_IMAGE_PROCESSED: 'tracks.track-image-processed',
  PLAYLIST_IMAGE_PROCESSED: 'tracks.playlist-image-processed',
  PLAYLIST_CREATED: 'tracks.playlist-created',
  PLAYLIST_UPDATED: 'tracks.playlist-updated',
} as const

export const IMAGES_API_SETTINGS = {
  API_PATH: 'https://image.tmdb.org/t/p/',
  IMAGE_SIZE: { w500: 'w500', w185: 'w185', original: 'original' },
} as const

export type SocketEvents = (typeof SOCKET_EVENTS)[keyof typeof SOCKET_EVENTS]
