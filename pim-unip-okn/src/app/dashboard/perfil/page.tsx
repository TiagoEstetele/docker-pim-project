import styles from "./perfil.module.scss";
import Image from "next/image";
import avatar from "../../../../public/employuseravatar.png";

export default function Perfil() {
  return (
    <section className={`${styles.perfil} wrapper`}>
      <div className={styles.perfil__card}>
        <div className={styles.perfil__avatar}>
          <Image
            src={avatar}
            width={avatar.width}
            height={avatar.height}
            alt="Avatar image"
            quality={100}
          />
          <p>Tiago Estetele</p>
          <p>Estagiário</p>
        </div>
        <div className={styles.perfil__contents}>
          <p>
            <span>Nome: </span>Tiago Estetele
          </p>
          <p>
            <span>Email: </span>tiagoestetele@hotmail.com
          </p>
          <p>
            <span>Telefone: </span>16 991355697
          </p>
          <a href="#">Ver informações completas...</a>
        </div>
      </div>
    </section>
  );
}
