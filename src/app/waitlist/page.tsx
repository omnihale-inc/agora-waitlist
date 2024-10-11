"use client";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import waitlistImage from "@/app/waitlist-image.jpg";

type Waitlist = "SHOW_FORM" | "SHOW_THANKS" | "SHOW_LOADER" | "SHOW_ERROR";

export default function Home() {
  const [waitlist, setWaitlist] = useState<Waitlist>("SHOW_FORM"); //

  switch (waitlist) {
    case "SHOW_FORM":
      return <Waitlist onWaitlist={setWaitlist} />;
    case "SHOW_THANKS":
      return <ThankYouMessage />;
    case "SHOW_LOADER":
      return <Sending />;
    default:
      return (
        <div className="grid place-items-center w-5/6 max-w-5xl mx-auto h-screen text-center text-red-500">
          An error occurred! Kindly reload the page to resubmit waitlist, sorry
          for the inconvience.
        </div>
      );
  }
}

const Waitlist = ({
  onWaitlist,
}: {
  onWaitlist: Dispatch<SetStateAction<Waitlist>>;
}) => {
  const [form, setForm] = useState({ name: "", email: "", phoneNumber: "" });

  const submitForm = (event: ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Shows loading screen
    onWaitlist("SHOW_LOADER");

    // Submits waitlist
    (async () => {
      try {
        const response = await fetch("/.netlify/functions/submitForm", {
          method: "POST",
          body: JSON.stringify(form),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error();
        }
        onWaitlist("SHOW_THANKS");
      } catch (e: any) {
        onWaitlist("SHOW_ERROR");
      }
    })();
  };

  const formHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;

    setForm((prevState) => ({ ...prevState, [name]: value }));
  };
  return (
    <form onSubmit={submitForm}>
      <div className="font-[family-name:var(--font-geist-sans)]">
        <div className="grid place-items-center h-screen w-screen">
          <div className="flex flex-col w-5/6 max-w-96">
            <div className="flex justify-center">
              <div className="relative w-80 h-40">
                <Image
                  src={waitlistImage}
                  alt="waitlist"
                  fill
                  objectFit="contain"
                />
              </div>
            </div>
            <h2 className="text-center mb-4 text-base lg:text-lg">
              The <span className="font-semibold">AGORA</span> Waitlist
            </h2>
            <input
              className="border border-gray-400 mb-5 py-3 px-8 rounded-full"
              type="text"
              placeholder="John Doe"
              name="name"
              value={form.name}
              onChange={formHandler}
              required={true}
            />
            <input
              className="border border-gray-400 mb-5 py-3 px-8 rounded-full"
              type="email"
              placeholder="johndoe@email.com"
              name="email"
              value={form.email}
              onChange={formHandler}
              required={true}
            />
            <input
              className="border border-gray-400 mb-5 py-3 px-8 rounded-full"
              type="tel"
              placeholder="+234 800 000 0000"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={formHandler}
              required={true}
            />
            <button className="py-3 px-8 bg-black text-white rounded-full mt-8">
              Join
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

const ThankYouMessage = () => {
  return (
    <div className="grid place-items-center h-screen w-screen ">
      <div className="w-5/6 max-w-5xl text-center mx-auto">
        <p className="lg:text-2xl ">
          🎉 Thank you for joining our waitlist! 🙌 We&apos;re excited to have
          you on board!
        </p>
        <Link
          href="https://forms.gle/2EVakvjgXAECY42d6"
          target="_blank"
          className="inline-block w-full text-blue-500 mt-8 text-sm lg:text-lg font-medium"
        >
          Help us serve you better! Kindly take our quick survey!
        </Link>
      </div>
    </div>
  );
};

const Sending = () => {
  return (
    <div className="grid place-items-center h-screen w-screen ">
      <div className="text-lg lg:text-2xl">
        <div className="flex w-fit mx-auto mb-2">
          <p>Joining waitlist</p>
        </div>
        <div className="loading-animation">
          <div className="inline-flex w-50px mx-auto">
            <p className="w-7 lg:w-8 shrink-0">🛍️</p>
            <p className="w-7 lg:w-8 shrink-0">🛒</p>
            <p className="w-7 lg:w-8 shrink-0">💳</p>
          </div>
        </div>
      </div>
    </div>
  );
};
