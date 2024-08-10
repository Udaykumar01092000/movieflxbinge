import React from 'react';
import {useParams} from 'react-router-dom';
import Navbar from './nav';
import '../css/trailerplayer.css';

function TrailerPlayer() {

  const { key } = useParams();

  const handleNavigateToMovieDetails = () => {
    window.history.back(); 
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-8 trailer-container">
        <button className="btn btn-back mb-3" onClick={() => handleNavigateToMovieDetails(key)}>
          Go to Movie Details
        </button>
        <div className="embed-responsive embed-responsive-16by9">
          <iframe
            className="embed-responsive-item"
            src={`https://www.youtube.com/embed/${key}?rel=0`}
            allowFullScreen
            title="Trailer"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default TrailerPlayer;
