import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollToTop from './scrolltop';
import Navbar from './nav';
import {fetchUpComingMovies} from '../apis/apis';
import UpcomingMovieSlider from './sliders/upcomingmovieslider';

function Upcomingmovies() {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        fetchUpComingMovies()
            .then((res)=>{
                setMovies(res.data.results);
                return res;
            }).catch((rej)=>{
                return rej;
            })
        },[]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div>
            <Navbar/>
            <UpcomingMovieSlider />
            <div className="container">
                <div className="row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 m-2">
                    {movies.length > 0 ? (
                        movies.map((item, i) => (
                            <div className='col custom-col' key={i}>
                                <div className='card'>
                                    <div className="movie-item mb-50">
                                        <div className="rating-circle">
                                            {item.vote_average.toFixed(1) === "0.0" ? "NA" : item.vote_average.toFixed(1)}
                                        </div>
                                        <div className="movie-poster">
                                            <img
                                                src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2/${item.backdrop_path ? item.backdrop_path : item.poster_path}`}
                                                className="cardimgtop"
                                                alt={item.title}
                                            />
                                            <Link to={`/intialmoviedetails/${item.id}`} className="item_play">
                                                <i className="bi bi-play-circle-fill"></i>
                                            </Link>
                                        </div>
                                        <div className="movie-content">
                                            <div className="movie-top">
                                                <Link className='link'><h3 className="title">{item.title}</h3></Link>
                                                <span className="title">{formatDate(item.release_date)}</span><br />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="no-movies-container">
                            <p className='nomovies'>404 No Movies Found</p>
                        </div>
                    )}
                </div>
            </div>
            <ScrollToTop />
        </div>
    );
}

export default Upcomingmovies;
