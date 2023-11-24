import { Attributes } from "react";
import styles from "./Logout.module.scss";
import { useRouter } from "next/navigation";

interface LogoutProps {
  open: true | false;
  onClick: () => void;
}

export function Logout({ open, onClick }: LogoutProps) {
  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");

    router.push("/");
  }
  return (
    <div className={styles.header__logout}>
      <button onClick={onClick}>
        <svg>
          <use xlinkHref="/sprites.svg#logout"></use>
        </svg>
      </button>
      {open ? (
        <div className={styles.header__confirm}>
          <p>Deseja sair?</p>
          <div className={styles.header__buttons}>
            <button onClick={handleLogout}>Sim</button>
            <button onClick={onClick}>Não</button>
          </div>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
