import React from "react";
import IngestLogModal from "../IngestLogModal";
//Not currently used

const ProjectForm = () => {
  return (
    <form method="dialog">
      <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
        ✕
      </button>
      <div className="flex flex-col space-y-4">
        <h3 className="font-bold text-lg">Create Project</h3>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="grow"
            placeholder="Location"
            value={projectLocation}
            onChange={(e) => setProjectLocation(e.target.value)}
          />
        </label>
        <div className="mb-3 d-flex space-y-4">
          <label className="input input-bordered flex items-center gap-2">
            Start Date
            <input
              type="datetime-local"
              className="form-control"
              value={dateStart}
              onChange={(e) => setDateStart(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            End Date
            <input
              type="datetime-local"
              className="form-control"
              value={dateEnd}
              onChange={(e) => setDateEnd(e.target.value)}
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <input
              type="text"
              className="grow"
              placeholder="Initials"
              value={initials}
              onChange={(e) => setInitials(e.target.value)}
            />
          </label>
        </div>
      </div>
      <div className="mb-3 d-flex space-y-4 space-x-2">
        <IngestLogModal
          setProjectLocation={setProjectLocation}
          setStartDate={setDateStart}
          setEndDate={setDateEnd}
        />
        <button
          className="btn"
          onClick={() => {
            handleSubmit();
            document.getElementById("my_modal_3").close();
          }}>
          Create Project
        </button>
      </div>
    </form>
  );
};

export default ProjectForm;
