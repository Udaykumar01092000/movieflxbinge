import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/intialmovies.css';
import ScrollToTop from './scrolltop';
import CustomDropdown from './scrolldrop';  // Use CustomDropdown directly
import Loader from './loader';

function InitialMovies() {
    const [movies, setMovies] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanguageCode, setSelectedLanguageCode] = useState('');
    const [allMovies, setAllMovies] = useState([]);
    const [loading , setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                let url = `https://api.themoviedb.org/3/discover/movie?api_key=cfe422613b250f702980a3bbf9e90716`;
                if (selectedLanguageCode) {
                    url += `&with_original_language=${selectedLanguageCode}`;
                }

                const response = await fetch(url);
                const data = await response.json();
                setAllMovies(data.results || []);
                filterMovies(data.results || [], searchQuery);
            } catch (error) {
                console.error("Error fetching movies:", error);
            } finally{
                setLoading(false);
            }
        };

        fetchMovies();
    }, [selectedLanguageCode , searchQuery]);

    useEffect(() => {
        filterMovies(allMovies, searchQuery);
    }, [searchQuery, allMovies]);

    const filterMovies = (moviesList, query) => {
        const filteredMovies = moviesList.filter(movie =>
            movie.title.toLowerCase().includes(query.toLowerCase())
        );
        setMovies(filteredMovies);
    };

    const handleLanguageSelect = (languageCode) => {
        setSelectedLanguageCode(languageCode);
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    return (
        <div className="container">
            <CustomDropdown onSelect={handleLanguageSelect} />
            <input
                type="text"
                placeholder="Search Movie Name ...."
                value={searchQuery}
                onChange={handleSearchChange}
                className="search-input m-3"
            />
            {loading ? (<Loader/>):(
            <div className="row row-cols-4k-11 row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-xl-5 g-4 m-2">
                {movies.length > 0 ? movies.map((item, i) => {
                    let formattedDate = formatDate(item.release_date);

                    return (
                        <div className='col custom-col' key={i}>
                            <div className='card'>
                                <div className="movie-item mb-50">
                                    <div className="rating-circle">
                                        {item.vote_average.toFixed(1) >= 0 ? item.vote_average.toFixed(1) : item.vote_average.toFixed(1) === "NA" }
                                    </div>
                                    <div className="movie-poster">
                                        <img
                                            src={`https://image.tmdb.org/t/p/w300_and_h450_bestv2${item.backdrop_path}`}
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
                                            <span className="date">{formattedDate}</span><br />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                }) : (
                    <div className="no-movies-container">
                        <p className='nomovies'>404 No Movies Found</p>
                    </div>
                )}
            </div>)}
            <ScrollToTop />
        </div>
    );
}

export default InitialMovies;
