import Image from "next/image";
import RossiLogo from "@/assets/logo-rossi.png";

export default function Header() {
  return (
    <header className="flex p-4 items-start pb-12 gap-2 max-w-[500px]">
        <div className="relative rounded content-center">
          <Image
            src={RossiLogo}
            alt="Livraria Rossi"
            height={48}
            className="object-cover"
          />
        </div>

        <div className="">
          <p className="text-2xl font-bold text-white">Livraria Rossi</p>
          <h3 className="text-md font-semibold text-gray-950">Trabalhe conosco</h3>
        </div>
      </header>
  )
}