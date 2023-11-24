"use client";
import { useState, useEffect } from "react";
import styles from "./funcionarios.module.scss";
import { EmployeesCard } from "@/componentes/general";
import { Loading } from "@/componentes/general";
import axios from "axios";
import AuthChecker from "@/componentes/general/Auth/Auth";

type Emplooy = {
  id_funcionario: number;
  nome: string;
  banco: string;
  telefone: string;
  data_admissao: string;
  data_nascimento: string;
  cpf: string;
  ativo: true | false;
};

export default function DashboardFuncionarios() {
  const [emplooys, setEmplooy] = useState<Emplooy[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/funcionarios"
        );

        const data = response.data;
        setEmplooy(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <section className={`${styles.employees} wrapper`}>
      <div className={styles.employees__cards}>
        {loading ? (
          <Loading />
        ) : (
          emplooys.map((emplooy) => (
            <EmployeesCard
              key={emplooy.id_funcionario}
              name={emplooy.nome}
              cargo={emplooy.cpf}
              telefone={emplooy.telefone}
              dataAdmissao={emplooy.data_admissao}
              dataNascimento={emplooy.data_nascimento}
              ativo={emplooy.ativo}
            />
          ))
        )}
      </div>
    </section>
  );
}
