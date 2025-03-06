'use server'

import { FormValues } from '../components/form-contact';
import  { prisma } from './prisma'

export async function RegisterNewLead(data: FormValues) {
  const { name, cpf, age, phone, message, jobPositions, curriculum } = data;

  try {
    const lead = await prisma.lead.create({
      data: {
        name,
        cpf,
        age,
        phone,
        message, 
        jobPositions,
        curriculum: curriculum[0].name
      },
    });

    console.log('console try');
    return lead;
  } catch (error) {
    throw new Error(error);
  }
}