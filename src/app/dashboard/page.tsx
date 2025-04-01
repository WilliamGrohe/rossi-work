"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import LoadingSpinner from "../components/loadingSpinner";

import Header from "../components/header";
import { Button } from "@/components/ui/button";
import { FileIcon, FileText, Star } from "lucide-react";
import {
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/ui/table";
const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export default function Dashboard() {
  const router = useRouter();
  const [onLoad, setOnLoad] = useState(true);

  function handleLogOut() {
    console.log("logout");
    setOnLoad(true);
    localStorage.removeItem("token");
    router.push("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
    }
    setOnLoad(false);
  }, [router]);

  if (onLoad) {
    return <LoadingSpinner />;
  }

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
        <button onClick={handleLogOut}>Logout</button>
      </div>
      <div className="bg-white rounded-2xl w-screen p-4 m-4">
        {/* <div className="rounded-lg border border-gray-200 p-2">
          <div className="flex items-center gap-2.5 px-3 py-2.5">
            <div className="flex gap-2">
              <FileIcon className=" w-5 h-5 top-0.5 left-0.5 cursor-pointer" />
              <Star className="w-5 h-5 cursor-pointer text-amber-500 hover:fill-amber-500" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Nome do candidato</span>
              <span className="text-sm">CPF</span>
              </div>
          </div>
        </div> */}
        <Table className="w-full rounded-lg">
          <TableCaption>A list of your recent invoices.</TableCaption>
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
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice} className="rounded-md border">
                <TableCell className="font-medium flex gap-2 p-2">
                  <div className="flex gap-2 items-center">
                  <FileIcon className=" w-5 h-5 top-0.5 left-0.5 cursor-pointer" />
                  <Star className="w-5 h-5 cursor-pointer text-amber-500 hover:fill-amber-500" />
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-col">
                    <span className="font-semibold">Nome do candidato</span>
                    <span className="font-normal">123.456.789-00</span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-col">
                  <span className="font-normal">(54) 99123-4567</span>
                    <span className="font-semibold">Idade: <span className="font-normal">25</span></span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-col">
                  <span className="font-normal">Vendedor</span>
                  <span className="font-normal">Motorista</span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-col">
                  <span className="font-normal">18/03/2025</span>
                  </div>
                </TableCell>
                <TableCell >
                  <div className="flex flex-col">
                  <span className="font-semibold ">VISUALIZAR</span>
                  </div>
                </TableCell>
                <TableCell >
                  
                  <FileText className="w-6 h-6 cursor-pointer" />
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
      </div>
    </div>
  );
}
