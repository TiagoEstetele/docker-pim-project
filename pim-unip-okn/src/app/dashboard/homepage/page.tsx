"use client";
import styles from "./homepage.module.scss";
import { Loading } from "@/componentes/general";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import axios from "axios";

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
  console.log(emplooy);

  return (
    <section className={styles.homepage}>
      {loading ? (
        <Loading />
      ) : (
        <h1>
          Bem-vindo, {emplooy?.nome}! Explore as diversas funcionalidades do
          nosso sistema através das opções disponíveis no menu localizado acima.
        </h1>
      )}
    </section>
  );
}
