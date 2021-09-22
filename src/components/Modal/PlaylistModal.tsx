import React, { useState } from "react";
import Modal from "react-modal";
import Button from "../Button";
import Svg from "../Svg";
import { debounce } from "ts-debounce";
import { useAuth } from "../../context/AuthProvider";
import axios from "../../axios";
import { successNotify } from "../../utils/toast";

Modal.setAppElement("#root");

export default function PlaylistModal({
  modalIsOpen,
  setModalIsOpen,
  presentInWatchLater,
  setPresentInWatchLater
  currentPlaylistsStatus,
  setCurrentPlaylistsStatus
  videoId,
}) {
  const {
    user: { id: userId, watchLaterListId },
  } = useAuth();

  console.log(watchLaterListId);

  const [playlistQuery, setPlaylistQuery] = useState("");
  const watchLaterPlaylist = {
    title: "Watch Later",
    id: watchLaterListId,
    isVideoPresent: presentInWatchLater,
  };

  const playlists = [watchLaterPlaylist, ...currentPlaylistsStatus];

  const [filteredPlaylists, setFilteredPlaylist] = useState(playlists);

  const filterPlaylists = (query: string) => {
    const filtered = playlists.filter((playlist) =>
      playlist.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredPlaylist(filtered);
  };

  const debouncedFilter = debounce(filterPlaylists, 200);

  const updateQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlaylistQuery(e.target.value);
    debouncedFilter(e.target.value);
  };

  const crudPlaylist = async (playlistId, actionType) => {
    const endpoint = `/playlists/${playlistId}`;

    const postBody = { videoId, userId, action: { type: actionType } };

    console.log(postBody);

    try {
      const response = await axios.post(endpoint, postBody);
      if (response.status === 200) {
        console.log(response.data);
        successNotify(response.data.message);
        if(actionType === "ADD_VIDEO") {

          setFilteredPlaylist(allPl => {
            return allPl.map(p => {
              if(p.id === playlistId)
                return {
                  ...p, isVideoPresent: true,
                }
                else 
                return p;
            })
          })
        }
        else if(actionType === "REMOVE_VIDEO") {
          setFilteredPlaylist(allPl => {
            return allPl.map(p => {
              if(p.id === playlistId)
                return {
                  ...p, isVideoPresent: false,
                }
                else 
                return p;
            })
          })
        }
      }
    } catch (error) {
      console.error(error);
    }

    if (actionType === "ADD_VIDEO") {
    }
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
            {filteredPlaylists.map(({ title, id, isVideoPresent }) => {
              return (
                <div key={id} className="content-playlists__row">
                  <label className="input-checkbox">
                    <input
                      type="checkbox"
                      checked={isVideoPresent}
                      onChange={() =>
                        isVideoPresent
                          ? crudPlaylist(id, "REMOVE_VIDEO")
                          : crudPlaylist(id, "ADD_VIDEO")
                      }
                    />
                    <span className="text-black">{title}</span>
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
