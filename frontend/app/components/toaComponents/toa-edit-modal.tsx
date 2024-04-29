import { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { EditToa } from "./toa-interface";
import axios from "axios";

interface editTOAProp {
  selectedToa: EditToa;
  isModalOpen: boolean;
  onClose: () => void;
}

const EditTOAModal: React.FC<editTOAProp> = ({
  selectedToa,
  isModalOpen,
  onClose,
}) => {
  const { project } = useProject();
  const [formData, setFormData] = useState<EditToa>(selectedToa);
  console.log(formData);

  // Sends both the old and new data
  const handleSubmit = async () => {
    if (!formData) return;
    try {
      console.log("pew ", formData);
      const response = await axios.post(
        `http://localhost:8000/api/project/${project.id}/edit-toa`,
        formData
      );
      if (response.status === 200) {
      } else {
        throw new Error("Failed to edit TOA icon");
      }
    } catch (error) {
      console.error("Error editing TOA icon:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "icon") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "icon" ? value.replace(/^.*[\\\/]/, "") : value,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  useEffect(() => {
    const modal = document.getElementById("edit_toa_modal");
    if (modal) {
      isModalOpen ? modal.showModal() : modal.close();
    }
  }, [isModalOpen]);

  return (
    <dialog
      id="edit_toa_modal"
      className="modal"
      style={{ width: "80%", height: "80%" }}>
      <div className="modal-box">
        <form method="dialog">
          <button
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            onClick={onClose}>
            X
          </button>
        </form>
        <div className="flex flex-col space-y-2">
          <h3 className="font-bold text-lg">Edit TOA</h3>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 flex-col">
              <h2>Team</h2>
              <select
                name="team"
                onChange={handleChange}
                style={{ width: "100%" }}>
                <option value="none">None</option>
                <option value="blue">Blue</option>
                <option value="red">Red</option>
                <option value="white">White</option>
              </select>
            </div>
            <div className="flex-col">
              <h2>Action Title</h2>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  name="actionTitle"
                  className="grow"
                  placeholder="Action Title"
                  value={formData?.actionTitle}
                  onChange={handleChange}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="flex-col">
          <h2>Icon</h2>
        </div>
        <div>
          <input type="checkbox" name="isDefault" onChange={handleChange} />
          <label>Set as Default</label>
        </div>
        <div className="flex flex-row space-x-2 justify-end">
          <button
            className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
            onClick={handleSubmit}>
            Submit
          </button>
          <button
            className="btn bg-red-300 hover:bg-red-400 ml-2"
            onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </dialog>
  );
};

export default EditTOAModal;
