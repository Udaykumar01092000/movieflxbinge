import React, { useEffect, useState, useRef } from 'react';
import { fetchTvShows } from '../../apis/apis';
import '../../css/slider.css'; // Custom CSS file for additional styling

const TvShowsSlider = () => {
  const [tvshows, setTvShows] = useState([]);
  const carouselRef = useRef(null);

  useEffect(()=>{
    fetchTvShows()
    .then((res)=>{
        setTvShows(res.data.results);
        return res;
    }).catch((rej)=>{
        return rej;
    })
  },[])

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
        {tvshows.length > 0 ? (
          tvshows.map((tvshow, index) => (
            <div
              key={tvshow.id}
              className={`carousel-item ${index === 0 ? 'active' : ''}`}
            >
              <img
                className="d-block w-100"
                src={`https://image.tmdb.org/t/p/original/${tvshow.backdrop_path}`}
                alt={tvshow.name}
              />
              <div className="carousel-caption d-none d-md-block w-40">
                <h5>{tvshow.name}</h5>
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

export default TvShowsSlider;
