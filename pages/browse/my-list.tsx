import Head from "next/head";
import NavBar from "../../components/nav/navbar";

import SectionCards from "../../components/card/section-cards";
import styles from "../../styles/MyList.module.css";
import { GetServerSidePropsContext } from "next";
import { redirectUser } from "../../utils/redirectUser";
import { getMyList } from "../../lib/videos";
import { IVideo } from "../../components/@types";

interface IMyListProps {
  myListVideos: IVideo[];
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  let videos: IVideo[] = [];
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

  if (token && userId) videos = await getMyList(userId, token);

  return {
    props: {
      myListVideos: videos,
    },
  };
}

const MyList = ({ myListVideos }: IMyListProps) => {
  return (
    <div>
      <Head>
        <title>My list</title>
      </Head>
      <main className={styles.main}>
        <NavBar />
        <div className={styles.sectionWrapper}>
          <SectionCards
            title="My List"
            videos={myListVideos}
            size="small"
            shouldWrap
            shouldScale={false}
          />{" "}
        </div>
      </main>
    </div>
  );
};

export default MyList;
