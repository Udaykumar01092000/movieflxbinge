import React, { useState, useEffect } from 'react';
import Navbar from '../components/nav';
import MovieSlider from './sliders/movieslider';
import InitialMovies from '../components/intialmovies';
import { searchMovies, fetchPopularMovies} from '../apis/apis';

function App() {
    const [searchMovieName, setSearchMovieName] = useState("");
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        if (searchMovieName) {
            searchMovies(searchMovieName)
                .then((res) => {
                    setMovies(res.data.results);
                }).catch((err) => console.error(err));
        } else {
            fetchPopularMovies()
                .then((res) => {
                    setMovies(res.data.results);
                })
                .catch((err) => console.error(err));
        }
    }, [searchMovieName]);

    
    return (
        <div>
            <Navbar setSearchMovieName={setSearchMovieName}/>
            <MovieSlider />
            <InitialMovies movies={movies} />
            {/* Add a component to display upcoming movies if needed */}
        </div>
    );
}

export default App;
