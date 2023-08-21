import React, { useState, useEffect } from 'react';

const MovieTrailer = ({ movieId }) => {
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    const apiKey = '25a42201f9006899f8b74ec6d06dcdce';
    const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=videos`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const videos = data.videos.results;
        if (videos && videos.length > 0) {
          // Assuming the first video is a trailer
          setTrailerKey(videos[0].key);
        }
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
      });
  }, [movieId]);

  if (trailerKey) {
    return (
      <div className="trailer-container">
        <iframe
          title="Movie Trailer"
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${trailerKey}`}
          frameBorder="0"
          allowFullScreen
        ></iframe>
      </div>
    );
  } else {
    return <p>Loading trailer...</p>;
  }
};

export default MovieTrailer;
