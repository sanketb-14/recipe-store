import Image from "next/image";
import bg_img from "@/public/bg_img.jpeg";

const layout = async ({ children }) => {
  return (
    <div className="grid grid-cols-1 h-full   gap-12">
      {" "}
      <main className="  ">
        <Image
          src={bg_img}
          fill
          className="object-cover object-top"
          alt="Recipe-store"
          placeholder="blur"
        />
        <div className="w-full flex ">
          <h1 className="relative  text-2xl sm:text-5xl font-bold text-end text-white  tracking-wide text-nowrap">
            Welcome to Recipe-store{" "}
          </h1>
        </div>
      </main>
      <div className="py-1 flex justify-end">{children}</div>
    </div>
  );
};

export default layout;
