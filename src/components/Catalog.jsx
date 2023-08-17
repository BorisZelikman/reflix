import { useState, useEffect } from "react";
function Catalog() {
    const [movieData, setMovieData] = useState(null);

    useEffect(() => {
      fetchData();
    }, []);
  
    const fetchData = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWE0MjIwMWY5MDA2ODk5ZjhiNzRlYzZkMDZkY2RjZSIsInN1YiI6IjY0ZGRjNWRmNWFiODFhMDEzOTE5MjdhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NxuXJ_sgH1bDbN2KmvfRi5HsUfdeJ_srucj_plcaAps',
        }
      };
  
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US:10', options);
        const data = await response.json();
        setMovieData(data.results.slice(0,10)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    return (
      <div>
        <h1>Trending Movies</h1>
        {movieData ? (
          <pre>{JSON.stringify(movieData, null, 2)}</pre>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    );
}

export default Catalog;