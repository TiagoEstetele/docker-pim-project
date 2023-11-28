"use client";
import styles from "./ponto.module.scss";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Loading } from "@/componentes/general";
import jwt from "jsonwebtoken";
import axios from "axios";
import ponto from "../../../../public/ponto.png";
import check from "../../../../public/check.svg";
import unchecked from "../../../../public/unchecked.svg";
import { useRouter } from "next/navigation";

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
  const [waitEnter, setwaitEnter] = useState(false);
  const [waitExit, setwaiExit] = useState(false);
  const [showSucess, setSucess] = useState(false);
  const [showRegistered, setRegistered] = useState(false);

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
    const enter = localStorage.getItem(`enter${user?.certserialnumber}`);
    const exit = localStorage.getItem(`exit${user?.certserialnumber}`);
    const registered = localStorage.getItem(
      `registered${user?.certserialnumber}`
    );
    if (enter) {
      setwaitEnter(true);
    }
    if (exit) {
      setwaiExit(true);
    }

    if (registered) {
      setRegistered(true);
    }
  }, [user?.certserialnumber]);

  const router = useRouter();

  const handleClickPoint = async () => {
    const date = new Date();
    const currentMonth = date.getMonth() + 1;
    const getEnter = localStorage.getItem(`enter${user?.certserialnumber}`);
    const getExit = localStorage.getItem(`exit${user?.certserialnumber}`);

    let formattedDate = date.getFullYear().toString() + "-";
    formattedDate += (date.getMonth() + 1).toString().padStart(2, "0") + "-";
    formattedDate += date.getDate().toString().padStart(2, "0") + "T";
    formattedDate += date.getHours().toString().padStart(2, "0") + ":";
    formattedDate += date.getMinutes().toString().padStart(2, "0") + ":";
    formattedDate += date.getSeconds().toString().padStart(2, "0") + ".";
    formattedDate += date.getMilliseconds().toString().padStart(3, "0");

    if (!getEnter) {
      localStorage.setItem(`enter${emplooy?.id_funcionario}`, formattedDate);
      setwaitEnter(true);
    } else {
      localStorage.setItem(`exit${emplooy?.id_funcionario}`, formattedDate);
      setwaiExit(true);
      setSucess(true);

      try {
        if (getEnter && getExit) {
          const response = await axios.post(
            "http://localhost:8000/controle-de-horas",
            {
              idFuncionario: emplooy?.id_funcionario,
              mes: currentMonth,
              dataEntrada: getEnter,
              dataSaida: getExit,
            }
          );
          if (response.status === 200) {
            localStorage.setItem(
              `registered${emplooy?.id_funcionario}`,
              "true"
            );
            router.push("./homepage");
          } else {
            console.log(
              "Requisição retornou um código diferente de 200:",
              response.status
            );
          }
        }
      } catch (error) {
        console.error("Erro na requisição", error);
      }
    }
  };
  return (
    <section className={`${styles.point} wrapper`}>
      {loading ? (
        <Loading />
      ) : (
        <article className={styles.point__card}>
          {showRegistered == true ? (
            <div className={styles.point__registered}>
              <h2>
                <span>Realizado com êxito!</span> O encerramento do ponto diário
                está concluído. <span>Agradecemos pela sua contribuição!</span>
              </h2>
              <div>
                <Image
                  src={check}
                  width={check.width}
                  height={check.height}
                  alt="Imagem de verificação"
                />
              </div>
            </div>
          ) : (
            <>
              <h2>
                Olá, <span>{emplooy?.nome}! </span>Por favor, clique no botão
                abaixo para registrar o ponto.
              </h2>
              <button onClick={handleClickPoint}>Registrar ponto</button>
              <div className={styles.point__hours}>
                <div className={styles.point__enter}>
                  <p>Entrada</p>
                  {waitEnter === true ? (
                    <div>
                      <Image
                        src={check}
                        width={check.width}
                        height={check.height}
                        alt="Imagem de verificação"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        border: ".1rem solid #ececec",
                        background: "#fff",
                      }}
                    >
                      <Image
                        src={unchecked}
                        width={unchecked.width}
                        height={unchecked.height}
                        alt="Imagem de verificação"
                      />
                    </div>
                  )}
                </div>
                <div className={styles.point__exit}>
                  <p>Saída</p>
                  {waitExit === true ? (
                    <div>
                      <Image
                        src={check}
                        width={check.width}
                        height={check.height}
                        alt="Imagem de verificação"
                      />
                    </div>
                  ) : (
                    <div
                      style={{
                        border: ".1rem solid #ececec",
                        background: "#fff",
                      }}
                    >
                      <Image
                        src={unchecked}
                        width={unchecked.width}
                        height={unchecked.height}
                        alt="Imagem de verificação"
                      />
                    </div>
                  )}
                </div>
              </div>
              {showSucess === true ? (
                <div className={styles.point__sucess}>
                  <p>
                    <span>Tudo está em perfeita ordem,</span> com as entradas e
                    saídas devidamente preparadas. Gentilmente,{" "}
                    <span>
                      clique uma vez mais no botão "Registrar Ponto" para
                      concluir o registro do seu ponto diário.
                    </span>
                  </p>
                </div>
              ) : (
                ""
              )}

              <Image
                src={ponto}
                width={ponto.width}
                height={ponto.height}
                alt="Imagem de Bem-vindo"
              />
            </>
          )}
        </article>
      )}
    </section>
  );
}
