import React , {useState , useEffect} from 'react'
import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

function HomeSlider() {

    const [trailers , setTrailers] = useState([])

    useEffect(() => {
        const fetchTrailers = async () => {
            try {
                // Step 1: Fetch popular movies
                const { data } = await axios.get(
                    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
                );
                const movies = data.results.slice(0, 7); // Get the first 7 movies

                // Step 2: Fetch trailers for each movie
                const trailerPromises = movies.map(async (movie) => {
                    const movieDetails = await axios.get(
                        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
                    );
                    // Filter out trailers
                    const trailer = movieDetails.data.results.find(
                        (video) => video.type === 'Trailer' && video.site === 'YouTube'
                    );
                    return trailer ? `https://www.youtube.com/embed/${trailer.key}` : null;
                });

                const fetchedTrailers = await Promise.all(trailerPromises);
                setTrailers(fetchedTrailers.filter(Boolean)); // Remove null trailers
            } catch (error) {
                console.error('Error fetching trailers:', error);
            }
        };

        fetchTrailers();
    }, []);

  return (
    <div>
        <div className='homeslide-container'>
            <div className='homeslide-cards-container-wrapper'>
                {console.log(trailers)}
                <div class="homebanner">
                    <div class="homeslider" style={{ '--quantity': trailers.length }}>
                        {trailers.map((trailer, index) => (
                            <div class="item" key={index} style={{ '--position': index + 1 }}>
                                <iframe
                                    height="100%"
                                    width="100%"
                                    src={`${trailer.replace('embed/', 'embed/videoseries?playlist=')}&autoplay=1&mute=1&controls=0&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3&cc_load_policy=0`}
                                    title={`YouTube video ${index + 1}`} // Set title for accessibility
                                    frameBorder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    style={{ pointerEvents: 'none', background: 'black' }} // Set a background color if needed
                                ></iframe>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeSlider
