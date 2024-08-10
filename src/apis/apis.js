import axios from "axios";

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = process.env.REACT_APP_TMDB_BASE_URL;

const Slider = `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`;
const UpcomingSlider = `${BASE_URL}/movie/upcoming?language=en-US&page=1&region=IN&api_key=${API_KEY}`;

export const fetchLanguages = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/configuration/languages`, {
      params: {
        api_key: API_KEY,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching languages:", error);
    throw error;
  }
};

export const fetchTvShows = () => {
  return axios.get(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-IN&page=1`);
};

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
    console.error('Error fetching upcoming movies:', error);
    return [];
  }
};

export const fetchPopularMovies = () => {
  return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
};

export const searchMovies = (query) => {
  return axios.get(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
};

export const fetchMovieDetailsById = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`);
};

export const fetchMovieTrailersById = (id) => {
  return axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}`);
};

export const fetchTopRatedMovies = () => {
  return axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`);
};

export const fetchUpComingMovies = () => {
  return axios.get(`${BASE_URL}/movie/upcoming?language=en-US&page=1&region=IN&api_key=${API_KEY}`);
};
