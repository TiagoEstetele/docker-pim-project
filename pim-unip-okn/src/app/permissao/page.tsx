import styles from "./permissao.module.scss";
import allowed from "../../../public/notAllowed.jpg";
import Image from "next/image";
import Link from "next/link";

export default function PermissãoPage() {
  return (
    <section className={styles.permission}>
      <h3>
        Ops... Parece que você não possui as permissões necessárias para acessar
        esta página.
      </h3>
      <Image
        src={allowed}
        width={allowed.width}
        height={allowed.height}
        alt="Imagem representativa de sem permissão"
      />
      <Link href="/">
        <button>Voltar</button>
      </Link>
    </section>
  );
}
