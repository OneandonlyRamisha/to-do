import Header from "@/components/header/header";
import styles from "./page.module.css";
import BodyTasks from "@/components/body/body";

export default function Home() {
  return (
    <section className={styles.mainSection}>
      <Header />
      <BodyTasks />
    </section>
  );
}
