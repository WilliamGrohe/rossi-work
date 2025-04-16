"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { FileIcon, Star, FileText, Eye } from "lucide-react";

import { useState } from "react";
import PdfModal from "./pdf-modal";

interface Candidate {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  age: number;
  message: string | null;
  jobPositions: string[];
  created_at: Date;
  curriculum: string; // URL do PDF
}

interface DashboardTableProps {
  candidates: Candidate[];
}

export default function DashboardTable({ candidates }: DashboardTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState("");

  const handleOpenModal = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPdf("");
  };

  return (
    <>
      <Table className="w-full rounded-lg">
        <TableCaption>Uma lista dos candidatos mais recentes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Notas</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Contatos</TableHead>
            <TableHead>Interesse</TableHead>
            <TableHead>Envio Curriculo</TableHead>
            <TableHead>Mensagem</TableHead>
            <TableHead className="w-[50px]">Curriculo</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="rounded-lg">
          {candidates.map((candidate) => (
            <TableRow key={candidate.id} className="rounded-md border">
              <TableCell className="font-medium flex gap-2 p-2">
                <div className="flex gap-2 items-center">
                  <FileIcon className=" w-5 h-5 top-0.5 left-0.5 cursor-pointer" />
                  <Star className="w-5 h-5 cursor-pointer text-amber-500 hover:fill-amber-500" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-semibold">{candidate.name}</span>
                  <span className="font-normal">{candidate.cpf}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-normal">{candidate.phone}</span>
                  <span className="font-semibold">
                    Idade: <span className="font-normal">{candidate.age}</span>
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  {candidate.jobPositions.map((jobPosition) => (
                    <span key={jobPosition} className="font-normal">
                      {jobPosition}
                    </span>
                  ))}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col">
                  <span className="font-normal">
                    {new Date(candidate.created_at).toLocaleDateString("pt-BR")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-row">
                  <span className="font-semibold ">
                    LER
                    <Eye
                      className="w-5 h-5 cursor-pointer"
                      onClick={() => handleOpenModal(candidate.message!)}
                    />
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <FileText
                  className="w-6 h-6 cursor-pointer"
                  // Abre o modal com o PDF
                  onClick={() => handleOpenModal(candidate.curriculum)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Modal para exibir o PDF */}
      <PdfModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        pdfUrl={selectedPdf}
      />
    </>
  );
}
