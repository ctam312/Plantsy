import './ErrorPage.css'
import plantboy from './plantani.gif'

import { Link } from 'react-router-dom';

export default function ErrorPlant() {
	return (
		<div id='fullErrorDiv'>
			<div className='errorImgDiv'>
			<img
				src= {plantboy}
				alt='lost plant'
				/>
			</div>
			<Link to='/'>Click here to return to Home</Link>
		</div>
	);
}