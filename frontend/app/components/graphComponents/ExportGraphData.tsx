import React from "react";

const ExportGraphData = ({ nodes, edges, projectName }) => {
  const convertGraphToXML = (nodes, edges) => {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    let xmlContent = `<Graph projectName="${projectName}">`;

    xmlContent += "<Nodes>";
    nodes.forEach((node) => {
      xmlContent += `<Node id="${node.id}" type="${node.type}" positionX="${node.position.x}" positionY="${node.position.y}">`;
      xmlContent += `<Data>${JSON.stringify(node.data)}</Data>`;
      xmlContent += `</Node>`;
    });
    xmlContent += "</Nodes>";

    xmlContent += "<Edges>";
    edges.forEach((edge) => {
      xmlContent += `<Edge id="${edge.id}" source="${edge.source}" target="${edge.target}" type="${edge.type}" />`;
    });
    xmlContent += "</Edges>";

    xmlContent += "</Graph>";

    return xmlHeader + xmlContent;
  };

  const downloadBlob = (xmlData, filename) => {
    const blob = new Blob([xmlData], { type: "application/xml" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  };

  const handleExport = () => {
    const xmlData = convertGraphToXML(nodes, edges);
    downloadBlob(xmlData, `${projectName}-graph-data.xml`);
  };

  return (
    <button
      onClick={handleExport}
      className="text-white bg-red-500 hover:bg-grey-700 font-bold py-2 px-4 rounded">
      Export Graph Data
    </button>
  );
};

export default ExportGraphData;