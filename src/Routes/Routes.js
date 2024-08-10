import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from '../components/App';
import InitialMovieDetails from '../components/intialmoviedetails';
import TrailerPlayer from '../components/trailerplayer';
import Home from '../components/home';
import Tvshows from '../components/tvshows';
import Upcomingmovies from '../components/upcomingmovies';

function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<App />} />
        <Route path="/movies/:id" element={<InitialMovieDetails />} />
        <Route path = "/tvshows" element = {<Tvshows/>}/>
        <Route path="/intialmoviedetails/:id" element={<InitialMovieDetails />} />
        <Route path="/trailer/:key" element={<TrailerPlayer />} />
        <Route path = "/upcomingmovies" element = {<Upcomingmovies/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;

