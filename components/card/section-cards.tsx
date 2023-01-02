import { IVideo } from "../@types";
import Card from "./card";
import styles from "./section-cards.module.css";

interface ISectionCardsProps {
  title: string;
  videos: IVideo[];
  size: "small" | "medium" | "large";
}

const SectionCards = ({ title, videos, size }: ISectionCardsProps) => {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.cardWrapper}>
        {videos.map((video, idx) => (
          <Card key={idx} id={idx} imgUrl={video.imgUrl} size={size} />
        ))}
      </div>
    </section>
  );
};

export default SectionCards;
