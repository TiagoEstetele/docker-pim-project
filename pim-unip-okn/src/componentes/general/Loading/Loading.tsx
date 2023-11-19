import styles from "./Loading.module.scss";

export function Loading() {
  return (
    <div className={styles.loading}>
      <div className={styles.loading__load}></div>
    </div>
  );
}
