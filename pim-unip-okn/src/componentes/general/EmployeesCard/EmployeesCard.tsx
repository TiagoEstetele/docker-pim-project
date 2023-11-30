import styles from "./EmployeesCard.module.scss";
import Image from "next/image";

export default interface EmployeesCardProps {
  name: string;
  cargo: string;
  telefone: string;
  dataAdmissao: string;
  dataNascimento: string;
  id: number;
}

export function EmployeesCard({
  name,
  cargo,
  telefone,
  dataAdmissao,
  dataNascimento,
  id,
  onDelete,
  onEdit,
}: EmployeesCardProps & {
  onDelete: (id: number) => void;
  onEdit: (id: number) => void;
}) {
  const handleDeleteClick = () => {
    onDelete(id);
  };

  const handleEditClick = () => {
    onEdit(id);
  };
  return (
    <>
      <div className={styles.employees__card}>
        <article className={styles.employees__text}>
          <div className={styles.employees__main}>
            <h3>{name}</h3>
            <p>{cargo}</p>
          </div>
          <div className={styles.employees__status}>
            <div className={styles.employees__id}>
              <p>{id}</p>
            </div>
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
            <button onClick={handleEditClick}>Editar</button>
          </div>
          <div>
            <button onClick={handleDeleteClick}>Excluir</button>
          </div>
        </div>
      </div>
    </>
  );
}
