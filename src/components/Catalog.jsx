import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Movie from "./Movie";

function Catalog({selectedUser, changeRent, getImgUrl}) {

  const TOKEN='Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNWE0MjIwMWY5MDA2ODk5ZjhiNzRlYzZkMDZkY2RjZSIsInN1YiI6IjY0ZGRjNWRmNWFiODFhMDEzOTE5MjdhNyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NxuXJ_sgH1bDbN2KmvfRi5HsUfdeJ_srucj_plcaAps'
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: TOKEN,
    }
  };
  const fetchConfiguration= ()=>{
    fetch('https://api.themoviedb.org/3/configuration', options)
      .then(response => response.json())
      .then(response => setConfiguration(response))
      .catch(err => console.error(err));
  }   
  const fetchMovies = async () => {
    try {
      const response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
      const data = await response.json();
      setMovieData(data.results.slice(0,10)); 
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  const fetchSearch=()=>{   
    fetch(`https://api.themoviedb.org/3/search/movie?query=${search}&include_adult=false&language=en-US&page=1`, options)
      .then(response => response.json())
      .then(response => setMovieData(response.results.slice(0,10)))
      .catch(err => console.error(err));
  }



  const [configuration, setConfiguration] = useState(null);
  const [movieData, setMovieData] = useState(null);
  
  const [search,setSearch]=useState("");

  useEffect(() => {
    fetchConfiguration();
    fetchMovies();
  }, []);

  useEffect(()=>{
    if (configuration===null) return;
    getImgUrl(configuration.images.base_url + configuration.images.poster_sizes[3])
  },[configuration])
  
  useEffect(() => {
    search===""?fetchMovies():fetchSearch();
  }, [search]);

  const showMovies= (data)=>{
    const imgPrePath=configuration===null?'http://image.tmdb.org/t/p/w185':configuration.images.base_url + configuration.images.poster_sizes[2];
    return data.map((m)=><Movie 
      key={m.id} 
      imgPath={imgPrePath+m.poster_path} 
      selectedUser={selectedUser} 
      changeRent={changeRent} id={m.id} details={m}/>)
  }

    return (<>
      <div class="search-budget-container">
         <input type="text" class="search" placeholder="Search" value={search} onChange={(e)=>setSearch(e.target.value)} />
         {selectedUser===undefined? null:<p class="budget">budget of {selectedUser.name}: ${selectedUser.budget}</p>}
      </div>
      <div className="catalog">
        {selectedUser.rented.length>0 ? (<>
          <h5>Rented:</h5>
          <div>
            {showMovies(selectedUser.rented)}
          </div>
          </>) 
        : null}          
        <h5>{search===""?"Trending Movies":"Search results"}</h5>
        {movieData ? (<>
          <div>
            {showMovies(movieData)}
          </div>
          {/* <pre style={{backgroundColor:"ivory"}}>{JSON.stringify(configuration, null, 2) }</pre>*/}
            {/* <pre>{JSON.stringify(movieData, null, 2)}</pre>    */}
            {/* <pre>{JSON.stringify(rentedMovies, null, 2)}</pre>    */}
        </>) : (
          <p>Loading...</p>
        )}
      </div>
      </>
    );
}

export default Catalog;