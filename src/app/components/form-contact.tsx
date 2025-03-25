"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";

import { Calendar, FileUp, IdCard, Phone, UserRound } from "lucide-react";
import {
  RegisterNewLead,
  CreateUniqueKeyNameForFileUploadOnBucket,
} from "../utils/register-new-lead";
import { GeneratePresignedUrl } from "../utils/generate-presigned-url";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

import { CpfValidation } from "@/app/utils/cpf-validation";

export type FormValues = {
  name: string;
  cpf: string;
  age: number;
  phone: string;
  jobPositions: string[];
  message?: string;
  // curriculum: FileList;
};

const formInputsSchema = z.object({
  name: z.string().nonempty("O nome é obrigatório."),
  cpf: z
    .string()
    .max(15)
    .min(13, "Digite todos os 11 dígitos.")
    .nonempty("O CPF é obrigatório.")
    .refine((cpf) => CpfValidation(cpf), {
      message: "CPF inválido.",
    }),
  age: z.number(),
  phone: z.string().nonempty("O telefone é obrigatório."),
  message: z.string().optional(),
  jobPositions: z.string().array(),
  curriculum: z.unknown().transform((value) => value as FileList),
});

export type FormInputsSchema = z.infer<typeof formInputsSchema>;
export default function FormContact() {
  const [uploading, setUploading] = useState(false);
  const [uploadSuccessful, setUploadSuccessful] = useState(false);
  const [cpf, setCpf] = useState("");
  const [phone, setPhone] = useState(""); // Estado para o telefone

  function formatCpf(value: string): string {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
      .replace(/(\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
  }

  function formatPhone(value: string): string {
    return value
      .replace(/\D/g, "") // Remove todos os caracteres não numéricos
      .replace(/(\d{2})(\d)/, "($1) $2") // Adiciona os parênteses no DDD
      .replace(/(\d{5})(\d)/, "$1-$2") // Adiciona o traço após os 5 primeiros dígitos
      .replace(/(-\d{4})\d+?$/, "$1"); // Limita o número a 11 dígitos
  }

  const handleCpfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCpf(event.target.value);
    setCpf(formattedCpf);
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhone(event.target.value);
    setPhone(formattedPhone);
  };

  const form = useForm<FormInputsSchema>({
    resolver: zodResolver(formInputsSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  async function onSubmit(data: FormInputsSchema) {
    if (!data.curriculum) return;

    setUploading(true);

    const file = data.curriculum[0];

    const uniqueFileName = await CreateUniqueKeyNameForFileUploadOnBucket(
      file.name
    );

    try {
      // Gera o presigned URL de upload usando a Server Action
      const presignedUrl = await GeneratePresignedUrl(
        uniqueFileName,
        file.type
      );

      // Faz o upload do arquivo para o S3 usando o presigned URL
      const uploadResponse = await fetch(presignedUrl, {
        method: "PUT",
        body: file,
        headers: {
          "Content-Type": file.type,
          // "Content-Length": file.size.toString(),
          // "Access-Control-Allow-Origin": '*',
        },
      });

      if (uploadResponse.ok) {
        // Registra no banco de dados o dataForm e uniqueFileName Key of Bucket
        RegisterNewLead(data, uniqueFileName);
        setUploadSuccessful(true);
      } else {
        throw new Error("Erro ao fazer o upload");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao fazer o upload");
    } finally {
      setTimeout(() => {
        setUploading(false);
      }, 5000);
    }

    return data;
  }

  return (
    <>
      {/* POP UP MODAL */}
      <div
        className={`${
          uploading ? "" : "hidden"
        } fixed top-0 right-0 left-0 z-50 justify-center items-center w-full h-full md:inset-0 max-h-full bg-black/70`}
      >
        <div className="flex h-full items-center content-center justify-items-center justify-center relative">
          <div className="flex bg-white rounded-lg shadow-sm dark:bg-gray-700 p-4">
            {uploadSuccessful ? (
              <div className="flex flex-col gap-2">
                <DotLottieReact
                  src="https://lottie.host/cfc337b0-51bf-44ea-a1b2-856f2261c152/0XI6L3AW56.lottie"
                  loop
                  autoplay
                />
                <h2 className=" items-center content-center self-center justify-center text-2xl font-bold">
                  Currículo enviado com sucesso!
                </h2>
              </div>
            ) : (
              <div role="status" className="flex gap-2">
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
                <h1 className=" items-center content-center self-center justify-center text-2xl font-bold">
                  Salvando e enviando...
                </h1>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* FORMULARIO */}
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
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>

          <div className=" items-center justify-between gap-1 flex">
            <label htmlFor="cpf" className="flex items-center gap-1">
              <IdCard size={16} />
              <input
                type="text"
                maxLength={14}
                id="cpf"
                required
                placeholder="000.000.000-00"
                className="p-1"
                value={cpf}
                onChangeCapture={handleCpfChange}
                {...register("cpf")}
              />
            </label>
            {errors.cpf ? (
              <span className="text-red-500">{errors.cpf.message}</span>
            ) : null}
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
                value={phone} // Usa o estado formatado
                onChangeCapture={handlePhoneChange} // Aplica a máscara
                {...register("phone")}
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
              />{" "}
              Vendedor
            </label>
            <label htmlFor="caixa">
              <input
                type="checkbox"
                {...register("jobPositions")}
                id="caixa"
                value="caixa"
              />{" "}
              Operador de Caixa
            </label>
            <label htmlFor="estoque">
              <input
                type="checkbox"
                {...register("jobPositions")}
                id="estoque"
                value="estoque"
              />{" "}
              Estoque
            </label>
            <label htmlFor="motorista">
              <input
                type="checkbox"
                {...register("jobPositions")}
                id="motorista"
                value="motorista"
              />{" "}
              Outros
            </label>
          </div>
        </div>
        <div className="pt-4 w-full">
          <p className="">Campo de observações</p>
          <textarea
            id="message"
            className="bg-white border rounded-xl p-2 w-full"
            // cols={24}
            rows={6}
            placeholder="Descreva resumidamente suas qualificações e experiências (opcional)"
            {...register("message")}
          ></textarea>
        </div>

        <div className="pt-4 mx-auto w-full">
          <p className="">Selecione o seu currículo</p>
          <Button
            variant="outline"
            className="flex items-center gap-2 cursor-pointer mx-auto"
          >
            <span>
              <FileUp />
            </span>
            <input
              type="file"
              {...register("curriculum")}
              id="curriculum"
              accept=".pdf, .doc, .docx"
            />
          </Button>
        </div>

        <div className="mt-4 justify-center flex mx-auto w-full">
          <button
            className="p-2 bg-linear-to-t from-sky-500 to-indigo-500 rounded-xl w-2xs cursor-pointer text-white font-bold hover:from-indigo-700"
            type="submit"
          >
            {uploading ? "Enviando..." : "Enviar"}
          </button>
        </div>
      </form>
    </>
  );
}
