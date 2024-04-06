import React from 'react'
import { useProject } from '@/app/contexts/ProjectContext';
import { useRouter } from 'next/navigation';
import DeleteButton from '../projectComponents/project-details-delete-button';

const EventModifyButton = () => {
    const {project, setProject } = useProject();
    const router = useRouter();

    const HandleOpenCLick = () => {
    }
    
    
    return (
    <details className="dropdown dropdown-left">
        <summary className="m-1 btn bg-gray-400 shadow-lg hover:bg-gray-300 text-white">Modify</summary>
        <ul className="dropdown-content z-[1] menu p-2 bg-base-200 rounded-box w-24">
            <li>
                <button className="btn bg-gray-400 text-white hover:bg-gray-300"> 
                    Edit {/* Needs Implementation*/}
                </button>
            </li>
            <li>
                <DeleteButton selectedProject={project} />
            </li>
        </ul>
    </details>
    )
}

export default EventModifyButton