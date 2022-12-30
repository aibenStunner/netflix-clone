import Head from "next/head";
import Banner from "../components/banner/banner";

export default function Home() {
  return (
    <>
      <Head>
        <title>Netflix</title>
        <meta name="description" content="Discover Videos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Netflix</h1>
      <Banner
        title="Clifford the red dog"
        subTitle="A very cute dog"
        imgUrl="/static/clifford.webp"
      />
    </>
  );
}
