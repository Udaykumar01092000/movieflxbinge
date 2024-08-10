import React, { useRef, useEffect, useState } from 'react';
import { fetchTopRatedMovies, fetchTvShows, fetchUpComingMovies} from '../apis/apis'; // Adjust the import path accordingly
import { Link} from 'react-router-dom';
import Navbar from './nav';
import '../css/home.css';
import ScrollToTop from './scrolltop';

function Home() {
    const topRatedRef = useRef(null);
    const upcomingRef = useRef(null);
    const [movies, setMovies] = useState([]);
    const [upComing, setUpComing] = useState([]);
    const [tvShows, setTvShows] = useState([]);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetchTopRatedMovies();
                const { data } = response; // Adjust if the structure of the response is different

                // Filter and sort movies
                const filteredMovies = data.results
                    .filter(movie => movie.vote_average >= 7)
                    .sort((a, b) => b.vote_average - a.vote_average);
                setMovies(filteredMovies);
            } catch (error) {
                console.error('Failed to fetch top-rated movies:', error);
            }
        };

        fetchMovies();
    }, []);

    useEffect(() => {
        fetchUpComingMovies()
            .then((res) => {
                setUpComing(res.data.results);
                return res;
            })
            .catch((rej) => {
                console.error('Failed to fetch upcoming movies:', rej);
            });
    }, []);

    useEffect(()=>{
        fetchTvShows()
        .then((res)=>{
            setTvShows(res.data.results);
            return res;
        }).catch((rej)=>{
            console.log(rej)
        })
    })

    const onSlideLeft = (ref) => {
        const container = ref.current;
        if (container) {
            const { scrollLeft, clientWidth, scrollWidth } = container;
            // Move by one card width
            container.scrollLeft = scrollLeft - clientWidth / 2;
            if (scrollLeft <= clientWidth / 2) {
                container.scrollLeft = scrollWidth / 2;
            }
        }
    };

    const onSlideRight = (ref) => {
        const container = ref.current;
        if (container) {
            const { scrollLeft, clientWidth, scrollWidth } = container;
            // Move by one card width
            container.scrollLeft = scrollLeft + clientWidth / 2;
            if (scrollLeft >= scrollWidth / 2) {
                container.scrollLeft = 0;
            }
        }
    };

    return (
        <div>
            <Navbar />
            <div className='homeslide-container'>
                <div className='homeslide-row'>
                    <div className='homeslide-col-10'>
                        <h1 className='homeslide-heading'>
                            <span className='homeslide-category-type'>Top Rated</span> Movies
                        </h1>
                    </div>
                    <div className='homeslide-col-2 homeslide-arrows'>
                        <i className='fas fa-angle-left homeslide-arrow-left' onClick={() => onSlideLeft(topRatedRef)}></i>
                        <i className='fas fa-angle-right homeslide-arrow-right' onClick={() => onSlideRight(topRatedRef)}></i>
                    </div>
                </div>
                <div className='homeslide-cards-container-wrapper'>
                    <div className='homeslide-cards-container' ref={topRatedRef}>
                        {movies.map((movie, index) => (
                            <div className='homeslide-card' key={movie.id || index}>
                                <div className='movie-item mb-50'>
                                    <div className='rating-circle'>
                                        {movie.vote_average.toFixed(1)}
                                    </div>
                                    <div className='movie-poster'>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                                            alt={movie.title}
                                            className='cardimgtop'
                                        />
                                            <Link to = {`/intialmoviedetails/${movie.id}`} className="item_play">
                                                <i className="bi bi-play-circle-fill"></i>
                                            </Link>                                    
                                        </div>
                                    <div className='movie-content'>
                                        <div className='movie-top'>
                                            <Link className='link'>
                                                <h3 className='title'>{movie.title}</h3>
                                            </Link>
                                            <span className='date'>{movie.release_date}</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className='contanter'>
                        <div className='row'>
                            <Link to = "/movies" className='viewall'>
                                View All
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className='homeslide-container'>
                <div className='homeslide-row'>
                    <div className='homeslide-col-10'>
                        <h1 className='homeslide-heading'>
                            <span className='homeslide-category-type'>Upcoming</span> Movies
                        </h1>
                    </div>
                    <div className='homeslide-col-2 homeslide-arrows'>
                        <i className='fas fa-angle-left homeslide-arrow-left' onClick={() => onSlideLeft(upcomingRef)}></i>
                        <i className='fas fa-angle-right homeslide-arrow-right' onClick={() => onSlideRight(upcomingRef)}></i>
                    </div>
                </div>
                <div className='homeslide-cards-container-wrapper'>
                    <div className='homeslide-cards-container' ref={upcomingRef}>
                        {upComing.map((movie, index) => (
                            <div className='homeslide-card' key={movie.id || index}>
                                <div className='movie-item mb-50'>
                                    <div className="rating-circle">
                                        {movie.vote_average === 0 ? "NA" : movie.vote_average}
                                    </div>
                                    <div className='movie-poster'>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${movie.poster_path}`}
                                            alt={movie.title}
                                            className='cardimgtop'
                                        />
                                        <Link to = {`/intialmoviedetails/${movie.id}`} 
                                         className='home_item_play'
                                         
                                         >
                                            <i className='bi bi-play-circle-fill'></i>
                                        </Link>
                                    </div>
                                    <div className='movie-content'>
                                        <div className='movie-top'>
                                            <Link className='link'>
                                                <h3 className='title'>{movie.original_title}</h3>
                                            </Link>
                                            <span className='date'>{movie.release_date ? movie.release_date : "Coming Soon"}</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='contanter'>
                        <div className='row'>
                            <Link to = "/upcomingmovies" className='viewall'>
                                View All
                            </Link>
                        </div>
                    </div>
            </div>

            <div className='homeslide-container'>
                <div className='homeslide-row'>
                    <div className='homeslide-col-10'>
                        <h1 className='homeslide-heading'>
                            <span className='homeslide-category-type'>Tv Shows</span>
                        </h1>
                    </div>
                    <div className='homeslide-col-2 homeslide-arrows'>
                        <i className='fas fa-angle-left homeslide-arrow-left' onClick={() => onSlideLeft(upcomingRef)}></i>
                        <i className='fas fa-angle-right homeslide-arrow-right' onClick={() => onSlideRight(upcomingRef)}></i>
                    </div>
                </div>
                <div className='homeslide-cards-container-wrapper'>
                    <div className='homeslide-cards-container' ref={upcomingRef}>
                        {tvShows.map((item, index) => (
                            <div className='homeslide-card' key={item.id || index}>
                                <div className='movie-item mb-50'>
                                    <div className="rating-circle">
                                        {item.vote_average.toFixed(1)}
                                    </div>
                                    <div className='movie-poster'>
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.poster_path}`}
                                            alt={item.title}
                                            className='cardimgtop'
                                        />
                                        <Link to = {`/intialmoviedetails/${item.id}`} className="item_play">
                                                <i className="bi bi-play-circle-fill"></i>
                                        </Link>                                    

                                    </div>
                                    <div className='movie-content'>
                                        <div className='movie-top'>
                                            <Link className='link' to = "#">
                                                <h3 className='title'>{item.original_name ? item.original_name : item.name}</h3>
                                            </Link>
                                            <span className='date'>{item.first_air_date ? item.first_air_date : "Coming Soon"}</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className='contanter'>
                        <div className='row'>
                            <Link to = "/tvshows" className='viewall'>
                                View All
                            </Link>
                        </div>
                    </div>
            </div>
            <ScrollToTop />
        </div>
    );
}

export default Home;
