import styles from "./EmployeesCard.module.scss";
import Image from "next/image";

export default interface EmployeesCardProps {
  name: string;
  cargo: string;
  telefone: string;
  dataAdmissao: string;
  dataNascimento: string;
  ativo: true | false;
}

export function EmployeesCard({
  name,
  cargo,
  telefone,
  dataAdmissao,
  dataNascimento,
  ativo,
}: EmployeesCardProps) {
  return (
    <>
      <div className={styles.employees__card}>
        <article className={styles.employees__text}>
          <div className={styles.employees__main}>
            <h3>{name}</h3>
            <p>{cargo}</p>
          </div>
          <div className={styles.employees__status}>
            {ativo === true ? (
              <div style={{ backgroundColor: "#8bf42b" }}></div>
            ) : (
              <div style={{ backgroundColor: "#db4437" }}></div>
            )}
          </div>
        </article>
        <div className={styles.employees__contents}>
          <p>
            <span>Nascimento: </span>
            {dataNascimento}
          </p>
          <p>
            <span>Telefone: </span>
            {telefone}
          </p>
          <p>
            <span>Admissão: </span>
            {dataAdmissao}
          </p>
        </div>
        <div className={styles.employees__buttons}>
          <div>
            <button>Editar</button>
          </div>
          <div>
            <button>Excluir</button>
          </div>
        </div>
      </div>
    </>
  );
}
