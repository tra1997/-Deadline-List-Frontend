import React from 'react';
import { NavLink } from 'react-router-dom';
import { isUserLoggedIn, logout, getUsername } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { isAdminUser } from '../services/AuthService';
const HeaderComponent = () => {
    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();
    const isAdmin = isAdminUser();
    function handleLogout() {
        logout();
        navigator('/login');
    }

    return (
        <div>
            <header>
                <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <a  className='navbar-brand'>
                            Deadline Management Application
                        </a>
                    </div>
                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            {isAuth && (
                                <li className='nav-item'>
                                    <NavLink to='/todos' className='nav-link'>
                                        Tasks
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                        <ul className='navbar-nav'>
                            {isAuth && isAdmin && (
                                <li className='nav-item'>
                                    <NavLink
                                        to='/api/user/performanceReview'
                                        className='nav-link'
                                    >
                                        Performance Review
                                    </NavLink>
                                </li>
                            )}
                        </ul>
                    </div>
                    <ul className='navbar-nav'>
                        {!isAuth && (
                            <li className='nav-item'>
                                <NavLink to='/register' className='nav-link'>
                                    Register
                                </NavLink>
                            </li>
                        )}

                        {!isAuth && (
                            <li className='nav-item'>
                                <NavLink to='/login' className='nav-link'>
                                    Login
                                </NavLink>
                            </li>
                        )}
                        {isAuth && (
                            <NavLink className='nav-link'>{getUsername()}</NavLink>
                        )}
                        {isAuth && (
                            <li className='nav-item'>
                                <NavLink
                                    to='/login'
                                    className='nav-link'
                                    onClick={handleLogout}
                                >
                                    Logout
                                </NavLink>
                            </li>
                        )}
                    </ul>
                </nav>
            </header>
        </div>
    );
};

export default HeaderComponent;
