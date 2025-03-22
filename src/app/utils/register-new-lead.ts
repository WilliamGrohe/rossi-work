"use server";

import { FormInputsSchema } from "../components/form-contact";
import { prisma } from "./prisma";
import { randomUUID } from "node:crypto";

export async function RegisterNewLead(data: FormInputsSchema, uniqueFileNameKeyOnBucket: string) {
  const { name, cpf, age, phone, message, jobPositions, curriculum } = data;

  if (!curriculum || curriculum.length === 0) {
    return;
  }

  try {
    // SALVA NO BANCO OS DADOS DO FORM
    const lead = await prisma.lead.create({
      data: {
        name,
        cpf: String(cpf.replace(/\D/g, "")),
        age,
        phone,
        message,
        jobPositions,
        curriculum: uniqueFileNameKeyOnBucket,
      },
    });
    
    return lead;
  } catch (error) {
    console.error(error);
    alert('Erro ao enviar currículo');
  }
}

export async function CreateUniqueKeyNameForFileUploadOnBucket(name:string){
  const uniqueFileName = randomUUID().concat("-").concat(name);

  return uniqueFileName;
}