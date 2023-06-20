import React from "react";
import User from "./User";
import TopOfAllTime from "./TopOfAllTime";

function Profile() {
  return (
    <div className="content">
      <User />
      <TopOfAllTime />
    </div>
  );
}

export default Profile;
