import React from 'react'
import DeleteButton from './project-details-delete-button'
import { Project } from './project-interface';
import { useProject } from '@/app/contexts/ProjectContext';
import { useRouter } from 'next/navigation';

interface ProjectDetailsProps {
    selectedProject: Project;
}
const ProjectDetails:React.FC<ProjectDetailsProps> = ({selectedProject}) => {
    const { setProject } = useProject();
    const router = useRouter();

    const HandleOpenCLick = () => {
        setProject(selectedProject);
        router.push('/dashboard/eventMenu');
    }
    
    
    return (
    <details className="dropdown dropdown-left">
        <summary className="m-1 btn">Modify</summary>
        <ul className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-24">
            <li>
                <button onClick={HandleOpenCLick} className="btn bg-sky-500 text-white hover:bg-sky-600">
                    Open
                </button>
            </li>
            <li>
                <button className="btn bg-slate-500 text-white hover:bg-slate-600"> 
                    Edit {/* Needs Implementation*/}
                </button>
            </li>
            <li>
                <DeleteButton selectedProject={selectedProject} />
            </li>
        </ul>
    </details>
    )
}

export default ProjectDetails