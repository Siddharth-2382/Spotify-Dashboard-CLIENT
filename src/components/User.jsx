import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";
import Stats from "./Stats";
import { getUserInfo, logout } from "../spotify";
import { catchErrors } from "../utils";
import Button from "./Button";

const profileStyle = {
  borderRadius: "50%",
  width: "150px",
};

const usernameStyle = {
  margin: "auto",
  width: "fit-content",
  fontSize: "55px",
  fontWeight: "800",
  color: "#ffffff",
  transition: "all 0.25s cubic-bezier(0.3, 0, 0.4, 1)",
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
  const [isHeadingHovered, setIsHeadingHovered] = useState(false);

  const handleHeadingMouseOver = () => {
    setIsHeadingHovered(true);
  };

  const handleHeadingMouseOut = () => {
    setIsHeadingHovered(false);
  };

  const headingStyleWithHover = {
    ...usernameStyle,
    color: isHeadingHovered ? "#1ED760" : usernameStyle.color,
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div style={{ textAlign: "center", paddingTop: "50px" }}>
          <img
            style={profileStyle}
            src={user && user.images[0].url}
            alt="user's profile"
          />
          <h1
            style={isHeadingHovered ? headingStyleWithHover : usernameStyle}
            onMouseOver={handleHeadingMouseOver}
            onMouseOut={handleHeadingMouseOut}
          >
            {user && user.display_name}
          </h1>
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
