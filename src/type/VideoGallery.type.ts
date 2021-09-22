export type GalleryVideoType = {
  views: number;
  likes: Array<string>;
  tags: Array<string>;
  _id: string;
  title: string;
  url: string;
  ytId: string;
  duration: number;
  thumbnailURL: string;
  uploader: {
    _id: string;
    avatar: string;
    followers: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};
export type VideoType = {
  _id: string;
  // comments: Array<string>;
  description: string;
  views: number;
  likes: Array<string>;
  tags: Array<string>;
  title: string;
  url: string;
  ytId: string;
  duration: number;
  thumbnailURL: string;
  uploader: {
    _id: string;
    avatar: string;
    followers: number;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
};

export type userVideoDetailsType = {
  isVideoLiked: boolean;
  isChannelFollowed: boolean;
  isPresentInWatchLater: boolean;
  playlistsStatus: Array<{
    title: string;
    id: string;
    isVideoPresent: boolean;
  }>;
};

export type VideosType = Array<GalleryVideoType>;
