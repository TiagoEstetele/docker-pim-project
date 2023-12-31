"use client";
import { useState, useEffect } from "react";
import styles from "./funcionarios.module.scss";
import { EmployeesCard } from "@/componentes/general";
import { Loading } from "@/componentes/general";
import axios from "axios";
import AuthChecker from "@/componentes/general/Auth/Auth";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Emplooy = {
  id_funcionario: number;
  nome: string;
  banco: string;
  telefone: string;
  data_admissao: string;
  data_nascimento: string;
  cpf: string;
};

interface CustomWindow extends Window {
  selectedEmployeeId?: number;
}

export default function DashboardFuncionarios() {
  const router = useRouter();
  const [emplooys, setEmplooy] = useState<Emplooy[]>([]);
  const [activeEmplooy, setActiveEmplooy] = useState<Emplooy[]>([]);
  const [inactiveEmplooy, setInactiveEmplooy] = useState<Emplooy[]>([]);
  const [loading, setLoading] = useState(true);
  const [del, setDel] = useState(false);
  const [modalDel, setModalDel] = useState(false);
  const [employeeToDeleteId, setEmployeeToDeleteId] = useState<number | null>(
    null
  );

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/funcionarios"
        );

        const data = response.data;

        const activeEmployees = data.filter(
          (employee: any) => employee.ativo === true
        );
        const inactiveEmployees = data.filter(
          (employee: any) => employee.ativo === false
        );

        setEmplooy(data);
        setActiveEmplooy(activeEmployees);
        setInactiveEmplooy(inactiveEmployees);
      } catch (error) {
        console.error("Erro na requisição:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDeleteEmployee = (id: number) => {
    setEmployeeToDeleteId(id);
    setModalDel(true);
  };

  const handleEditEmployee = (id: number) => {
    (window as CustomWindow).selectedEmployeeId = id;
    router.push("/dashboard/editar-funcionarios");
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/funcionarios/${employeeToDeleteId}`
      );

      setEmplooy((prevEmplooy) =>
        prevEmplooy.filter(
          (emplooy) => emplooy.id_funcionario !== employeeToDeleteId
        )
      );
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
    } finally {
      // Feche o modal após a exclusão ou em caso de erro
      setModalDel(false);
      setEmployeeToDeleteId(null);
    }
  };

  const handleCancelDelete = () => {
    // Feche o modal e limpe o ID do funcionário a ser excluído
    setModalDel(false);
    setEmployeeToDeleteId(null);
  };

  return (
    <section className={`${styles.employees} wrapper`}>
      <div className={styles.employees__active}>
        <h2>Funcionários Ativos</h2>
      </div>
      <div className={styles.employees__cards}>
        {loading ? (
          <Loading />
        ) : (
          activeEmplooy.map((emplooy) => (
            <EmployeesCard
              key={emplooy.id_funcionario}
              name={emplooy.nome}
              cargo={emplooy.cpf}
              telefone={emplooy.telefone}
              dataAdmissao={emplooy.data_admissao}
              dataNascimento={emplooy.data_nascimento}
              id={emplooy.id_funcionario}
              onDelete={handleDeleteEmployee}
              onEdit={handleEditEmployee}
            />
          ))
        )}
      </div>

      <div className={styles.employees__active}>
        <h2>Funcionários Inativos</h2>
      </div>
      <div className={styles.employees__cards}>
        {loading ? (
          <Loading />
        ) : (
          inactiveEmplooy.map((emplooy) => (
            <EmployeesCard
              key={emplooy.id_funcionario}
              name={emplooy.nome}
              cargo={emplooy.cpf}
              telefone={emplooy.telefone}
              dataAdmissao={emplooy.data_admissao}
              dataNascimento={emplooy.data_nascimento}
              id={emplooy.id_funcionario}
              onDelete={handleDeleteEmployee}
              onEdit={handleEditEmployee}
            />
          ))
        )}
      </div>

      <div
        data-show={modalDel === true ? "true" : "false"}
        className={styles.employees__modal}
      >
        <h3>
          Tem certeza que deseja <span>deletar este usuário?</span>
        </h3>
        <div className={styles.employees__buttons}>
          <button onClick={handleConfirmDelete}>Sim</button>
          <button onClick={handleCancelDelete}>Não</button>
        </div>
      </div>
    </section>
  );
}
