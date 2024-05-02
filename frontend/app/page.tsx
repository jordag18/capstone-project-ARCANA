import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectMenu from "./components/projectComponents/ProjectMenu";

export default function Home() {

  const [initialData, setInitialData] = useState('');
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInitialData(e.target.value);
  }

  const handleSubmit = () => {
    navigate('/dashboard/projectsMenu', { state: {initials: initialData}})
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
            value={initialData}
            onChange={handleChange}
          />
        </label>
        <button style={{marginTop: '1rem'}} className="btn bg-blue-500 text-white shadow-md hover:bg-blue-600">Submit</button>
      </div>
    </main>
  );
}
