import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from './nav';
import '../css/intialmoviesdetails.css';
import { fetchMovieDetailsById, fetchMovieTrailersById } from '../apis/apis';
import StarRating from './starrating';
import ScrollToTop from './scrolltop';
import Loader from './loader';

function InitialMovieDetails() {
  const [moviedetails, setMovieDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const targetId = parseInt(id, 10);
  const navigate = useNavigate();

  const convertMinutesToHMS = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    setLoading(true);
    fetchMovieDetailsById(targetId)
      .then((res) => {
        const movie = res.data;
        if (movie) {
          setMovieDetails([movie]);
        } else {
          setMovieDetails([]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
        setMovieDetails([]);
        setLoading(false);
      });
  }, [targetId]);

  const handlePlayClick = (movieId) => {
    fetchMovieTrailersById(movieId)
      .then((res) => {
        const videos = res.data.results;
        const trailer = videos.find(video => video.type === 'Trailer');
        const teaser = videos.find(video => video.type === 'Teaser');
        const glimpse = videos.find(video => video.type === 'Glimpse');
        const randomVideo = videos.length > 0 ? videos[0] : null;

        if (trailer) {
          navigate(`/trailer/${trailer.key}`);
        } else if (teaser) {
          navigate(`/trailer/${teaser.key}`);
        } else if (glimpse) {
        navigate(`/trailer/${glimpse.key}`);
      } else if (randomVideo) {
        navigate(`/trailer/${randomVideo.key}`);
      }  else {
          alert("No trailer or teaser available.");
        }
      })
      .catch((err) => {
        console.error('Error fetching trailers:', err);
        alert("Error fetching trailers.");
      });
  };

  return (
    <div>
      <Navbar />
      <div className="container mt-5 intialcontainer">
        {loading ? (
          <Loader />
        ) : moviedetails.length > 0 ? (
          moviedetails.map((item, i) => (
            <div className="row" key={i}>
              <div className="col-md-4">
                <div className="card">
                  <div className="rating-circle">
                    {item.vote_average === 0 ? "NA" : item.vote_average.toFixed(1)}
                  </div>
                  <img
                    src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.poster_path}`}
                    className="intialdetailsposter"
                    alt="Movie Poster"
                  />
                  <Link
                    to="#"
                    className="item_play"
                    onClick={() => handlePlayClick(item.id)}
                  >
                    <i className="bi bi-play-circle-fill"></i>
                  </Link>
                </div>
              </div>
              <div className="col-md-8">
                <h1 className="intial movie-title">{item.original_title}</h1>
                <p className="intial movie-details">Release Date: {item.release_date}</p>
                <p className="intial movie-details">
                  Languages: {item.spoken_languages?.map((lang, i) => lang.name).join(', ')}
                </p>
                <p className="intial movie-details">
                  Genre: {item.genres?.map((genre) => genre.name).join(', ') || 'Unknown'}
                </p>
                <p className="intial movie-details">Duration: {convertMinutesToHMS(item.runtime)}</p>
                <div className="intial movie-details">Rating: {item.vote_average === 0 ? "NA" : <StarRating rating={item.vote_average} />}</div>
                <p className="intial movie-details">Synopsis: {item.overview}</p>
                <button className='trailerbtn' onClick={() => handlePlayClick(item.id)}>Watch Trailer</button>
              </div>
            </div>
          ))
        ) : (
          <p>No movie details found.</p>
        )}
        <ScrollToTop />
      </div>
    </div>
  );
}

export default InitialMovieDetails;
