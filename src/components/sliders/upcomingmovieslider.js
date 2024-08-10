import React, { useEffect, useState, useRef } from 'react';
import { fetchUpcomingSliderMovies } from '../../apis/apis';
import '../../css/slider.css'; // Custom CSS file for additional styling

const MovieSlider = () => {
  const [movies, setMovies] = useState([]);
  const carouselRef = useRef(null);

  useEffect(() => {
    const getMovies = async () => {
      const moviesData = await fetchUpcomingSliderMovies();
      console.log('Fetched Movies:', moviesData); // Log the fetched data
      if (Array.isArray(moviesData)) {
        setMovies(moviesData);
      } else {
        console.error('Unexpected data format:', moviesData);
      }
    };

    getMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const next = new Event('click');
        carouselRef.current.querySelector('.carousel-control-next').dispatchEvent(next);
      }
    }, 8000); // Adjust interval as needed

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div id="movieCarousel" className="carousel slide" data-bs-ride="carousel" ref={carouselRef}>
      <div className="carousel-inner">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div
              key={movie.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
                alt={movie.title}
              />
              <div className="carousel-caption d-none d-md-block w-40">
                <h5>{movie.title}</h5>
              </div>
            </div>
          ))
        ) : (
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://via.placeholder.com/800x400?text=Loading..."
              alt="Loading"
            />
            <div className="carousel-caption d-none d-md-block">
              <h5>Loading...</h5>
            </div>
          </div>
        )}
      </div>

      {/* Custom navigation buttons */}
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#movieCarousel"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default MovieSlider;
