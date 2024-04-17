import { useEffect, useState } from "react";
import { useProject } from '@/app/contexts/ProjectContext'
import { EditToa } from "./toa-interface";

interface editTOAProp {
    selectedToa: EditToa
    isModalOpen: boolean
    onClose: () => void
}

const EditTOAModal: React.FC<editTOAProp> = ({
    selectedToa,
    isModalOpen,
    onClose
}) => {
    const { project } = useProject()
    const [formData, setFormData] = useState<EditToa>(selectedToa)

    return (
        <dialog id="create_toa_modal" className="modal" style={{ width: '80%', height: '80%' }}>
            <div className="modal-box">
                <form method="dialog">
                    <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2' onClick={onClose}>
                        X
                    </button>
                </form>
                <div className="flex flex-col space-y-2">
                    <h3 className="font-bold text-lg">Edit TOA</h3>
                </div>
            </div>
        </dialog>
    );
}

export default EditTOAModal;