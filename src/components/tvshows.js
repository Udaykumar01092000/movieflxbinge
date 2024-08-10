import React , {useEffect , useState} from 'react';
import { Link } from 'react-router-dom';
import '../css/intialmovies.css';
import ScrollToTop from './scrolltop';
import Navbar from './nav';
import { fetchTvShows } from '../apis/apis';
import TvShowsSlider from './sliders/tvshowsslider';

function InitialMovies() {

  const [tvShows , setTvShows] = useState([])

  useEffect(()=>{
    fetchTvShows()
    .then((res)=>{
      setTvShows(res.data.results);
      return res;
    }).catch((rej)=>{
      return rej;
    })
  },[])
  
    console.log(tvShows);
    return (
      <div>
        <Navbar/>
        <TvShowsSlider/>
        <div className="container">
           <h1 className='homeslide-heading m-4'>
              TV<span className='homeslide-category-type'> Shows</span>
           </h1>
            <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 m-2">
              {tvShows.map((item , i)=>{
                return <div className='col custom-col'>
                <div className='card'>
                  <div className="movie-item mb-50">
                    <div className="rating-circle">
                      {item.vote_average.toFixed(1) > 0 ? item.vote_average.toFixed(1) : "NA"}
                    </div>
                    <div className="movie-poster">
                      <img
                      src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path ? item.backdrop_path : item.poster_path}`}
                      className="cardimgtop"
                      alt="Title"
                      />
                      <Link to = "#" className="item_play">
                        <i className="bi bi-play-circle-fill"></i>
                      </Link>
                    </div>
                    <div className="movie-content">
                      <div className="movie-top">
                        <Link className='link'><h3 className="title">{item.original_name ? item.original_name : item.name}</h3></Link>
                        <span className="date">{item.first_air_date ? item.first_air_date : "NA"}</span><br />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              })}
            </div>
            <ScrollToTop/>
        </div>
      </div>
    );
}

export default InitialMovies;



