import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import PlantsyLogo from './LogoFolder/Plantsy.png'
import OpenModalButton from '../OpenModalButton';
import LoginFormModal from '../LoginFormModal';
import Cart from '../Cart/Cart';

function Navigation({ isLoaded }){
	const sessionUser = useSelector(state => state.session.user);

	return (
		<div className='navigation-container'>
			{/* <div className='website-name'>Plantsy</div> */}
			<div>
				{/* <li> */}
					<NavLink className="website-name" exact to="/">
						<img src={PlantsyLogo} className="plantsy-logo" alt="" />
					</NavLink>
				{/* </li> */}
			</div>
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
	);
}

export default Navigation;
