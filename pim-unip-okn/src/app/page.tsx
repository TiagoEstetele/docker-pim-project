"use client";
import styles from "./login.module.scss";
import Logo from "../../public/logooknpng.png";
import Image from "next/image";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

export default async function Home() {
  const router = useRouter();
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const username = event.target.email.value;
    const password = event.target.password.value;

    try {
      const response = await axios.post("http://localhost:8000/auth", {
        username: username,
        password: password,
      });

      const { token } = response.data;

      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Erro ao fazer login", error);
    } finally {
      router.push("/dashboard/homepage");
    }
  };

  return (
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
        <form onSubmit={handleSubmit}>
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
          <button>Entrar</button>
        </form>
      </div>
    </section>
  );
}
