import { IVideo } from "../components/@types";
import videoData from "../data/videos.json";

export const getVideos = (): IVideo[] => {
  return videoData.items.map((item) => ({
    id: item?.id?.videoId,
    title: item.snippet.title,
    imgUrl: item.snippet.thumbnails.high.url,
  }));
};
