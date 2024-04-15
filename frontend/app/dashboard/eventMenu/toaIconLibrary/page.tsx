'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { AlignCenter } from 'react-bootstrap-icons';

interface IconInfo {
    image: string;
    isDefault: boolean;
}

interface IconLibrary {
    [team: string]: {
        [iconName: string]: IconInfo;
    };
}

interface EditFormData {
    team: string;
    actionTitle: string;
    imageName: string | null;
    isDefault: boolean;
    oldTeam: string; 
    oldActionTitle: string; 
    oldImageName: string | null; 
    oldIsDefault: boolean | null; 
}

const IconLibrary = () => {
    const [iconLibraries, setIconLibraries] = useState<IconLibrary>({});
    const [editFormData, setEditFormData] = useState<EditFormData>({ team: '', actionTitle: '', imageName: null, isDefault: false, oldTeam: '', oldActionTitle: '', oldImageName: null, oldIsDefault: null });
    const [showForm, setShowForm] = useState(false);
    const [editIcon, setEditIcon] = useState<{ team: string, iconName: string } | null>(null);
    const projectName = 'Tee'; // Hardcoded

    const fetchIconLibrary = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/api/project/${projectName}/icon-libraries`);
            setIconLibraries(response.data);
        } catch (error) {
            console.error('Failed to fetch icon libraries:', error);
        }
    };

    useEffect(() => {
        fetchIconLibrary();
    }, [projectName]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const fileName = file.name;
            setEditFormData({ ...editFormData, imageName: fileName });
        }
    };
    // Sends the data 
    const handleCreateTOA = async () => {
        const requestData = { team: editFormData.team, actionTitle: editFormData.actionTitle, imageName: editFormData.imageName };
        try {
            const response = await axios.post(
                `http://localhost:8000/api/project/${projectName}/create-toa`,
                requestData
            );
            if (response.status === 200) {
                fetchIconLibrary();
                setShowForm(false);
            } else {
                throw new Error("Failed to create TOA icon");
            }
        } catch (error) {
            console.error("Error creating TOA icon:", error);
        }
    };
    // Sends both the old and new data
    const handleEditTOA = async () => {
        if (!editIcon) return;
        const requestData = { ...editFormData };
        try {
            const response = await axios.post(
                `http://localhost:8000/api/project/${projectName}/edit-toa`,
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

    const handleEditIcon = (team: string, iconName: string) => {
        setEditIcon({ team, iconName });
        const iconInfo = iconLibraries[team][iconName];
        setEditFormData({ 
            team: team, 
            actionTitle: iconName, 
            imageName: iconInfo.image, 
            isDefault: iconInfo.isDefault, 
            oldTeam: team, 
            oldActionTitle: iconName, 
            oldImageName: iconInfo.image, 
            oldIsDefault: iconInfo.isDefault 
        });
        setShowForm(true);
    };
    // Sends the team and iconName(as in the action title)
    const handleDeleteIcon = async (team: string, iconName: string) => {
        try {
            const response = await axios.delete(
                `http://localhost:8000/api/project/${projectName}/delete-icon?team=${team}&iconName=${iconName}`
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
            {Object.entries(iconLibraries).map(([team, icons]) => (
                <div key={team}>
                    <h2 style={{ fontWeight: 'bold' }}>{team} Team Icons</h2>
                    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                        {Object.entries(icons).map(([iconName, iconInfo]) => (
                            <div key={iconName} style={{ marginRight: '20px', marginBottom: '20px' }}>
                                <img src={`/Icons/${iconInfo.image}`} alt={iconName} style={{ width: '100px', height: '100px' }} />
                                <p>{iconName}</p>
                                {iconInfo.isDefault && <p style={{ color: 'gray', fontSize: '12px' }}>default</p>}
                                <button onClick={() => handleEditIcon(team, iconName)}>Edit</button>
                                <button onClick={() => handleDeleteIcon(team, iconName)}>Delete</button>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
            
            <div style={{display: 'flex', alignItems: 'center'}}>
                <h1 style={{fontWeight: 'bold', marginLeft: '2rem'}}>TOA Icon Library</h1>
                <button onClick={() => setShowForm(true)} style={{marginLeft: '2rem'}} className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2">+ Create TOA</button>
            </div>
            <div style={{marginTop: '2rem'}}>
                <h2 style={{marginLeft: '4rem'}}>Red Team TOA Icons</h2>
                <hr style={{marginLeft: '4rem', height: '2px', width: '90%', color: 'black', backgroundColor: 'black'}}/>
                {Object.entries(iconLibraries).map(([team, icons]) => (
                    <div key={"red"}>
                    </div>
                ))}
                <h2 style={{marginLeft: '4rem', marginTop: '2rem'}}>Blue Team TOA Icons</h2>
                <hr style={{marginLeft: '4rem', height: '2px', width: '90%', color: 'black', backgroundColor: 'black'}}/>
                <h2 style={{marginLeft: '4rem', marginTop: '2rem'}}>White Team TOA Icons</h2>
                <hr style={{marginLeft: '4rem', height: '2px', width: '90%', color: 'black', backgroundColor: 'black'}}/>
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
