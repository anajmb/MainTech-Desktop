import React, { createContext, useContext, useEffect, useState } from "react";

export type UserType = {
  id: number;
  name: string;
  email: string;
  role: string;
  birthDate: string;
  cpf: string;
  phone: string;
  photo?: string;
  status?: string;
};

type AuthContextType = {
  user: UserType | null;
  setUser: React.Dispatch<React.SetStateAction<UserType | null>>;
  updateUser: (data: Partial<UserType>) => Promise<void>;
  logout: () => Promise<void>;
  loginUser: (user: any) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  // 🔹 Carrega o usuário salvo no localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  // 🔹 Atualiza dados locais do usuário
  async function updateUser(updatedData: Partial<UserType>) {
    if (!user) return;
    const newUser = { ...user, ...updatedData };
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  }

  // 🔹 Login — define e salva o usuário
  function loginUser(user: any) {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  }

  // 🔹 Logout — limpa tudo
  async function logout() {
    localStorage.clear();
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, setUser, updateUser, logout, loginUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
