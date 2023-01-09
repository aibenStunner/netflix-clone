import { GetServerSidePropsContext } from "next";
import { verifyToken } from "../lib/utils";

export const redirectUser = async (context: GetServerSidePropsContext) => {
  let userId = "";
  const token = context.req ? context.req.cookies?.token : null;

  if (token) userId = (await verifyToken(token)) as string;

  return {
    userId,
    token,
  };
};
