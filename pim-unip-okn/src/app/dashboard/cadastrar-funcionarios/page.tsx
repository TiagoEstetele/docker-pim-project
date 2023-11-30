"use client";
import styles from "./cadastrarfuncionarios.module.scss";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";

export default function CadastrarFuncionarios() {
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    data_nascimento: "",
    telefone: "",
    data_admissao: "",
    conta: "",
    salario_bruto: "",
    ctps: "",
    endereco: "",
    nome_social: "",
    genero: "Masculino",
    ativo: true,
    id_cargo: 1,
    id_funcionario: 0,
    banco: "",
  });
  const [modalSucess, setModalSucess] = useState(false);
  const [blurSucess, setBlurSucess] = useState(false);

  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    let newValue = id === "ativo" ? JSON.parse(value) : value;

    if (id === "id_cargo") {
      newValue = Number(newValue);
    }

    if (id === "salario_bruto") {
      newValue = Number(newValue);
    }

    setFormData({
      ...formData,
      [id]: newValue,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/funcionarios",
        {
          id_funcionario: formData.id_funcionario,
          id_cargo: formData.id_cargo,
          nome: formData.nome,
          telefone: formData.telefone,
          data_admissao: formData.data_admissao,
          ctps: formData.ctps,
          salario_bruto: formData.salario_bruto,
          data_nascimento: formData.data_nascimento,
          banco: formData.banco,
          conta: formData.conta,
          cpf: formData.cpf,
          email: formData.email,
          ativo: formData.ativo,
          nome_social: formData.nome_social,
          genero: formData.genero,
          endereco: formData.endereco,
        }
      );

      if (response.status === 200) {
        setModalSucess(true);
        setBlurSucess(true);
      }
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
    }
  };

  return (
    <section className={`${styles.register} wrapper`}>
      <div
        data-show={modalSucess === true ? "true" : "false"}
        className={styles.register__modal}
      >
        <h3>
          Cadastrado com <span>sucesso!</span>
        </h3>
        <Link href="./funcionarios">
          <button>Ok</button>
        </Link>
      </div>
      <article
        data-blur={blurSucess === true ? "true" : "false"}
        className={styles.register__form}
      >
        <form onSubmit={handleSubmit}>
          <h2>Cadastrar funcionários</h2>
          <div className={styles.register__break}>
            <label htmlFor="nome">
              Nome Completo
              <input
                required
                id="nome"
                type="text"
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input
                placeholder="seuemail@email.com"
                id="email"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="cpf">
              CPF (informe somente números)
              <input
                required
                id="cpf"
                type="text"
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="data_nascimento">
              Data de data_Nascimento
              <input
                required
                id="data_nascimento"
                type="date"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="telefone">
              Telefone (informe somente números)
              <input
                placeholder="1234567890"
                required
                id="telefone"
                type="tel"
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="data_admissao">
              Data de Admissão
              <input
                required
                id="data_admissao"
                type="date"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="conta">
              Conta
              <input
                required
                id="conta"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="salario_bruto">
              Salário bruto
              <input
                required
                id="salario_bruto"
                type="text"
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="ctps">
              CTPS
              <input
                required
                id="ctps"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="banco">
              Banco
              <input
                placeholder="Bradesco"
                required
                id="banco"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label
              htmlFor="id_cargo"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Cargo
              <select
                name="id_cargo"
                id="id_cargo"
                style={{
                  padding: "1rem",
                  marginTop: "0.8rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                  border: "0.1rem solid #9e9ea1",
                  outline: "0",
                }}
                onChange={handleInputChange}
              >
                <option value="1">Administrador</option>
                <option value="2">Funcionário</option>
              </select>
            </label>
            <label htmlFor="nome_social">
              Nome Social
              <input
                required
                id="nome_social"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="endereco">
              Endereço completo
              <input
                required
                id="endereco"
                type="text"
                onChange={handleInputChange}
              />
            </label>
            <label
              htmlFor="cargo"
              style={{ display: "flex", flexDirection: "column" }}
            >
              Gênero
              <select
                name="genero"
                id="genero"
                style={{
                  padding: "1rem",
                  marginTop: "0.8rem",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fff",
                  border: "0.1rem solid #9e9ea1",
                  outline: "0",
                }}
                onChange={handleInputChange}
              >
                <option value="Masculino">Masculino</option>
                <option value="Feminino">Feminino</option>
              </select>
            </label>
          </div>
          <div className={styles.register__buttons}>
            <div>
              <label htmlFor="ativo">
                Ativo?
                <select
                  name="ativo"
                  id="ativo"
                  style={{
                    padding: "1rem",
                    marginTop: "0.8rem",
                    borderRadius: "0.5rem",
                    backgroundColor: "#fff",
                    border: "0.1rem solid #9e9ea1",
                    outline: "0",
                  }}
                  onChange={handleInputChange}
                >
                  <option value="true">Ativo</option>
                  <option value="false">Inativo</option>
                </select>
              </label>
            </div>
            <div className={styles.register__submitButton}>
              <button>Cadastrar</button>
            </div>
          </div>
        </form>
      </article>
    </section>
  );
}
