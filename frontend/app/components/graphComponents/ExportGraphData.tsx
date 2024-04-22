import React from "react";

const ExportGraphData = ({ projectName }) => {
  const handleImport = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/getGraphData/${projectName}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch graph data");
      }
      const blob = await response.blob();
      downloadBlob(blob, `${projectName}-graph-data.xml`);
    } catch (error) {
      console.error("Error fetching graph data:", error);
      alert("Failed to import graph data: " + error.message);
    }
  };

  const downloadBlob = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a); // Append the element to the DOM to make it work in Firefox
    a.click();
    a.remove(); // After downloading remove the element
    window.URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleImport}
      className="text-white bg-blue-500 hover:bg-blue-700 font-bold py-2 px-4 rounded" // Ensure consistent styling
    >
      Export Graph Data
    </button>
  );
};

export default ExportGraphData;
