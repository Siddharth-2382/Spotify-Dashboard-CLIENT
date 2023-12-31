import React from "react";

function ExpandedTrackListHeader() {
  return (
    <>
      <div className="duration expanded_tracks_header">
        <span>#</span>
        <span>Track</span>
        <span>Album</span>
        <span>Release</span>
        <span>Duration</span>
      </div>
      <hr style={{ margin: "24px auto" }}></hr>
    </>
  );
}

export default ExpandedTrackListHeader;
