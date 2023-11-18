"use client";
import { useState, useEffect } from "react";
import styles from "./funcionarios.module.scss";
import { EmployeesCard } from "@/componentes/general";
import axios from "axios";

type Emplooy = {
  id_funcionario: number;
  nome: string;
  banco: string;
  telefone: string;
  data_admissao: string;
  data_nascimento: string;
};

export default function DashboardFuncionarios() {
  const [emplooys, setEmplooy] = useState<Emplooy[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/funcionarios"
        );

        const data = response.data;
        setEmplooy(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className={`${styles.employees} wrapper`}>
      <div className={styles.employees__cards}>
        {emplooys.map((emplooy) => (
          <EmployeesCard
            key={emplooy.id_funcionario}
            name={emplooy.nome}
            cargo={emplooy.banco}
            telefone={emplooy.telefone}
            dataAdmissao={emplooy.data_admissao}
            dataNascimento={emplooy.data_nascimento}
          />
        ))}
      </div>
    </section>
  );
}
