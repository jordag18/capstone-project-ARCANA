import { useState, useEffect } from 'react'
import { useProject } from '@/app/contexts/ProjectContext'
import { CreateEvent } from './event-interface'

interface createEventProp {
    newEvent: CreateEvent
    isModalOpen: boolean
    onClose: () => void
}

const CreateEventModal: React.FC<createEventProp> = ({
    newEvent,
    isModalOpen,
    onClose
}) => {
    const { project } = useProject()
    const [formData, setFormData] = useState<CreateEvent>(newEvent)

    const handleSubmit = async () => {
        console.log("Create Event",formData,"body",JSON.stringify(formData))
        try {
            const response = await fetch(`http://localhost:8000/api/createEvent/${project.name}`, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            if (!response.ok) {
                throw new Error('Failed to create event')
            }

            onClose
        } catch (error) {
            console.error("Error creating event: ", error)
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value
        }))
    };

    useEffect(() => {
        const modal = document.getElementById("create_event_modal")
        if (modal) {
            modal.showModal()
        } else {
            modal.close()
        }
    }, [isModalOpen]);

    return (
        <dialog id='create_event_modal' className='modal'>
        <div className='modal-box'>
            <form method='dialog'>
                <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={onClose}>
                    X
                </button>
            </form>
            <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">Create Event</h3>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 flex-col">
              <div className="flex-col">
                <h2>Action Title</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="action_title"
                    className="grow"
                    placeholder="Action Title"
                    value={formData?.action_title}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Initials</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="initials"
                    className="grow"
                    placeholder="Initials"
                    value={formData?.initials}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Team</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="Team"
                    className="grow"
                    value={formData?.team}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Vector ID</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="vector_id"
                    className="grow"
                    placeholder="Vector ID"
                    value={formData?.vector_id}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Location</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="location"
                    className="grow"
                    value={formData?.location}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
            <div className="flex-1 flex-col">
              <div className="flex-col">
                <h2>Source Host</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="source_host"
                    className="grow"
                    value={formData?.source_host}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Target Host</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="target_host_list"
                    className="grow"
                    value={formData?.target_host_list}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Data Source</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="data_source"
                    className="grow"
                    placeholder="Data Source"
                    value={formData?.data_source}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Posture</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="text"
                    name="posture"
                    className="grow"
                    value={formData?.posture}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className="flex-col">
                <h2>Timestamp</h2>
                <label className="input input-bordered flex items-center gap-2">
                  <input
                    type="datetime-local"
                    name="timestamp"
                    className="grow"
                    value={formData?.timestamp}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>
          </div>
            <div>
                <button className='btn' onClick={handleSubmit}>
                    Create Event
                </button>
            </div>
            </div>
            </div>
        </dialog>
    );
};

export default CreateEventModal;