import styles from "./login.module.scss";
import Logo from "../../public/logooknpng.png";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <section className={`${styles.login} wrapper`}>
        <div className={styles.login__form}>
          <Image
            src={Logo}
            alt="Logo Okn"
            width={800}
            height={600}
            quality={100}
          />
          <h2>Faça login em sua conta</h2>
          <form action="">
            <label htmlFor="email">
              Endereço de Email
              <input id="email" type="mail" />
            </label>
            <label htmlFor="password">
              Senha
              <input id="password" type="password" />
            </label>
            <div className={styles.login__forgot}>
              <Link href="#">Esqueceu a senha?</Link>
            </div>
            <a href="/dashboard/funcionarios">Entrar</a>
          </form>
        </div>
      </section>
    </>
  );
}
