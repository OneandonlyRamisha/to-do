import styles from "./header.module.css";
import logo from "@/public/logo.png";
import Image from "next/image";

export default function Header() {
  return (
    <div className={styles.headerContainer}>
      <Image
        src={logo}
        alt="logo of this to do app"
        className={styles.logo}
        width={85}
      />
      <h6 className={styles.header}>RamiForza Productivity</h6>
    </div>
  );
}
