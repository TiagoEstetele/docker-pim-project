"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Avatar from "../../../../public/adminavatar.png";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__wrapper} wrapper`}>
        <div className={styles.header__logo}>
          <Link href="./funcionarios">
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
        {user.id === 1 ? (
          <ul
            className={`${styles.header__nav}`}
            data-show={isNavOpen ? "true" : ""}
            id="nav"
          >
            <li>
              <Link href="./perfil" id="perfil">
                Funcionarios
              </Link>
            </li>
            <li>
              <Link href="./bater-ponto" id="bater-ponto" data-current="true">
                Cadastrar
              </Link>
            </li>
          </ul>
        ) : (
          <ul
            className={`${styles.header__nav}`}
            data-show={isNavOpen ? "true" : ""}
            id="nav"
          >
            <li>
              <Link href="./perfil" id="perfil">
                Perfil
              </Link>
            </li>
            <li>
              <Link href="./bater-ponto" id="bater-ponto" data-current="true">
                Bater ponto
              </Link>
            </li>
            <li>
              <Link href="./holerite" id="holerite">
                Holerite
              </Link>
            </li>
          </ul>
        )}

        <div className={styles.header__user}>
          <div className={styles.header__avatar}>
            <Image src={Avatar} alt="Avar logo" />
          </div>
        </div>
      </nav>
    </header>
  );
}
