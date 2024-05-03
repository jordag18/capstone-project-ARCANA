'use client'
import { useState } from "react";
import axios from "axios";

export default function Home() {

  const [initials, setInitials] = useState('');
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitials(e.target.value);
  }

  const handleSubmit = async () => {
    if (initials.length != 2) {
      setMessage("Error: Initials must be 2 characters long.")
      return
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/api/setInitials/`,
        { initials }
      )
      setTimeout(() => {
        window.location.reload();
      }, 500);
      if (response.status == 200) {
        setMessage("Initials set successfully")
      }
    } catch (error) {
      setMessage("Error setting initials. Try again.")
    }
  }

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
            value={initials}
            onChange={handleChange}
          />
        </label>
        <button style={{marginTop: '1rem'}} onClick={handleSubmit} className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600">Submit</button>
        {message && <div style={{ marginTop: '1rem', fontWeight: 'bold', color: message.startsWith("Error") ? 'red' : 'green' }}>
            {message}
          </div>}
      </div>
    </main>
  );
}
