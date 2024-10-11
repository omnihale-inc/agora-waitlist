import Image from "next/image";
import shopperImage from "./shopper.jpg";
import Link from "next/link";

export default function Home() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <div>
        <div className="relative h-screen w-screen">
          <Image src={shopperImage} alt="image" fill objectFit="cover" />
        </div>
        <div className="absolute backdrop-blur-[2px] bg-black/80 h-screen w-screen top-0"></div>
        <div className="grid place-items-center absolute top-0 text-white h-screen w-screen">
          <div className="w-fit">
            <div className="text-center text-sm lg:text-base px-4">
              <h2 className="font-semibold mb-5 text-base lg:text-xl">
                AGORA: Every Day is Black Friday
              </h2>
              <p className="font-light w-11/12 max-w-4xl">
                Imagine a personal shopping assistant that searches the web for
                stores with the best prices, exclusive discounts, and free
                delivery offers—all in one place. Agora brings you a smarter,
                faster way to shop online, saving you both time and money,{" "}
                <span className="font-semibold">
                  Every day you shop will feel like a black friday
                </span>
                . Sign up for early access and be among the first to experience
                the future of online shopping. Don’t miss out on incredible
                deals before everyone else
              </p>
              <p className="font-semibold mt-8">
                Be the First to Discover the Best Shopping Deals with Agora!
              </p>
            </div>
            <Link href="/waitlist">
              <button className="block bg-white w-32 h-11 rounded-full text-black font-semibold mt-4 mx-auto">
                Join Waitlist
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
