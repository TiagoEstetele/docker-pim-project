import styles from "./cadastrarfuncionarios.module.scss";

export default function CadastrarFuncionarios() {
  return (
    <section className={`${styles.register} wrapper`}>
      <article className={styles.register__form}>
        <form action="">
          <h2>Cadastrar funcionários</h2>
          <div className={styles.register__break}>
            <label htmlFor="name">
              Nome Completo
              <input id="name" type="text" />
            </label>
            <label htmlFor="email">
              Email
              <input id="email" type="text" />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="cpf">
              CPF
              <input id="cpf" type="text" />
            </label>
            <label htmlFor="nascimento">
              Data de Nascimento
              <input id="nascimento" type="date" />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="telefone">
              Telefone
              <input id="telefone" type="number" />
            </label>
            <label htmlFor="admissao">
              Data de Admissão
              <input id="admissao" type="date" />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="conta">
              Conta
              <input id="conta" type="text" />
            </label>
            <label htmlFor="agencia">
              Agência
              <input id="agencia" type="text" />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="salario">
              Salário
              <input id="salario" type="text" />
            </label>
            <label htmlFor="ctps">
              CTPS
              <input id="CTPS" type="text" />
            </label>
          </div>

          <div className={styles.register__break}>
            <label htmlFor="endereco">
              Endereço completo
              <input id="endereco" type="text" />
            </label>
          </div>
          <button>Cadastrar</button>
        </form>
      </article>
    </section>
  );
}
