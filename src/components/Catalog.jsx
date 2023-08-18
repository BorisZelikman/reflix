import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "./Movie";

function Catalog() {
    const [movieData, setMovieData] = useState(null);
    const [configuration, setConfiguration] = useState(null);

    const [search,setSearch]=useState("");

    const TOKEN='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWE0MjIwMWY5MDA2ODk5ZjhiNzRlYzZkMDZkY2RjZSIsInN1YiI6IjY0ZGRjNWRmNWFiODFhMDEzOTE5MjdhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NxuXJ_sgH1bDbN2KmvfRi5HsUfdeJ_srucj_plcaAps'

    const {user}=useParams()
    useEffect(() => {
      fetchConfiguration();
      fetchMovies();
    }, []);
  
    useEffect(() => {
      search===""?fetchMovies():fetchSearch();
    }, [search]);
    const fetchMovies = async () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: TOKEN,
        }
      };
  
      try {
        const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        const data = await response.json();
        setMovieData(data.results.slice(0,10)); 
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    const fetchSearch=()=>{
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWE0MjIwMWY5MDA2ODk5ZjhiNzRlYzZkMDZkY2RjZSIsInN1YiI6IjY0ZGRjNWRmNWFiODFhMDEzOTE5MjdhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NxuXJ_sgH1bDbN2KmvfRi5HsUfdeJ_srucj_plcaAps'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setMovieData(response.results.slice(0,10)))
      .catch(err => console.error(err));
  }
    const fetchConfiguration= ()=>{
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: TOKEN
        }
      };
      
      fetch('https://api.themoviedb.org/3/configuration', options)
        .then(response => response.json())
        .then(response => setConfiguration(response))
        .catch(err => console.error(err));
    }
  
    const showMovies= ()=>{
      const imgPrePath=configuration.images.base_url + configuration.images.poster_sizes[2];
      return movieData.map((m)=><Movie imgPath={imgPrePath+m.poster_path}/>)
    }
    return (<>
      <div class="search-budget-container">
         <input type="text" class="search" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
         <p class="budget">{search}</p>
      </div>
      <div className="catalog1">
        <h1>Trending Movies</h1>
        {movieData ? (<>
          {/* <div>
            {showMovies()}
          </div> */}
          {/* <pre style={{backgroundColor:"ivory"}}>{JSON.stringify(configuration, null, 2) }</pre>*/}
          <pre>{JSON.stringify(movieData, null, 2)}</pre> 
        </>) : (
          <p>Loading...</p>
        )}
      </div>
      </>
    );
}

export default Catalog;