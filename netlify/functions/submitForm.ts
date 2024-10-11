import type { Context } from "@netlify/functions";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrDZkWL7iDGlPTckR05S9zqPtgctcYl9E",
  authDomain: "agora-wailist.firebaseapp.com",
  projectId: "agora-wailist",
  storageBucket: "agora-wailist.appspot.com",
  messagingSenderId: "500248669401",
  appId: "1:500248669401:web:70445d196c0d284b05e2c8",
  measurementId: "G-DQGL7ZQMTV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
}

export default async (req: Request, context: Context) => {
  if (req.method !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: "Method Not Allowed" }),
    };
  }

  try {
    const requestText = await req.text();
    const body: FormData = JSON.parse(requestText || "");

    const { name, email, phoneNumber } = body;

    // Turn phoneNumber from +234 900 000 0000 to 09000000000 format
    const sanitizedPhoneNumber = phoneNumber
      .replace("+234", "0")
      .replaceAll(" ", "");

    console.log(name, email, sanitizedPhoneNumber);

    // Add the form details to the "waitlist" collection
    await addDoc(collection(db, "waitlist"), {
      name: name,
      email: email,
      phoneNumber: sanitizedPhoneNumber,
      timestamp: new Date(), // Optionally store the submission time
    });

    return new Response(
      JSON.stringify({
        statusCode: 200,
        body: JSON.stringify({ message: "Form submitted successfully" }),
      })
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        statusCode: 500,
        body: JSON.stringify({ error: "Internal Server Error" }),
      })
    );
  }
};
