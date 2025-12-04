import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../lib/axios";

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
  loginUser: (user: any, token?: string, keepConnected?: boolean) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`; // <<< importante
        console.log("Usuário restaurado do LocalStorage:", parsedUser);
      }
    } catch (error) {
      console.error("Erro ao restaurar sessão:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Atualizar dados locais 
  async function updateUser(updatedData: Partial<UserType>): Promise<void> {
    if (!user) return;
    
    const newUser = { ...user, ...updatedData };
    
    // Salva PRIMEIRO no localStorage
    localStorage.setItem("user", JSON.stringify(newUser));
    console.log("Salvo no localStorage:", newUser);
    
    // Depois atualiza o estado
    setUser(newUser);
  }

  // Login
  function loginUser(user: any, token?: string, keepConnected?: boolean) {
    setUser(user);

    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      localStorage.setItem("token", token);
    }
    
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("keepConnected", keepConnected ? "true" : "false");
  }

  // Logout
  async function logout() {
    try {
      // limpa tudo relacionado à autenticação
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("keepConnected");
      localStorage.removeItem("refreshToken");
      // remove header da instância api
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      console.log("Logout concluído - localStorage limpo");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
      throw error;
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", paddingTop: "5em" }}>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, setUser, updateUser, logout, loginUser }} >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return context;
}
