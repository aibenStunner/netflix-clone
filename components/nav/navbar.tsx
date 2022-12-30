import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styles from "./navbar.module.css";

interface INavBarProps {
  username: string;
}

const NavBar = ({ username }: INavBarProps) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleOnClickHome = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/");
  };

  const handleOnClickMyList = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push("/browse/my-list");
  };

  const handleShowDropdown = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowDropdown(!showDropdown);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <a className={styles.logoLink}>
          <div className={styles.logoWrapper}>
            <Image
              src="/static/netflix.svg"
              alt="Netflix logo"
              width={128}
              height={34}
            />
          </div>
        </a>
        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>
            Home
          </li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>
            My List
          </li>
        </ul>
        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p className={styles.username}>{username}</p>
              <Image
                src="/static/expand_more.svg"
                alt="Expand more"
                width={24}
                height={24}
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link className={styles.linkName} href="/login">
                    Sign out
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default NavBar;
