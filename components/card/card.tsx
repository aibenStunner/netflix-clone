import Image from "next/image";
import { useState } from "react";

import { motion } from "framer-motion";
import cls from "classnames";

import styles from "./card.module.css";

interface ICardProps {
  id: number;
  imgUrl: string;
  size: "large" | "medium" | "small";
  shouldScale?: boolean;
}

const Card = ({
  id,
  imgUrl = "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80",
  size = "medium",
  shouldScale = true,
}: ICardProps) => {
  const [imgSrc, setImgSrc] = useState(imgUrl);

  const classMap = {
    large: styles.lgItem,
    medium: styles.mdItem,
    small: styles.smItem,
  } as any;

  const scale = id === 0 ? { scaleY: 1.1 } : { scale: 1.1 };

  const shouldHover = shouldScale && {
    whileHover: { ...scale },
  };

  const handleImageError = () => {
    setImgSrc(
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1340&q=80"
    );
  };

  return (
    <div className={styles.container}>
      <motion.div
        className={cls(styles.imgMotionWrapper, classMap[size])}
        {...shouldHover}
      >
        <Image
          className={styles.cardImg}
          src={imgSrc}
          alt="image"
          onError={handleImageError}
          fill
        />
      </motion.div>
    </div>
  );
};

export default Card;
