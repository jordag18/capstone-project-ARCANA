import { useEffect, useState } from "react";
import { useProject } from "@/app/contexts/ProjectContext";
import { CreateToa } from "./toa-interface";
import axios from "axios";

interface createTOAProp {
  newToa: CreateToa;
  isModalOpen: boolean;
  onClose: () => void;
}

const CreateTOAModal: React.FC<createTOAProp> = ({
  newToa,
  isModalOpen,
  onClose,
}) => {
  const { project } = useProject();
  const [formData, setFormData] = useState<CreateToa>(newToa);
  const [image, setImage] = useState<string>();

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8000/api/project/${project.id}/create-toa`,
        formData
      );
      if (response.status === 200) {
        onClose();
      } else {
        throw new Error("Failed to create TOA item");
      }
    } catch (error) {
      console.error("Error creating TOA icon: ", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "target_host_list") {
      // Convert comma-separated string to a list of strings
      const targetHostList = value.split(",").map((item) => item.trim());
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: targetHostList,
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: name === "icon" ? value.replace(/^.*[\\\/]/, "") : value,
      }));
    }
  };

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      ///sets the form data
      setFormData((prevFormData) => ({
        ...prevFormData,
        imageName: file.name,
      }));
    }
  };

  useEffect(() => {
    const modal = document.getElementById("create_toa_modal");
    if (modal) {
      isModalOpen ? modal.showModal() : modal.close();
    }
  }, [isModalOpen]);

  return (
    <dialog
      id="create_toa_modal"
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
          <h3 className="font-bold text-lg">Create TOA</h3>
          <div className="flex flex-row space-x-2">
            <div className="flex-1 flex-col">
              <h2>Team</h2>
              <label className="input input-bordered flex items-center gap-2">
                <select
                  name="team"
                  onChange={handleChange}
                  style={{ width: "100%" }}>
                  <option value="none">None</option>
                  <option value="blue">Blue</option>
                  <option value="red">Red</option>
                  <option value="white">White</option>
                </select>
              </label>
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
          <div className="flex-col">
            <h2>Icon</h2>
            {image && <img alt="preview image" src={image} />}
            <input type="file" onChange={onImageChange} className="filetype" />
          </div>
          <div className="flex flex-row space-x-2 justify-end">
            <button
              className="btn bg-gray-300 shadow-md hover:bg-gray-200 ml-2"
              onClick={handleSubmit}>
              Create
            </button>
            <button
              className="btn bg-red-300 hover:bg-red-400 ml-2"
              onClick={onClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default CreateTOAModal;
