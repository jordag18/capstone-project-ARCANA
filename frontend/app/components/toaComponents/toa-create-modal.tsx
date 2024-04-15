import { useEffect, useState  } from "react";
import { useProject } from "@/app/contexts/ProjectContext";

interface createTOAProp {
    isModalOpen: boolean
    onClose: () => void
}

const CreateTOAModal: React.FC<createTOAProp> = ({
    isModalOpen,
    onClose
}) => {
    const { project } = useProject()
    const [formData, setFormData] = useState<CreateTOA[]>()

    const handleSubmit = async () => {
        console.log("Create TOA", formData, "body", JSON.stringify(formData))
    }
}