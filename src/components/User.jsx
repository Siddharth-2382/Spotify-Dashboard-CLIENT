import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Stats from "./Stats";
import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";
import Button from "./Button";
import anonymous from "./images/anonymous.png";

const profileStyle = {
  borderRadius: "50%",
  width: "150px",
};

function User() {
  const [user, setUser] = useState(null);
  const [followedArtists, setFollowedArtists] = useState(null);
  const [playlists, setPlaylists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const { user, followedArtists, playlists } = await getUserInfo();
      setUser(user);
      setFollowedArtists(followedArtists);
      setPlaylists(playlists);
    };
    catchErrors(fetchData());
  }, []);

  useEffect(() => {
    if (user && followedArtists && playlists) {
      setLoading(false);
    }
  }, [user, followedArtists, playlists]);

  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: "center", paddingTop: "32px" }}>
          <img
            style={profileStyle}
            src={user && user.images[0] ? user.images[0].url : anonymous}
            alt="user's profile"
          />
          <h1 className="username">{user && user.display_name}</h1>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "32px",
              margin: "32px auto",
            }}
          >
            <Stats
              statName={"Followers"}
              statCount={user && user.followers.total}
            />
            <Stats
              statName={"Following"}
              statCount={
                followedArtists && followedArtists.artists.items.length
              }
            />
            <Stats
              statName={"Playlist"}
              statCount={playlists && playlists.total}
            />
          </div>
          <Button buttonName={"Logout"} handleClick={logout} />
        </div>
      )}
    </>
  );
}

export default User;
