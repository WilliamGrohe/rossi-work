import { NextResponse } from "next/server";
import { prisma } from "@/app/utils/prisma";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
  const { email, password } = await req.json();

  const user = await prisma.team.findUnique({
    where: { email },
  });

  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Credenciais inválidas" }, { status: 401 });
  }

  const token = jwt.sign(
    { 
      userId: user.id 
    }, 
      process.env.JWT_SECRET!, 
    {
      expiresIn: "1m",
    }
  );

  return NextResponse.json({ token });
 } catch (error) {
    console.error("Erro na API de login:", error);
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    );
  }
}