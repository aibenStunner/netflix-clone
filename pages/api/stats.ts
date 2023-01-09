import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import {
  findVideoIdByUser,
  insertStats,
  updateStats,
} from "../../lib/db/hasura";
import { IDecodedToken } from "../../components/@types";

export default async function stats(req: NextApiRequest, res: NextApiResponse) {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(403).send({});
    } else {
      const inputParams = req.method === "POST" ? req.body : req.query;
      const { videoId } = inputParams;

      if (videoId) {
        const decodedToken = jwt.verify(
          token,
          process.env.JWT_SECRET as string
        ) as IDecodedToken;

        const userId = decodedToken.issuer;
        const foundVideo = await findVideoIdByUser(token, userId, videoId);
        const doesStatsExist = foundVideo?.length > 0;

        if (req.method === "POST") {
          const { favourited, watched = true } = req.body;
          if (doesStatsExist) {
            const response = await updateStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response });
          } else {
            const response = await insertStats(token, {
              watched,
              userId,
              videoId,
              favourited,
            });
            res.send({ data: response });
          }
        } else {
          if (doesStatsExist) {
            res.send(foundVideo);
          } else {
            res.status(404);
            res.send({ user: null, msg: "Video not found" });
          }
        }
      }
    }
  } catch (error) {
    console.error("Error occurred /stats", error);
    res.status(500).send({ done: false, error: error });
  }
}
