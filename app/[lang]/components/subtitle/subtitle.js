import styles from "./subtitle.module.css";

export default function Subtitle({ title, id }) {
  return (
    <div id={id} className={styles.subtitle}>
      <div className={`${styles.subtitleinner} font-stretched`}>
        {title}
      </div>
    </div>
  );
}
