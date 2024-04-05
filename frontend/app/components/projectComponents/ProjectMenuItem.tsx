import React from 'react'
 //Not used currently
interface ProjectmenuProp {
    projectName: string;
    startDate?: string;
    endDate?: string;
    location: string;
    initials: string;

}

const ProjectMenuItem: React.FC<ProjectmenuProp> = ({projectName, startDate, endDate, location, initials}) => {
  return (
    <tr className="hover:bg-sky-200">
        <td>{projectName}</td>
        <td>{startDate}</td>
        <td>{endDate}</td>
        <td>{location}</td>
        <td>{initials}</td>
    </tr>
  )
}

export default ProjectMenuItem