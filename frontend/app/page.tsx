import React from "react";
import { useRouter } from "next/navigation";
import { Footer } from "./components/footer";
import StartUpPrompt from "./components/startup-prompt";
import NavBar from "./components/navbar";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 style={{fontSize: '2rem', fontWeight: 'bold', textDecoration: 'underline'}}>Welcome to ARCANA</h1>
      <div className="flex-col">
        <h1 style={{marginTop: '2rem', fontWeight: 'bold'}}>Initials</h1>
        <label style={{marginTop: '.5rem'}} className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            name="initials"
            className="grow"
            placeholder="AA"
          />
        </label>
        <button style={{marginTop: '1rem'}} className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600">Submit</button>
      </div>
    </main>
  );
}
