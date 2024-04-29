'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useProject } from '@/app/contexts/ProjectContext';
import CreateTOAModal from '@/app/components/toaComponents/toa-create-modal';
import { CreateToa, EditToa } from '@/app/components/toaComponents/toa-interface';
import EditTOAModal from '@/app/components/toaComponents/toa-edit-modal';
import { count } from 'console';

interface IconInfo {
    image: string;
    isDefault: boolean;
}

interface IconLibrary {
    [team: string]: {
        [iconName: string]: IconInfo;
    };
}

interface IconCounts {
    [key: string]: number
}

const IconLibrary = () => {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [newToa, setNewToa] = useState<CreateToa>();
    const [selectedToa, setSelectedToa] = useState<EditToa>();
    const [iconLibraries, setIconLibraries] = useState<IconLibrary>({});
    const { project } = useProject();

    const fetchIconLibrary = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/project/${project.id}/icon-libraries`);
            setIconLibraries(response.data);
        } catch (error) {
            console.error('Failed to fetch icon libraries:', error);
        }
    };

    useEffect(() => {
        fetchIconLibrary();
    }, [project.id]);

    const handleCreateModal = (createToa: CreateToa) => {
        setNewToa(createToa);
        setIsCreateModalOpen(true);
    };

    const handleEditModal = (team: string, iconName: string) => {
        const iconInfo = iconLibraries[team][iconName];
        const editToa: EditToa = {
            team,
            actionTitle: iconName,
            imageName: iconInfo.image, 
            isDefault: iconInfo.isDefault,
            oldTeam: team,
            oldActionTitle: iconName,
            oldImageName: iconInfo.image,
            oldIsDefault: iconInfo.isDefault
        };
        setSelectedToa(editToa)
        setIsEditModalOpen(true);
    }

    const handleCloseModal = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
    };

    const countDefaults = (team: string) => {
        const icons = iconLibraries[team]
        if (!icons) {
            return 0;
        }

        const defaultCount = Object.values(icons).filter(icon => icon.isDefault).length
        return defaultCount
    }
    
    // Sends the team and iconName(as in the action title)
    const handleDeleteIcon = async (team: string, iconName: string) => {
        try {
            // Fetch the current icon library to check for default status and counts
            const responseFetch = await axios.get(`http://localhost:8000/api/project/${project.id}/icon-libraries`);
            const iconLibrary = responseFetch.data[team] || {};
            
            // Check if the icon to be deleted is default and count other icons
            const isDefault = iconLibrary[iconName]?.isDefault;
            const otherIcons = Object.entries(iconLibrary).filter(([key, value]) => key !== iconName);
            const defaultCount = otherIcons.filter(([key, value]) => value.isDefault).length;
    
            // Condition to prevent deletion if it's the default icon and no other defaults are available
            if (isDefault && defaultCount < 1) {
                alert('This is the default icon and no other default icons are available. Please set another icon as default before deleting this one.');
                return;
            }
    
            // Proceed with deletion if it's not default or other defaults are available
            const responseDelete = await axios.delete(
                `http://localhost:8000/api/project/${project.id}/delete-icon?team=${team}&iconName=${iconName}`
            );
            if (responseDelete.status === 200) {
                fetchIconLibrary();
                console.log('Icon deleted successfully');
            } else {
                throw new Error("Failed to delete icon");
            }
        } catch (error) {
            console.error("Error deleting icon:", error);
        }
    };

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{fontWeight: 'bold', marginLeft: '2rem'}}>TOA Icon Library</h1>
                <button onClick={() => handleCreateModal(newToa || {})} style={{marginLeft: '2rem'}} className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2">+ Create TOA</button>
                <button onClick={fetchIconLibrary} style={{marginLeft: '1rem'}} className="btn bg-blue-300 shadow-md hover:bg-gray-200 ml-2">Reload</button>
                {isCreateModalOpen && <CreateTOAModal 
                    newToa={newToa}
                    isModalOpen={isCreateModalOpen}
                    onClose={handleCloseModal}
                />}
            </div>
            <div style={{marginTop: '2rem'}}>
                {Object.entries(iconLibraries).map(([team, icons]) => (
                    <div key={team}>
                        <h2 style={{marginLeft: '4rem'}}>{team} Team TOA Icons</h2>
                        <hr style={{marginLeft: '4rem', height: '2px', width: '90%', color: 'black', backgroundColor: 'black'}}/>
                        <div style={{display: 'flex', alignItems: 'center', marginLeft: '5rem'}}>
                            {Object.entries(icons).map(([iconName, iconInfo]) => (
                                <div key={iconName} style={{ marginRight: '20px', marginBottom: '20px'}}>
                                    <img src={`/Icons/${iconInfo.image}`} alt={iconName} style={{ width: '100px', height: '100px'}}/>
                                    <p>{iconName}</p>
                                    {iconInfo.isDefault && <p style={{ color: 'gray', fontSize: '12px'}}> default</p>}
                                    <button onClick={() => handleEditModal(team, iconName)} className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2">Edit</button>
                                    {isEditModalOpen && <EditTOAModal 
                                        selectedToa= {selectedToa}
                                        isModalOpen={isEditModalOpen}
                                        onCLose={handleCloseModal}
                                    />}
                                    <button onClick={() => handleDeleteIcon(team, iconName)} style={{marginLeft: '1rem'}} className='hover:font-bold'>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default IconLibrary;
