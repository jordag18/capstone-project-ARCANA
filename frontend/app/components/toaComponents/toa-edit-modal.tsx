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

        </dialog>
    );
}

export default EditTOAModal;