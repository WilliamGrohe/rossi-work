import Image from "next/image";

import RossiLogo from "@/assets/logo-rossi.png";
import FormContact from "./components/form-contact";


export default function Home() {
  return (
    <>
      <div className="flex bg-blue-500 h-12"></div>
      <header className="flex p-4 gap-2 z-50 -mt-6 rounded-t-3xl bg-[#F9F9F9]">
        <div className="relative rounded">
          <Image
            src={RossiLogo}
            alt="Livraria Rossi"
            height={48}
            className="object-cover"
          />
        </div>

        <div className="">
          <p className="text-2xl font-bold">Livraria Rossi</p>
          <h3 className="text-md text-gray-400">Trabalhe conosco</h3>
        </div>
      </header>
      <main className="mb-6 max-w-[500px]">
        <section className="px-4 py-2">
          <p className="font-semibold">Preencha seus dados abaixo:</p>
          <FormContact />
        </section>
      </main>
      <footer className="text-center text-gray-400 text-sm border p-2">
        <p>Livraria Rossi - 2025</p>
        <p>Desenvolvido por <a href="http://williamgrohe.github.io" className="text-blue-300" target="_blank">William Grohe</a></p>
      </footer>
    </>
  );
}
