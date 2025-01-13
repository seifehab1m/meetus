import Login from "@/components/Login";
import logo from "@/styles/logo.png";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Home() {
  return (
    <section className="container grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-screen items-center justify-center ">
      <div className="lg:col-span-1 col-span-3 mx-auto max-w-[382px] w-full pt-7">
        <h2 className="text-5xl mb-1 lg:ps-2">Welcome back </h2>
        <p className="text-[#62626B] w-full lg:text-center">Step into our shopping metaverse for an unforgettable shopping experience</p>
        <Login />
      </div>

      <div className="lg:col-span-2 col-span-3 relative">
        <div className="flex flex-col items-center justify-center">
          <Image src={logo} alt="logo" width={1000} height={10} />
        </div>
        <div className="absolute left-1/2 -translate-x-1/2 top-[62%] flex items-center justify-center flex-col">
          <h2 className="text-4xl flex items-start">
            MeetUs <span className="text-base self-start font-bold">VR</span>
          </h2>
        </div>

      </div>
    </section>
  );
}
