import styles from "./ponto.module.scss";
import avatar from "../../../../public/employuseravatar.png";
import Image from "next/image";

export default function DashboardPonto() {
  return (
    <section className={`${styles.point} wrapper`}>
      <article className={styles.point__card}>
        <h2>Bem vindo Tiago Estetele!</h2>
        <Image
          src={avatar}
          width={avatar.width}
          height={avatar.height}
          alt="Avatar logo"
          quality={100}
        />
        <button>Registrar ponto</button>
      </article>
    </section>
  );
}
