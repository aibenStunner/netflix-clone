import { IVideo } from "../components/@types";

export const getCommonVideos = async (url: string): Promise<IVideo[]> => {
  try {
    const BASE_URL = "https://youtube.googleapis.com/youtube/v3";
    const response = await fetch(
      `${BASE_URL}${url}&maxResults=25&key=${process.env.YOUTUBE_API_KEY}`
    );

    const data = await response.json();

    if (data?.error) {
      console.log("YoutTube API error");
      return [];
    }

    return data.items.map((item: any) => {
      const id = item.id?.videoId || item.id;

      return {
        id,
        title: item.snippet.title,
        imgUrl: item.snippet.thumbnails.high.url,
      };
    });
  } catch (e) {
    console.log("Something went wrong fetching YouTube data", e);

    return [];
  }
};

export const getVideos = (searchQuery: string) => {
  const URL = `/search?part=snippet&q=${searchQuery}&type=video`;

  return getCommonVideos(URL);
};

export const getPopularVideos = () => {
  const URL = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&regionCode=US`;

  return getCommonVideos(URL);
};
