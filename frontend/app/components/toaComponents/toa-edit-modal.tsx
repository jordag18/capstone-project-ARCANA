import { useEffect, useState } from "react";
import { useProject } from '@/app/contexts/ProjectContext'
import { EditToa } from "./toa-interface";

interface editTOAProp {
    selectedToa: EditToa
    isModalOpen: boolean
    onClose: () => void
}

const editTOAModal: React.FC<editTOAProp> = ({
    editToa,
    isModalOpen,
    onClose
}) => {
    const { project } = useProject()
    const [formData, setFormData] = useState<EditToa>(editToa)
}