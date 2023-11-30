"use client";
import styles from "./holerite.module.scss";
import jwt from "jsonwebtoken";
import React, { useEffect, useState } from "react";
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

export default function GerarHolerite() {
  const [user, setUser] = useState<User | null>(null);
  const [selectedMonth, setSelectedMonth] = useState("1");
  const [holerite, setHolerite] = useState();
  const [emplooy, setEmplooy] = useState<Emplooy>();
  const [showHolerite, setShowHolerite] = useState(false);

  const handleMonthChange = (event: any) => {
    setSelectedMonth(event.target.value);
  };

  const handleGenerateHolerite = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/controle-de-horas/${user?.certserialnumber}/${selectedMonth}`
      );

      setHolerite(response.data);
      setShowHolerite(true);
    } catch (error) {
      console.error("Erro ao excluir funcionário:", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt.decode(token);

      setUser(decodedToken as User);
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/funcionarios/${user?.certserialnumber}`
        );

        const data = response.data;
        setEmplooy(data);
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };
    fetchData();
  }, [user?.certserialnumber]);

  console.log(emplooy);

  return (
    <section className={`${styles.holerite} wrapper`}>
      <div className={styles.holerite__input}>
        <label htmlFor="mes">Selecione o mês desejado</label>
        <select
          name="mes"
          id="mes"
          value={selectedMonth}
          onChange={handleMonthChange}
        >
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>
      <div className={styles.holerite__button}>
        <button onClick={handleGenerateHolerite}>Gerar holerite</button>
      </div>
      {showHolerite === true ? (
        <div className={styles.holerite__contents}>
          <div className={styles.holerite__header}>
            <div className={styles.holerite__content}>
              <p>Empresa: OKN Group</p>
              <p>CNPJ: 09.149.703/0001-50</p>
            </div>
            <div className={styles.holerite__content}>
              <h2>Recibo de Pagamento de Salário</h2>
              <p>Data: {selectedMonth}/2023</p>
            </div>
          </div>
          <div className={styles.holerite__emplooy}>
            <div className={styles.holerite__content}>
              <p>
                <span>Funcionário: </span>
                {emplooy?.nome}
              </p>
              <p>
                <span>CPF: </span>
                {emplooy?.cpf}
              </p>
              <p>
                <span>Endereço: </span>
                {emplooy?.endereco}
              </p>
            </div>
            <div className={styles.holerite__content}>
              <p>
                <span>Banco: </span>
                {emplooy?.banco}
              </p>
              <p>
                <span>Conta: </span>
                {emplooy?.conta}
              </p>
              <p>
                <span>CTPS: </span>
                {emplooy?.ctps}
              </p>
            </div>
          </div>
          <div className={styles.holerite__desc}>
            <div className={styles.holerite__contentSalario}>
              <div className={styles.holerite__valores}>
                <h2>Descrição</h2>
                <h2>Valores</h2>
              </div>
              <div className={styles.holerite__break}>
                <p>
                  <span>Desconto total de faltas: </span>
                </p>
                <p>{holerite?.descontoTotalFaltas}R$</p>
              </div>
              <div className={styles.holerite__break}>
                <p>
                  <span>Pagamento hora extra: </span>
                </p>
                <p>{holerite?.pagamentoHorasExtra}R$</p>
              </div>
              <div className={styles.holerite__break}>
                <p>
                  <span>Desconto INSS: </span>
                </p>
                <p> {holerite?.inss}R$</p>
              </div>
              <div className={styles.holerite__break}>
                <p>
                  <span>Desconto IRRF: </span>
                </p>
                <p> {holerite?.irrf}R$</p>
              </div>
            </div>
          </div>
          <div className={styles.holerite__salario}>
            <p>
              <span>Salário total: </span>
              {holerite?.salarioLiquido}R$
            </p>
            <p>
              <span>Salário liquido: </span>
              {holerite?.salarioRecebido}R$
            </p>
          </div>
        </div>
      ) : (
        ""
      )}
    </section>
  );
}
