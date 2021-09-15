import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthProvider";
import axios from "../axios";
import { filterTags } from "../utils/filterTags";
import { VideosType } from "../type/VideoGallery.type";

const useVideoGallery = (initialResults: number) => {
  const [videos, setVideos] = useState<VideosType>([]);
  const [filteredVideos, setFilteredVideos] = useState<VideosType>([]);
  const [tags, setTags] = useState<Array<string>>([]);
  const [status, setStatus] = useState<string>("idle");
  const [pgNo, setPgNo] = useState<number>(2);
  const [totalResults, setTotalResults] = useState<number>(-1);
  const [currentTag, setCurrentTag] = useState<number>(-1);

  const getVideos = async () => {
    setStatus("pending");
    try {
      const {
        status,
        data: { videos: serverVideos, totalResults },
      } = await axios.get(`/videos?page=1&results=${initialResults}`);
      if (status === 200) {
        setVideos(serverVideos);
        setTotalResults(totalResults);
        const tagsFound = filterTags(serverVideos, tags);
        setTags(tagsFound);
        setStatus("resolved");
      }
    } catch (err) {
      console.error(err);
      setStatus("rejected");
    }
  };

  const getNextPage = async () => {
    setStatus("pending");
    try {
      const {
        status,
        data: { videos: serverVideos },
      } = await axios.get(`/videos?page=${pgNo}&results=${initialResults}`);
      if (status === 200) {
        // if (serverVideos.length === 0) {
        //   setHasMore(false);
        // }
        setVideos((allVideos) => [...allVideos, ...serverVideos]);
        setPgNo((prevPage) => prevPage + 1);
        const tagsFound = filterTags(serverVideos, tags);
        // console.log(tagsFound);
        setTags(tagsFound);
        setStatus("resolved");
      }
    } catch (err) {
      console.error(err);
      setStatus("rejected");
    }
  };

  useEffect(() => {
    if (status === "idle") {
      getVideos();
    }
  }, []);

  useEffect(() => {
    if (currentTag !== -1) {
      const filteredVids = videos.filter((video) =>
        video.tags.includes(tags[currentTag])
      );
      setFilteredVideos(filteredVids);
      // setTotalResults(filteredVids.length);
    } else {
      setFilteredVideos([]);
      // setTotalResults(totalResults);
    }
  }, [currentTag]);

  return {
    status,
    tags,
    videos: currentTag === -1 ? videos : filteredVideos,
    getVideos,
    getNextPage,
    totalResults: currentTag === -1 ? totalResults : filteredVideos.length,
    currentTag,
    setCurrentTag,
  };
};

export default useVideoGallery;
