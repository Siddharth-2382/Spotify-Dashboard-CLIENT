import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function Search() {
  const inputRef = useRef();

  const searchClick = () => {
    inputRef.current.focus();
  };

  return (
    <div className="content">
      <div className="search_box">
        <div className="search_container" onClick={searchClick}>
          <span>
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </span>
          <input
            ref={inputRef}
            className="search_field"
            placeholder="what do you want to listen to?"
            autoFocus
          />
        </div>
        <h2>Browse all</h2>
      </div>
    </div>
  );
}

export default Search;
