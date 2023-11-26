"use client";
import styles from "./perfil.module.scss";
import Image from "next/image";
import avatar from "../../../../public/employuseravatar.png";
import crown from "../../../../public/crown-svgrepo-com.svg";
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
  id_cargo: number;
  nome: string;
  banco: string;
  telefone: string;
  data_admissao: string;
  data_nascimento: string;
  cpf: string;
  endereco: string;
  genero: string;
  nome_social: string;
  email: string;
  ctps: string;
  salario_bruto: string;
  conta: string;
};

export default function Perfil() {
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
    <section className={`${styles.perfil} wrapper`}>
      {loading ? (
        <Loading />
      ) : (
        <div className={styles.perfil__card}>
          <div className={styles.perfil__avatar}>
            <Image
              src={avatar}
              width={avatar.width}
              height={avatar.height}
              alt="Avatar image"
              quality={100}
            />
            <p>{emplooy?.nome}</p>
            {emplooy?.id_cargo === 1 ? (
              <div className={styles.perfil__office}>
                <p>
                  <Image
                    src={crown}
                    width={crown.width}
                    height={crown.height}
                    alt="Crown image"
                    quality={100}
                  />
                  Administrador
                </p>
              </div>
            ) : (
              ""
            )}

            <p>{emplooy?.cpf}</p>
          </div>
          <div className={styles.perfil__contents}>
            <div className={styles.perfil__info}>
              <h3>Minha conta</h3>
              <p>Visualize suas informações pessoais abaixo.</p>
            </div>
            <div className={styles.perfil__infowrapper}>
              <div className={styles.perfil__wrapper}>
                <p>
                  <span>Nome Social: </span>
                  {emplooy?.nome_social}
                </p>
                <p>
                  <span>Email: </span>
                  {emplooy?.email}
                </p>
                <p>
                  <span>Telefone: </span>
                  {emplooy?.telefone}
                </p>
                <p>
                  <span>Data de Nascimento: </span>
                  {emplooy?.data_nascimento}
                </p>
                <p>
                  <span>Conta: </span>
                  {emplooy?.conta}
                </p>
                <p>
                  <span>Data de Admissão: </span>
                  {emplooy?.data_admissao}
                </p>
              </div>
              <div className={styles.perfil__wrapper}>
                <p>
                  <span>Endereço: </span>
                  {emplooy?.endereco}
                </p>
                <p>
                  <span>Genero: </span>
                  {emplooy?.genero}
                </p>
                <p>
                  <span>CTPS: </span>
                  {emplooy?.ctps}
                </p>
                <p>
                  <span>Banco: </span>
                  {emplooy?.banco}
                </p>
                <p>
                  <span>Salário Bruto: </span>
                  {emplooy?.salario_bruto}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
