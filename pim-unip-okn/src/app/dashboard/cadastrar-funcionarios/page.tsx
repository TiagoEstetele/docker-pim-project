"use client";
import styles from "./cadastrarfuncionarios.module.scss";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function CadastrarFuncionarios() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    nascimento: "",
    telefone: "",
    data_admissao: "",
    conta: "",
    agencia: "",
    salario_bruto: "",
    CTPS: "",
    endereco: "",
    nome_social: "",
    genero: "Masculino",
    ativo: true,
    id_cargo: 1,
  });

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

    console.log(formData);

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8000/api/v1/funcionarios/",
    //     formData
    //   );

    //   // Lógica adicional após o sucesso, se necessário
    //   console.log("Funcionário cadastrado com sucesso!", response.data);
    // } catch (error) {
    //   // Lidar com erros da requisição
    //   console.error("Erro ao cadastrar funcionário:", error);
    // }
  };

  return (
    <section className={`${styles.register} wrapper`}>
      <article className={styles.register__form}>
        <form action="" onSubmit={handleSubmit}>
          <h2>Cadastrar funcionários</h2>
          <div className={styles.register__break}>
            <label htmlFor="name">
              Nome Completo
              <input
                required
                id="name"
                type="text"
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor="email">
              Email
              <input id="email" type="text" onChange={handleInputChange} />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="cpf">
              CPF
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
                id="nascimento"
                type="date"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="telefone">
              Telefone
              <input
                required
                id="telefone"
                type="number"
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
            <label htmlFor="agencia">
              Agência
              <input
                required
                id="agencia"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="salario_bruto">
              Salário
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
                id="CTPS"
                type="text"
                onChange={handleInputChange}
              />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="banco">
              Banco
              <input
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
