import { useState } from 'react'

const CreateEventModal = () => {
    const [id, setId] = useState('')
    const [action_title, setAction_Title] = useState('')
    const [data_source, setData_Source] = useState('')
    const [description, setDescription] = useState('')
    const [icon, setIcon] = useState('')
    const [initials, setInitials] = useState('')
    const [is_malformed, setIs_Malformed] = useState(false)
    const [last_modified, setLast_Modified] = useState('')
    const [location, setLocation] = useState('')
    const [posture, setPosture] = useState('')
    const [source_host, setSource_Host] = useState('')
    const [target_host_list, setTarget_Host_List] = useState('')
    const [team, setTeam] = useState('')
    const [timestamp, setTimestamp] = useState('')
    const [vector_id, setVector_Id] = useState('')

    const handleSubmit = async () => {
        const eventData = {
            id: id,
            action_title: action_title,
            data_source: data_source,
            description: description,
            icon: icon,
            initials: initials,
            is_malformed: is_malformed,
            last_modified: last_modified,
            location: location,
            posture: posture,
            source_host: source_host,
            target_host_list: target_host_list,
            team: team,
            timestamp: timestamp,
            vector_id: vector_id
        }

        try {
            console.log('Sending event data: ', eventData)
            const response = await fetch("http://localhost:8000/api/project/events", {
                method: "POST",
                headers: {
                    
                },
                body: JSON.stringify(eventData)
            })

            if (!response.ok) {
                throw new Error('Failed to create event')
            }

        } catch (error) {
            console.error("Error creating event: ", error)
            alert("Error creating event: ", error.message)
        }
    }

    return (
        <>
            <div
                className="btn bg-gray-300 shadow-md hover:bg-gray-200"
                onClick={() => document.getElementById("create_event_modal").showModal()}    
            >
                + Create Event
            </div>
            <dialog id='create_event_modal' className='modal'>
                <div className='modal-box'>
                    <form method='dialog'>
                        <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
                            X
                        </button>
                    </form>
                    <div className="flex flex-col space-y-4">
                        <h3 className="font-bold text-lg">Create Event</h3>
                        <label className='flex items-center gap-2'>Action Title</label>
                        <select
                            name="action-titles" 
                            id="action-titles"   
                            onChange={(e) => setAction_Title(e.target.value)}
                        >
                            <option value="Blue Team Activity">Blue Team Activity</option>
                            <option value="Red Team Activity">Red Team Activity</option>
                        </select>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Initials"
                                value={initials}
                                onChange={(e) => setInitials(e.target.value.toUpperCase)}
                            />
                        </label>
                        <label className='flex items-center gap-2'>Team</label>
                        <select 
                            name="action-titles" 
                            id="action-titles"
                            onChange={(e) => setTeam(e.target.value)}
                            value={team}
                        >
                            <option value="Blue Team Activity">Blue</option>
                            <option value="Red Team Activity">Red</option>
                        </select>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Vector ID"
                                value={vector_id}
                                onChange={(e) => setVector_Id(e.target.value.toUpperCase)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </label>
                        <label className="textarea textarea-bordered flex items-center gap-2">
                            <textarea
                                placeholder='Description'
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Source Host"
                                value={source_host}
                                onChange={(e) => setSource_Host(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Target Host"
                                value={target_host_list}
                                onChange={(e) => setTarget_Host_List(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Data Source"
                                value={data_source}
                                onChange={(e) => setData_Source(e.target.value)}
                            />
                        </label>
                        <label className="input input-bordered flex items-center gap-2">
                            <input
                                type="text"
                                className="grow"
                                placeholder="Posture"
                                value={posture}
                                onChange={(e) => setPosture(e.target.value)}
                            />
                        </label>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default CreateEventModal;