import FormContact from "./components/form-contact";
import { Toaster } from "@/components/ui/sonner";
import Header from "./components/header";

export default function Home() {
  return (
    <div className="flex flex-col h-screen w-full pt-4 items-center bg-blue-400 overflow-x-hidden">
      <Header />
      <div className="bg-[#F9F9F9] -mt-6 z-50 rounded-t-4xl max-w-[500px] rounded-b-4xl">
        <main className="mb-6 max-w-[500px] pt-4  ">
          <section className="px-4 py-2">
            <p className="font-semibold">Preencha seus dados abaixo:</p>
            <FormContact />
            <Toaster />
          </section>
        </main>
        <footer className="text-center rounded-b-4xl text-gray-400 text-sm border p-2 max-w-[500px]">
          <p>Livraria Rossi - 2025</p>
          <p>
            Desenvolvido por{" "}
            <a
              href="http://williamgrohe.github.io"
              className="text-blue-300"
              target="_blank"
            >
              William Grohe
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
}
