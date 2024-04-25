import React, { useState } from "react";

const FilterEventsDialog = ({ isOpen, onClose, onUpdateCriteria }) => {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [initials, setInitials] = useState("");
  const [team, setTeam] = useState("");
  const [location, setLocation] = useState("");
  const [vectorId, setVectorId] = useState("");
  const [id, setID] = useState("");
  const [sourceHost, setSourceHost] = useState("0.0.0.0");
  const [targetHost, setTargetHost] = useState("0.0.0.0");

  const handleClear = () => {
    setStartDate("");
    setStartTime("");
    setEndDate("");
    setEndTime("");
    setInitials("");
    setTeam("");
    setLocation("");
    setVectorId("");
    setSourceHost("0.0.0.0");
    setTargetHost("0.0.0.0");
    setID("");
  };

  const handleFilter = (e) => {
    e.preventDefault();
    const criteria = {
      startDate,
      startTime,
      endDate,
      endTime,
      initials,
      team,
      location,
      vectorId,
      sourceHost,
      targetHost,
      id,
    };
    onUpdateCriteria(criteria); // Use it directly
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <dialog open={isOpen} className="modal" id="filter_events_dialog">
        <div className="modal-box">
          <form onSubmit={handleFilter}>
            <button
              className="btn btn-sm btn-circle absolute right-2 top-2"
              onClick={onClose}>
              X
            </button>
            <h3 className="font-bold text-lg">Filter Events</h3>

            {/* Input fields */}
            <div className="flex flex-wrap gap-4">
              <div className="flex-1">
                <label className="label" htmlFor="start-date">
                  <span className="label-text">Start Date</span>
                </label>
                <input
                  id="start-date"
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="input input-bordered w-full"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <label className="label" htmlFor="start-time">
                  <span className="label-text">Start Time</span>
                </label>
                <input
                  id="start-time"
                  type="text"
                  placeholder="hh:mm"
                  className="input input-bordered w-full"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">End Date</span>
                </label>
                <input
                  type="text"
                  placeholder="mm/dd/yyyy"
                  className="input input-bordered"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">End Time</span>
                </label>
                <input
                  type="text"
                  placeholder="hh:mm"
                  className="input input-bordered"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Initials</span>
              </label>
              <input
                type="text"
                placeholder="III"
                className="input input-bordered"
                value={initials}
                onChange={(e) => setInitials(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Team</span>
              </label>
              <select
                className="select select-bordered"
                value={team}
                onChange={(e) => setTeam(e.target.value)}>
                <option>All</option>
                <option>Red</option>
                <option>Blue</option>
                <option>White</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Location</span>
              </label>
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Vector ID</span>
              </label>
              <input
                type="text"
                placeholder="Vector ID"
                className="input input-bordered"
                value={vectorId}
                onChange={(e) => setVectorId(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Event ID</span>
              </label>
              <input
                type="text"
                placeholder="Event ID"
                className="input input-bordered"
                value={id}
                onChange={(e) => setID(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Source Host</span>
              </label>
              <input
                type="text"
                placeholder="0.0.0.0"
                className="input input-bordered"
                value={sourceHost}
                onChange={(e) => setSourceHost(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Target Host</span>
              </label>
              <input
                type="text"
                placeholder="0.0.0.0"
                className="input input-bordered"
                value={targetHost}
                onChange={(e) => setTargetHost(e.target.value)}
              />
            </div>

            <div className="modal-action">
              <button
                className="btn bg-gray-300 shadow-md hover:bg-gray-200"
                onClick={handleClear}>
                Clear
              </button>
              <button
                className="btn bg-gray-300 shadow-md hover:bg-gray-200"
                type="submit">
                Filter
              </button>
            </div>
          </form>
        </div>
      </dialog>
      <div
        className={`backdrop ${isOpen ? "flex" : "hidden"}`}
        onClick={onClose}></div>
    </>
  );
};

export default FilterEventsDialog;
