import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import PlantsyLogo from './LogoFolder/Plantsy.png'
import SearchBar from './SearchBar';


function Navigation({ isLoaded }){
    const sessionUser = useSelector(state => state.session.user);

    return (
        <div className='other-container'>
            <div className='navigation-container'>

                <div>

                        <NavLink className="website-name" exact to="/">
                            <img src={PlantsyLogo} className="plantsy-logo" alt="" />
                        </NavLink>

                </div>

                    <SearchBar />
                <div className='icon-container'>
                <div className='profile-button-container'>
                    {isLoaded && (
                        // <li>
                            <ProfileButton user={sessionUser} />
                        // </li>
                    )}
                </div>
                <div>
                <NavLink className="checkout-button" exact to="/cart">
                                <i className="fas fa-shopping-cart"  />
                        </NavLink>
                </div>
                </div>

            </div>

        </div>
    );
}

export default Navigation;
