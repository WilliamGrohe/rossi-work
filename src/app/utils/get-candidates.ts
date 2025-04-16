import { NextResponse } from "next/server";
import { prisma } from "./prisma";

export async function GetCandidates() {
  // Consulta ao banco de dados no servidor
  const candidates = await prisma.lead.findMany();
  return NextResponse.json(candidates);
}