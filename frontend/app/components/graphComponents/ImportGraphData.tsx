import React, { useState } from "react";

const ImportGraphModal = ({ onClose, onImport }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleImport = () => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const content = event.target.result;
        onImport(content); // Pass the file content up to the parent component
        onClose(); // Close the modal
      };
      reader.readAsText(selectedFile);
    } else {
      alert("No file selected!");
    }
  };

  return (
    <div
      className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
      id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Import Graph Data
          </h3>
          <div className="mt-2 px-7 py-3">
            <input type="file" onChange={handleFileChange} className="mb-3" />
            <button
              onClick={handleImport}
              className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded">
              Import
            </button>
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded shadow-md hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportGraphModal;
