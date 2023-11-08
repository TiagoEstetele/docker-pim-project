"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
  return (
    <header className={styles.header}>
      <nav className={`${styles.header__wrapper} wrapper`}>
        <div className={styles.header__logo}>
          <Link href="/dashboard">
            <Image
              src="/logo-okn.svg"
              alt="Logo OKN"
              quality={100}
              width={120}
              height={17}
            />
          </Link>
        </div>
        <button
          onClick={toggleNav}
          className={styles.header__hamburguer}
          data-animate={isNavOpen ? "true" : ""}
        ></button>
        <ul
          className={`${styles.header__nav}`}
          data-show={isNavOpen ? "true" : ""}
        >
          <li>
            <Link href="/">Usuários</Link>
          </li>
          <li>
            <Link href="/">Cadastrar Usuário</Link>
          </li>
          <li>
            <Link href="/">Editar Usuário</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
