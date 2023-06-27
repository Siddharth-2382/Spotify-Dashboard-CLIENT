import React from "react";

function ExpandedTrackListHeader() {
  return (
    <>
      <div className="duration expanded_tracks_header">
        <span>#</span>
        <span>Track title</span>
        <span style={{ paddingLeft: "16px" }}>Album name</span>
        <span>Release date</span>
        <span>Duration</span>
      </div>
      <hr style={{ margin: "24px auto" }}></hr>
    </>
  );
}

export default ExpandedTrackListHeader;
