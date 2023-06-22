import React, { useRef, useEffect, useState } from "react";
import CardArray from "./CardArray";
import { getSearchResults } from "../spotify";
import { catchErrors } from "../utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const inputRef = useRef();

  const searchClick = () => {
    inputRef.current.focus();
  };

  function handleSearch(event) {
    const q = encodeURIComponent(event.target.value);
    async function fetchSearch() {
      const {
        data: {
          albums,
          artists,
          audiobooks,
          episodes,
          playlists,
          shows,
          tracks,
        },
      } = await getSearchResults(q);
    }
    catchErrors(fetchSearch());
  }

  return (
    <div className="content">
      <div className="search_box">
        <div className="search_container" onClick={searchClick}>
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            onChange={handleSearch}
            ref={inputRef}
            className="search_field"
            placeholder="what do you want to listen to?"
            autoFocus
          />
        </div>
      </div>
      <div className="search_content">
        <h2>Browse all</h2>
        <CardArray arrayName={"Albums"} cardType={"profile"} />
      </div>
    </div>
  );
}

export default Search;
