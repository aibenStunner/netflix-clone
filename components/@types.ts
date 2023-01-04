export interface IVideo {
  id: string;
  title: string;
  imgUrl: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  statistics: { viewCount: number };
}
