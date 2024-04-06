"use client";
import { useProject } from "@/app/contexts/ProjectContext";
import EventModifyButton from "./modify-event-button";

const EventMenu = () => {
  const { project, setProject } = useProject();

  return (
    <div className="flex overflow-auto rounded-lg">
      <table className="table w-full">
        {/* head */}
        <thead className="bg-base-200 border-b-2 border-slate-500">
          <tr>
            <th>ID</th> {/* Add ID column */}
            <th>Icon</th>
            <th>Action Title</th>
            <th>Initials</th>
            <th>Team</th>
            <th>Vector ID</th>
            <th>Location</th>
            <th>Description</th>
            <th>Source Host</th>
            <th>Target Host List</th>
            <th>Data Source</th>
            <th>Posture</th>
            <th>Timestamp</th>
            <th>Malformed</th>
            <th>Last Modified</th>
            <th></th>
          </tr>
        </thead>
        <tbody className="bg-base-200">
          {project?.events.map((event, index) => (
            <tr key={index} className="hover:bg-slate-200 ">
              {/* Each <td> is a cell for the project's attribute */}
              <td>{event.id}</td>
              <td>{event.icon}</td>
              <td>{event.action_title}</td>
              <td>{event.initials}</td>
              <td>{event.team}</td>
              <td>{event.vector_id}</td>
              <td>{event.location}</td>
              <td>{event.description}</td>
              <td>{event.source_host}</td>
              <td>{event.target_host_list}</td>
              <td>{event.data_source}</td>
              <td>{event.posture}</td>
              <td>{event.timestamp}</td>
              <td>{event.is_malformed}</td>
              <td>{event.last_modified}</td>
              <td> <EventModifyButton /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EventMenu;
