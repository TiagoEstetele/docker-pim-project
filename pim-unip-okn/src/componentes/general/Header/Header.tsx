"use client";

import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import Avatar from "../../../../public/adminavatar.png";

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);

  // if (typeof window !== "undefined") {
  //   const currentURL = window.location.pathname;
  //   const parts = currentURL.split("/");
  //   const lastPart = parts[parts.length - 1];
  //   const linkId = document.querySelectorAll("#nav li a");
  //   linkId.forEach((link) => {
  //     if (link.id === lastPart) {
  //       link.setAttribute("data-current", "true");
  //     }
  //   });
  // }

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };
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
        <ul
          className={`${styles.header__nav}`}
          data-show={isNavOpen ? "true" : ""}
          id="nav"
        >
          {/* <li>
            <Link href="./funcionarios" id="funcionarios" data-current="true">
              Funcionários
            </Link>
          </li>
          <li>
            <Link href="./cadastrar-funcionarios" id="cadastrar-funcionarios">
              Cadastrar funcionários
            </Link>
          </li> */}
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

        <div className={styles.header__user}>
          <div className={styles.header__avatar}>
            <Image src={Avatar} alt="Avar logo" />
          </div>
        </div>
      </nav>
    </header>
  );
}
