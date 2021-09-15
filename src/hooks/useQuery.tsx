import react from "react";
import { useLocation } from "react-router-dom";

function getQuery() {
  return new URLSearchParams(useLocation().search);
}

const useQuery = () => {
  const query = getQuery();
  return query;
};

export default useQuery;
