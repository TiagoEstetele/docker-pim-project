"use client";
import styles from "./homepage.module.scss";
import { Loading } from "@/componentes/general";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import Image from "next/image";
import welcome from "../../../../public/welcome.jpg";

interface User {
  role?: string;
  certserialnumber?: string;
}

type Emplooy = {
  id_funcionario: number;
  nome: string;
  banco: string;
  telefone: string;
  data_admissao: string;
  data_nascimento: string;
};

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [emplooy, setEmplooy] = useState<Emplooy>();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt.decode(token);

      setUser(decodedToken as User);
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/funcionarios/${user?.certserialnumber}`
        );

        const data = response.data;
        setEmplooy(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user && user.certserialnumber) {
      fetchData();
    }
  }, [user?.certserialnumber]);

  return (
    <section className={styles.homepage + "wrapper"}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.homepage__contents}>
          <h1>
            Bem-vindo, <span>{emplooy?.nome}! </span>Explore as diversas
            funcionalidades do nosso sistema através das{" "}
            <span>opções disponíveis no menu localizado acima.</span>
          </h1>
          <Image
            src={welcome}
            width={welcome.width}
            height={welcome.height}
            alt="Imagem de Bem-vindo"
          />
        </div>
      )}
    </section>
  );
}
