import React from 'react';
import Logo from '../images/logo.png';
import '../css/nav.css';
import { Link} from 'react-router-dom';

function Navbar() {

    return (
        <nav className="navbar navbar-expand-lg navbar-dark sticky-top m-0">
            <div className="container">
                <div className="navbar-brand d-flex align-items-center">
                    <Link to="/">
                        <img className='logo' src={Logo} alt="Logo" />
                    </Link>
                </div>
                <button
                    className="navbar-toggler custom-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to="/">
                                <button className="nav-link" aria-current="page">Home</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/movies">
                                <button className="nav-link" aria-current="page">Movies</button>
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/tvshows">
                                <button className="nav-link active" aria-current="page">Tv Shows</button>
                            </Link>
                        </li>
                    </ul>
                    {/* <div className="d-flex" role="search">
                        <div className="input-container">
                            {!isHomePage && !isTvShowsPage &&!isUpcomingPage &&!isDetailsPage && !isTrailerPage && (
                                <form>
                                    <div className="search-container">
                                        <input
                                            className="form-control"
                                            type="search"
                                            placeholder="Type Movie Name"
                                            aria-label="Search"
                                            onChange={handleSearchChange} // Ensure this is correctly bound
                                        />
                                        <button className="btn btn-outline-success search-btn" type="button">
                                            <FaSearch />
                                        </button>
                                    </div>
                                </form>
                            )}
                        </div>
                    </div> */}
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
