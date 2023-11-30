"use client";
import styles from "./Header.module.scss";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import jwt from "jsonwebtoken";
import { Logout } from "@/componentes/general/";
import { usePathname } from "next/navigation";

interface User {
  role?: string;
  certserialnumber?: string;
}

export function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [logout, setLogout] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt.decode(token);

      setUser(decodedToken as User);
    }
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleOPen = () => {
    setLogout((prevState) => !prevState);
  };
  console.log(pathname);

  return (
    <header className={styles.header}>
      <nav className={`${styles.header__wrapper} wrapper`}>
        <div className={styles.header__logo}>
          <Link href="./homepage">
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
        {user && user.role === "1" ? (
          <ul
            className={`${styles.header__nav}`}
            data-show={isNavOpen ? "true" : ""}
            id="nav"
          >
            <li>
              <Link
                href="./homepage"
                id="perfil"
                data-current={
                  pathname === "/dashboard/homepage" ? "true" : "false"
                }
              >
                Página Principal
              </Link>
            </li>
            <li>
              <Link
                href="./perfil"
                id="bater-ponto"
                data-current={
                  pathname === "/dashboard/perfil" ? "true" : "false"
                }
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                href="./funcionarios"
                id="perfil"
                data-current={
                  pathname === "/dashboard/funcionarios" ? "true" : "false"
                }
              >
                Funcionarios
              </Link>
            </li>
            <li>
              <Link
                href="./cadastrar-funcionarios"
                id="bater-ponto"
                data-current={
                  pathname === "/dashboard/cadastrar-funcionarios"
                    ? "true"
                    : "false"
                }
              >
                Cadastrar
              </Link>
            </li>
            <div className={styles.header__userMobile}>
              <Logout open={logout} onClick={toggleOPen} />
            </div>
          </ul>
        ) : (
          <ul
            className={`${styles.header__nav}`}
            data-show={isNavOpen ? "true" : ""}
            id="nav"
          >
            <li>
              <Link
                href="./homepage"
                id="perfil"
                data-current={
                  pathname === "/dashboard/homepage" ? "true" : "false"
                }
              >
                Página Principal
              </Link>
            </li>
            <li>
              <Link
                href="./perfil"
                id="perfil"
                data-current={
                  pathname === "/dashboard/perfil" ? "true" : "false"
                }
              >
                Perfil
              </Link>
            </li>
            <li>
              <Link
                href="./gerar-holerite"
                id="perfil"
                data-current={
                  pathname === "/dashboard/gerar-holerite" ? "true" : "false"
                }
              >
                Holerite
              </Link>
            </li>
            <li>
              <Link
                href="./bater-ponto"
                id="perfil"
                data-current={
                  pathname === "/dashboard/bater-ponto" ? "true" : "false"
                }
              >
                Bater Ponto
              </Link>
            </li>
            <div className={styles.header__userMobile}>
              <Logout open={logout} onClick={toggleOPen} />
            </div>
          </ul>
        )}

        <div className={styles.header__user}>
          <Logout open={logout} onClick={toggleOPen} />
        </div>
      </nav>
    </header>
  );
}
