import Head from "next/head";
import Banner from "../components/banner/banner";
import SectionCards from "../components/card/section-cards";
import NavBar from "../components/nav/navbar";
import { getVideos } from "../lib/videos";

import styles from "../styles/Home.module.css";

export default function Home() {
  const disneyVideos = getVideos();

  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover Videos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar username="test@test.com" />
      <Banner
        title="Clifford the red dog"
        subTitle="A very cute dog"
        imgUrl="/static/clifford.webp"
      />
      <div className={styles.sectionWrapper}>
        <SectionCards title="Placeholder" videos={disneyVideos} size="large" />
        <SectionCards title="Placeholder" videos={disneyVideos} size="medium" />
      </div>
    </>
  );
}
