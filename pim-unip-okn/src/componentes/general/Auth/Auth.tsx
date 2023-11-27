"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthChecker: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/permissao");
    }
  }, [router]);

  return <>{children}</>;
};

export default AuthChecker;
