import React, { useState, useRef } from "react";
import Svg from "../Svg";
import { PuffLoader } from "react-spinners";
import "./searchBar.scss";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const searchBarRef = useRef<HTMLInputElement>(null);

  const clearSearchBar = () => {
    setSearchQuery("");
    // if (searchBarRef.current !== null) {
    searchBarRef.current?.focus();
    // }
  };

  const handleKeyEvents = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Escape") {
      searchBarRef.current?.blur();
    }
  };

  const startSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="search-bar-wrapper">
      <form
        className="search-bar"
        onKeyDown={handleKeyEvents}
        onSubmit={startSearch}
      >
        <Svg customClass={"search-bar__icon"} icon={"search"} />
        <input
          ref={searchBarRef}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-bar__input"
          type="search"
          name="searchQuery"
          id="searchQuery"
          placeholder="Search..."
        />
        {/* <PuffLoader loading={true} color={"#ff3636"} size={24} /> */}
        {searchQuery.length > 0 && (
          <Svg
            customClass={"search-bar__close"}
            icon={"close"}
            clickHandler={clearSearchBar}
          />
        )}
      </form>
    </div>
  );
}
