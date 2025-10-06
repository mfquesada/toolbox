import { useEffect, useState } from 'react';

export function useFilesData() {
  const [filesData, setFilesData] = useState([]);
  const [filesDataLoading, setFilesDataLoading] = useState(true);
  const [filesDataError, setFilesDataError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_FILES_URL}/v1/files/data`)
      .then(res => {
        if (res.status !== 200) throw new Error(`Request Failed! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        setFilesData(data);
      })
      .catch(error => {
        console.error(error);
        setFilesDataError("Error loading content.");
      })
      .finally(() => {
        setFilesDataLoading(false);
      })
  }, []);

  return { filesData, filesDataLoading, filesDataError };
}
