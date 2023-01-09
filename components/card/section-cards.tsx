import Link from "next/link";
import { IVideo } from "../@types";
import Card from "./card";
import styles from "./section-cards.module.css";
import cls from "classnames";

interface ISectionCardsProps {
  title: string;
  videos: IVideo[];
  size: "small" | "medium" | "large";
  shouldScale?: boolean;
  shouldWrap?: boolean;
}

const SectionCards = ({
  title,
  videos = [],
  size,
  shouldScale,
  shouldWrap = false,
}: ISectionCardsProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={cls(styles.cardWrapper, shouldWrap && styles.wrap)}>
        {videos.map((video, idx) => {
          return (
            <Link href={`/video/${video.id}`} key={video.id}>
              <Card
                id={idx}
                imgUrl={video.imgUrl}
                size={size}
                shouldScale={shouldScale}
              />
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default SectionCards;
