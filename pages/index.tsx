import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import { IVideo } from "../components/@types";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";
import NavBar from "../components/nav/navbar";
import {
  getPopularVideos,
  getVideos,
  getWatchItAgainVideos,
} from "../lib/videos";

import styles from "../styles/Home.module.css";
import { redirectUser } from "../utils/redirectUser";

interface IHomeProps {
  disneyVideos: IVideo[];
  travelVideos: IVideo[];
  productivityVideos: IVideo[];
  popularVideos: IVideo[];
  watchItAgainVideos: IVideo[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let watchItAgainVideos: IVideo[] = [];
  const { userId, token } = await redirectUser(context);

  if (!userId) {
    return {
      props: {},
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (token && userId)
    watchItAgainVideos = await getWatchItAgainVideos(userId, token);

  const disneyVideos = await getVideos("disney trailer");
  const productivityVideos = await getVideos("productivity");
  const travelVideos = await getVideos("travel");
  const popularVideos = await getPopularVideos();

  return {
    props: {
      disneyVideos,
      travelVideos,
      productivityVideos,
      popularVideos,
      watchItAgainVideos,
    },
  };
}

export default function Home({
  disneyVideos,
  travelVideos,
  productivityVideos,
  popularVideos,
  watchItAgainVideos,
}: IHomeProps) {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover Videos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.main}>
        <NavBar />
        <Banner
          videoId="4zH5iYM4wJo"
          title="Clifford the red dog"
          subTitle="A very cute dog"
          imgUrl="/static/clifford.webp"
        />
        <div className={styles.sectionWrapper}>
          <SectionCards title="Disney" videos={disneyVideos} size="large" />
          {watchItAgainVideos.length > 0 && (
            <SectionCards
              title="Watch it again"
              videos={watchItAgainVideos}
              size="small"
            />
          )}
          <SectionCards title="Travel" videos={travelVideos} size="small" />
          <SectionCards
            title="Productivity"
            videos={productivityVideos}
            size="medium"
          />
          <SectionCards title="Popular" videos={popularVideos} size="small" />
        </div>
      </div>
    </>
  );
}
