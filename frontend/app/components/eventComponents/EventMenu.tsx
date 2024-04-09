"use client";
import { useProject } from "@/app/contexts/ProjectContext";
import EventModifyButton from "./modify-event-button";
import CSS from 'csstype';
import { FlagFill } from "react-bootstrap-icons";
import { Image } from "react-bootstrap";

const thStyles: CSS.Properties = {
  backgroundColor: '#3f3f3f',
  color: 'white',
  borderBottom: '2px solid #000',
  borderColor: "#000",
  textAlign: "center"
};

const tdStyle: CSS.Properties = {
  border: "2px solid #ccc",
  textAlign: "left",
}

const EventMenu = () => {
  const { project, setProject } = useProject();

  return (
    <div className="flex overflow-auto rounded-lg">
      <table className="table w-full">
        {/* head */}
        <thead className="bg-base-200 border-b-2 border-slate-500">
          <tr>
            <th style={thStyles}>Malformed</th>
            <th style={thStyles}>Timestamp</th>
            <th style={thStyles}>Initials</th>
            <th style={thStyles}>Team</th>
            <th style={thStyles}>Posture</th>
            <th style={thStyles}>Description</th>
            <th style={thStyles}>Location</th>
            <th style={thStyles}>Source Host</th>
            <th style={thStyles}>Target Host List</th>

            <th style={thStyles}>Data Source</th>
            <th style={thStyles}>Icon</th>
            <th style={thStyles}>Action Title</th>
            <th style={thStyles}>Vector ID</th>
            <th style={thStyles}>Last Modified</th>
            <th style={thStyles}></th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {project?.events.map((event, index) => (
            <tr key={index} className="hover:bg-slate-200 ">
              {/* Each <td> is a cell for the project's attribute */}
              <td style={tdStyle}>
                {event.is_malformed ? <FlagFill size={35} style={{ color: "blue" }} /> : ""}</td>
              <td style={tdStyle}>{event.timestamp ? new Date(event.timestamp).toLocaleString() : "N/A"}</td>
              <td style={tdStyle}>{event.initials}</td>
              <td style={tdStyle}>{event.team}</td>
              <td style={tdStyle}>{event.posture}</td>
              <td style={tdStyle}>{event.description}</td>
              <td style={tdStyle}>{event.location}</td>
              <td style={tdStyle}>{event.source_host}</td>
              <td style={tdStyle}>{event.target_host_list?.join(", ")}</td>
              <td style={tdStyle}>{event.data_source}</td>
              <td>
                <Image
                  className="p-0"
                  src={event.icon}
                  width={"auto"}
                  height={"auto"}
                  alt={event.action_title}
                ></Image>{" "}
              </td>
              <td style={tdStyle}>{event.action_title}</td>
              <td style={tdStyle}>{event.vector_id}</td>
              <td style={tdStyle}>{new Date(event.last_modified).toLocaleString()}</td>
              <td> <EventModifyButton /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventMenu;
