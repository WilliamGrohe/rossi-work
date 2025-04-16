"use client";

import { useEffect, useState } from "react";
import { GeneratePresignedUrlDownload } from "../utils/generate-presigned-url";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
}

export default function PdfModal({ isOpen, onClose, pdfUrl }: ModalProps) {

  const [urlDownload, setUrlDownload] = useState<string | null>(null);

  const [isPdfUrl, setIsPdfUrl] = useState(true);

  useEffect(() => {
    if (isOpen && pdfUrl) {
      // Busca o URL assíncronamente
      const fetchPresignedUrl = async () => {
        try {
          const url = await GeneratePresignedUrlDownload(pdfUrl);
          setUrlDownload(url); // Armazena o URL no estado
          if(!url.includes('.pdf')) {
            setIsPdfUrl(false)
          }
        } catch (error) {
          console.error("Erro ao gerar o URL assinado:", error);
          setIsPdfUrl(false)
        }
      };

      fetchPresignedUrl();
    } else {
      setUrlDownload(null); // Limpa o URL quando o modal é fechado
      setIsPdfUrl(true)
    }
  }, [isOpen, pdfUrl]);


  if (!isOpen) return null;

  if(!urlDownload) return null

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-white w-11/12 max-w-4xl h-5/6 rounded-lg shadow-lg overflow-hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold">Visualizar PDF</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            Fechar
          </button>
        </div>
        <div className="h-full">
          { isPdfUrl ? 
          <iframe
            src={urlDownload}
            className="w-full h-[90%]"
            frameBorder="0"
            title="PDF Viewer"
          ></iframe>
          :
          <div className="flex items-start justify-center h-full p-4">
            <p className="">{pdfUrl}</p>
          </div>
        }
        </div>
      </div>
    </div>
  );
}