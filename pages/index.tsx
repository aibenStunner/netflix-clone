import Head from "next/head";
import Banner from "../components/banner/banner";
import NavBar from "../components/nav/navbar";

export default function Home() {
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
    </>
  );
}
