import axios from "axios";

const API_KEY = 'https://api.themoviedb.org/3';
const URL = 'cfe422613b250f702980a3bbf9e90716';
const Slider = `${API_KEY}/trending/movie/week?api_key=${URL}`;
const UpcomingSlider = `${API_KEY}/movie/upcoming?language=en-US&page=1&region=IN&api_key=${URL}`

export const fetchLanguages = async () => {
  try {
      const response = await axios.get(`${API_KEY}/configuration/languages`, {
          params: {
              api_key: URL
          }
      });
      return response.data;
  } catch (error) {
      console.error("Error fetching languages:", error);
      throw error;
  }
};

export const fetchTvShows = ()=>{
  return axios.get(`${API_KEY}/tv/popular?api_key=${URL}&language=en-IN&page=1`)
}

export const fetchSliderMovies = async () => {
    try {
      const response = await axios.get(Slider);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  };

  export const fetchUpcomingSliderMovies = async () => {
    try {
      const response = await axios.get(UpcomingSlider);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching trending movies:', error);
      return [];
    }
  };

export const fetchPopularMovies = ()=>{
    return axios.get(`${API_KEY}/movie/popular?api_key=${URL}`)
}

export const searchMovies = (query)=>{
    return axios.get(`${API_KEY}/search/movie?query=${query}&api_key=${URL}`)
}

// Add this function
export const fetchMovieDetailsById = (id) => {
    return axios.get(`${API_KEY}/movie/${id}?api_key=${URL}`);
};

//trailer api
export const fetchMovieTrailersById = (id)=>{
    return axios.get(`${API_KEY}/movie/${id}/videos?api_key=${URL}`)
}

export const fetchTopRatedMovies = ()=>{
  return axios.get(`${API_KEY}/movie/popular?api_key=${URL}`)
}

export const fetchUpComingMovies = ()=>{
  return axios.get(`${API_KEY}/movie/upcoming?language=en-US&page=1&region=IN&api_key=${URL}`)
}

