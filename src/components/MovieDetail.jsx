import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
function MovieDetail({imgUrl}) {
  const {id}=useParams();
  const [details, setDetails] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null);
  useEffect(()=>{
    const apiKey = '25a42201f9006899f8b74ec6d06dcdce';
    const apiUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=videos`;
    fetch(apiUrl)
      .then((response) => response.json())
      .then((response) => {
         setDetails(response);
         const videos = response.videos.results;
         if (videos && videos.length > 0) {
           setTrailerKey(videos[0].key);
         }
      })
      .catch((err) => console.error(err));    
  },[])
  return (      
    <div className="landing">
      {details?<h3>{details.original_title}, {details.release_date.substr(0,4)}</h3>:null}
      {details?<img src={imgUrl+details.poster_path} alt=""/> :null}
      {details?<p>{details.overview}</p> :null}
      {trailerKey? <iframe src={`https://www.youtube.com/embed/${trailerKey}`}/>:<p>Loading trailer...</p>}
    </div>
  );
}
export default MovieDetail;