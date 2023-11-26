"use client";
import styles from "./ponto.module.scss";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loading } from "@/componentes/general";
import jwt from "jsonwebtoken";
import axios from "axios";
import ponto from "../../../../public/ponto.png";

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

export default function DashboardPonto() {
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

  function handleClickPoint() {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const formatedToday = date.toISOString();

    try {
      const response = axios.post("http://localhost:8000/controle-de-horas", {
        idFuncionario: emplooy?.id_funcionario,
        mes: currentMonth,
        dataEntrada: formatedToday,
        dataSaida: formatedToday,
      });
    } catch (error) {
      console.error("Erro ao fazer requisição", error);
    }
  }
  return (
    <section className={`${styles.point} wrapper`}>
      {loading ? (
        <Loading />
      ) : (
        <article className={styles.point__card}>
          <h2>
            Olá, <span>{emplooy?.nome}! </span>Por favor, clique no botão abaixo
            para registrar o ponto.
          </h2>
          <button onClick={handleClickPoint}>Registrar ponto</button>
          <Image
            src={ponto}
            width={ponto.width}
            height={ponto.height}
            alt="Imagem de Bem-vindo"
          />
        </article>
      )}
    </section>
  );
}
