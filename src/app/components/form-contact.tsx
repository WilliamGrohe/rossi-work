"use client";

import { Button } from "@/components/ui/button";

import { Calendar, IdCard, Phone, UserRound } from "lucide-react";
import { useForm } from "react-hook-form";
import { RegisterNewLead } from "../utils/register-new-lead";

export type FormValues = {
  name: string;
  cpf: number;
  age: number;
  phone: number;
  jobPositions: [];
  message: string;
  curriculum: FileList;
};


function onSubmit(data: FormValues) {

  console.log(data);
  RegisterNewLead(data)
  return data
}

export default function FormContact() {
  const form = useForm<FormValues>();
  const { register, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className=" overflow-hidden">
      <div className="rounded-xl border bg-white p-2 ">
        <div className="flex items-center gap-1">
          <label htmlFor="name" className="flex items-center gap-1">
            <UserRound size={16} />
            <input
              type="text"
              required
              placeholder="Nome"
              className="p-1"
              id="name"
              {...register("name")}
            />
          </label>
        </div>

        <div className=" items-center justify-between gap-1 flex">
          <label htmlFor="cpf" className="flex items-center gap-1">
            <IdCard size={16} />
            <input
              type="number"
              id="cpf"
              required
              placeholder="000.000.000-00"
              className="p-1"
              {...register("cpf", { valueAsNumber: true })}
            />
          </label>
        </div>
        <div className=" items-center justify-between gap-1 flex">
          <label htmlFor="age" className="flex items-center gap-1">
            <Calendar size={16} />
            <input
              type="number"
              id="age"
              required
              placeholder="Idade"
              className="p-1"
              {...register("age", { valueAsNumber: true })}
            />
          </label>
        </div>

        <div className="flex items-center gap-1">
          <label htmlFor="phone" className="flex items-center gap-1">
            <Phone size={16} />
            <input
              type="tel"
              id="phone"
              required
              placeholder="(54) 99123-4567"
              {...register("phone", { valueAsNumber: true })}
            />
          </label>
        </div>
      </div>
      <p className="font-semibold pt-4">Do trabalho:</p>
      <div className="rounded-xl border flex-col bg-white p-2">
        <p>Qual o(s) cargo(s) você tem interesse?</p>
        <div className="grid grid-cols-2 p-2 ">
          <label htmlFor="vendedor">
            <input
              type="checkbox"
              id="vendedor"
              value="vendedor"
              {...register("jobPositions")}
            /> Vendedor
          </label>
          <label htmlFor="caixa">
            <input
              type="checkbox"
              {...register("jobPositions")}
              id="caixa"
              value="caixa"
            /> Operador de Caixa
          </label>
          <label htmlFor="estoque">
            <input
              type="checkbox"
              {...register("jobPositions")}
              id="estoque"
              value="estoque"
            /> Estoque
          </label>
          <label htmlFor="motorista">
            <input
              type="checkbox"
              {...register("jobPositions")}
              id="motorista"
              value="motorista"
            /> Motorista
          </label>
        </div>
      </div>
      <div className="pt-4">
        <p className="">Campo de observações</p>
        <textarea
          id="message"
          className="bg-white border rounded-xl p-2"
          cols={24}
          rows={10}
          placeholder="Descreva resumidamente suas qualificações e experiências (opcional)"
          {...register("message")}
        ></textarea>
      </div>

      <div className="pt-4">
        <p className="">Selecione o seu currículo</p>
        <Button className="bg-green-700">
          <input
            type="file"
            {...register("curriculum")}
            id="curriculum"
            accept=".pdf, .doc, .docx"
          />
        </Button>
      </div>

      <button type="submit">Enviar</button>
    </form>
  );
}