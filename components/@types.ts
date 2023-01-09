import { MagicUserMetadata } from "magic-sdk";

export interface IVideo {
  id: string;
  title: string;
  imgUrl: string;
  publishTime: string;
  description: string;
  channelTitle: string;
  statistics: { viewCount: number };
}

export interface IDecodedToken extends MagicUserMetadata {
  iat: number;
  exp: number;
  "https://hasura.io/jwt/claims": {
    "x-hasura-allowed-roles": string[];
    "x-hasura-default-role": string;
    "x-hasura-user-id": string;
  };
}

export interface IStatsPayload {
  favourited?: number;
  userId: string | null;
  watched: boolean;
  videoId: string;
}
