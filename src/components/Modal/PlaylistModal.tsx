import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import Svg from "../Svg";
import { debounce } from "ts-debounce";

Modal.setAppElement("#root");

export default function PlaylistModal({
  modalIsOpen,
  setModalIsOpen,
  playlists,
}) {
  const [playlistQuery, setPlaylistQuery] = useState("");
  const [filteredPlaylists, setFilteredPlaylist] = useState(playlists);

  const filterPlaylists = (query: string) => {
    const filtered = playlists.filter((playlist) =>
      playlist.name.includes(query)
    );
    setFilteredPlaylist(filtered);
  };

  const debouncedFilter = debounce(filterPlaylists, 200);

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistQuery(e.target.value);
    debouncedFilter(e.target.value);
  };

  return (
    <>
      <Modal
        className="playlist-modal"
        overlayClassName="playlist-modal-overlay"
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
      >
        <div className="playlist-modal__header">
          <span className="title">Save to</span>
          <span onClick={() => setModalIsOpen(false)}>
            <Svg icon="close" customClass="modal-close-icon" />
          </span>
        </div>
        <div className="playlist-modal__content">
          <div className="content-row content-title">Select playlist</div>
          <input
            className="content-row content-search"
            type="text"
            name=""
            id=""
            placeholder="Search playlists"
            value={playlistQuery}
            onChange={updateQuery}
          />
          <div className="content-row content-playlists-wrapper">
            <div className="content-playlists__title">Playlists</div>
            {filteredPlaylists.map((pl) => {
              return (
                <div className="content-playlists__row">
                  <label className="input-checkbox">
                    <input type="checkbox" />
                    <span className="text-black">{pl.name}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        <div className="playlist-modal__footer">
          <Button
            variant="primary"
            size="sm"
            customClass="toggle-playlist-create-btn"
          >
            <Svg icon="plus" />
            Create new playlist
          </Button>
        </div>
      </Modal>
    </>
  );
}
