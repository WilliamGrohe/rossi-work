import { redirect } from "next/navigation";
import { prisma } from "../utils/prisma";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

import Header from "../components/header";
import { Button } from "@/components/ui/button";

import DashboardTable from "../components/dashboard-table";

export default async function Dashboard() {
  // Obtém o token dos cookies
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    console.log("Token não encontrado, redirecionando para o login.");
    redirect("/login"); // Redireciona para a página de login se o token não existir
  }

  try {
    // Verifica o token JWT
    jwt.verify(token, process.env.JWT_SECRET!);

    // Busca os dados do banco de dados
    const candidates = await prisma.lead.findMany({
      orderBy: {
        created_at: "desc", // Ordena do mais recente para o mais antigo
      },
      take: 20, // Limita a busca aos 20 registros mais recentes
    });

    return (
      <div className="w-full bg-gray-200 min-h-screen flex">
        <div className="bg-blue-400 min-h-screen w-96 p-4 pt-14">
          <Header />
          <div className="bg-white rounded-md h-fit flex-col p-4 flex gap-4 pb-6">
            <span className="font-medium mx-auto">Filtrar resultados</span>
            <div className="flex flex-col gap-2 py-2">
              <input
                type="text"
                placeholder="Nome"
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="CPF"
                className="border rounded-lg p-2"
              />
              <input
                type="text"
                placeholder="Vagas"
                className="border rounded-lg p-2"
              />
              <div className="flex gap-2">
                <input type="checkbox" name="favoritos" id="favoritos" />
                <label htmlFor="favoritos">Favoritos</label>
              </div>
            </div>
            <Button className="py-5 cursor-pointer">BUSCAR</Button>
          </div>
          <h1>Bem-vindo ao Dashboard</h1>
        </div>
        <div className="bg-white rounded-2xl w-screen p-4 m-4">
          <DashboardTable candidates={candidates} />
        </div>
      </div>
    );
  } catch (error) {
    console.error("Token inválido:", error);
    redirect("/login"); // Redireciona para a página de login se o token for inválido
  }
}
