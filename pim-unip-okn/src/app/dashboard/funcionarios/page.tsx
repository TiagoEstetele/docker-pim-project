import styles from "./funcionarios.module.scss";
import { EmployeesCard } from "@/componentes/general";

export default function dashboardFuncionarios() {
  return (
    <section className={`${styles.employees} wrapper`}>
      <div className={styles.employees__cards}>
        <EmployeesCard
          name="Tiago Estetele"
          cargo="Estagiário"
          telefone="16 991366797"
          dataAdmissao="12/09/2013"
          dataNascimento="16/08/2001"
        />
        <EmployeesCard
          name="Ana Silva"
          cargo="Assistente de Vendas"
          telefone="16 999876543"
          dataAdmissao="05/03/2018"
          dataNascimento="25/11/1995"
        />
        <EmployeesCard
          name="Carlos Souza"
          cargo="Gerente de Projetos"
          telefone="16 987654321"
          dataAdmissao="10/02/2015"
          dataNascimento="15/07/1989"
        />
        <EmployeesCard
          name="Mariana Ferreira"
          cargo="Desenvolvedor Sênior"
          telefone="16 996543210"
          dataAdmissao="20/04/2012"
          dataNascimento="12/09/1985"
        />
        <EmployeesCard
          name="João Santos"
          cargo="Analista de Marketing"
          telefone="16 998877665"
          dataAdmissao="30/07/2017"
          dataNascimento="10/12/1990"
        />
      </div>
    </section>
  );
}
