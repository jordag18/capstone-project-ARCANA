'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { useProject } from '@/app/contexts/ProjectContext';
import CreateTOAModal from '@/app/components/toaComponents/toa-create-modal';
import { CreateToa, EditToa } from '@/app/components/toaComponents/toa-interface';

interface IconInfo {
    image: string;
    isDefault: boolean;
}

interface IconLibrary {
    [team: string]: {
        [iconName: string]: IconInfo;
    };
}

const IconLibrary = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newToa, setNewToa] = useState<CreateToa | null>(null);
    const [iconLibraries, setIconLibraries] = useState<IconLibrary>({});
    const [editFormData, setEditFormData] = useState<EditFormData>({ team: '', actionTitle: '', imageName: null, isDefault: false, oldTeam: '', oldActionTitle: '', oldImageName: null, oldIsDefault: null });
    const [showForm, setShowForm] = useState(false);
    const [editIcon, setEditIcon] = useState<{ team: string, iconName: string } | null>(null);
    const { project } = useProject();

    const fetchIconLibrary = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/project/${project.name}/icon-libraries`);
            setIconLibraries(response.data);
        } catch (error) {
            console.error('Failed to fetch icon libraries:', error);
        }
    };

    useEffect(() => {
        fetchIconLibrary();
    }, [project.name]);

    const handleCreateModal = (createToa: CreateToa) => {
        setNewToa(createToa);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileName = file.name;
            setEditFormData({ ...editFormData, imageName: fileName });
        }
    };
    // Sends both the old and new data
    const handleEditTOA = async () => {
        if (!editIcon) return;
        const requestData = { ...editFormData };
        try {
            const response = await axios.post(
                `http://localhost:8000/api/project/${project.name}/edit-toa`,
                requestData
            );
            if (response.status === 200) {
                fetchIconLibrary();
                setShowForm(false);
            } else {
                throw new Error("Failed to edit TOA icon");
            }
        } catch (error) {
            console.error("Error editing TOA icon:", error);
        }
    };
    
    // Sends the team and iconName(as in the action title)
    const handleDeleteIcon = async (team: string, iconName: string) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/project/${project.name}/delete-icon?team=${team}&iconName=${iconName}`
            );
            if (response.status === 200) {
                fetchIconLibrary();
            } else {
                throw new Error("Failed to delete icon");
            }
        } catch (error) {
            console.error("Error deleting icon:", error);
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "isDefault") {
            setEditFormData({ ...editFormData, isDefault: e.target.checked });
        } else {
            setEditFormData({ ...editFormData, [e.target.name]: e.target.value });
        }
    };

    return (
        <div>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{fontWeight: 'bold', marginLeft: '2rem'}}>TOA Icon Library</h1>
                <div onClick={handleCreateModal} style={{marginLeft: '2rem'}} className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2">+ Create TOA</div>
                <CreateTOAModal 
                    newToa={newToa}
                    isModalOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
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
                                    <button onClick={() => handleEditIcon(team, iconName)} className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2">Edit</button>
                                    <button onClick={() => handleDeleteIcon(team, iconName)} style={{marginLeft: '1rem'}} className='hover:font-bold'>Delete</button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
            
            {showForm && (
                <div>
                    <h2>{editIcon ? "Edit Icon" : "Create TOA Icon"}</h2>
                    <form onSubmit={editIcon ? handleEditTOA : handleCreateTOA}>
                        <div>
                            <label>Team:</label>
                            <input type="text" name="team" value={editFormData.team} onChange={handleFormChange} />
                        </div>
                        <div>
                            <label>Action Title:</label>
                            <input type="text" name="actionTitle" value={editFormData.actionTitle} onChange={handleFormChange} />
                        </div>
                        <Form.Group controlId="imageFile">
                            <Form.Label>Icon Image</Form.Label>
                            <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                        </Form.Group>
                        {editFormData.imageName && (
                            <img src={`/Icons/${editFormData.imageName}`} alt="Selected Image" style={{ marginTop: '10px', maxWidth: '100px' }} />
                        )}
                        <div>
                            <input type="checkbox" name="isDefault" checked={editFormData.isDefault} onChange={handleFormChange} />
                            <label>Set as Default</label>
                        </div>
                        <button type="submit">{editIcon ? "Update" : "Create"}</button>
                        <button type="button" onClick={() => setShowForm(false)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default IconLibrary;
