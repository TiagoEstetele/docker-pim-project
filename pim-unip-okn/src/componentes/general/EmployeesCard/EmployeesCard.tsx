import styles from "./EmployeesCard.module.scss";
import Image from "next/image";
import Avatar from "../../../../public/employuseravatar.png";

export default interface EmployeesCardProps {
  name: string;
  cargo: string;
  telefone: string;
  dataAdmissao: string;
  dataNascimento: string;
}

export function EmployeesCard({
  name,
  cargo,
  telefone,
  dataAdmissao,
  dataNascimento,
}: EmployeesCardProps) {
  return (
    <>
      <div className={styles.employees__card}>
        <article className={styles.employees__text}>
          <div className={styles.employees__main}>
            <h3>{name}</h3>
            <p>{cargo}</p>
          </div>
          <div className={styles.employees__avatar}>
            <Image
              src={Avatar}
              width={Avatar.width}
              height={Avatar.height}
              alt="Avatar logo"
            />
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
