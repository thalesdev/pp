import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Errorpage from './section-components/error';

const Error = () => {

	const history = useHistory();

	useEffect(() => {
		history.push({
			search: '?chat=false'
		});
	}, [history]);
	return <div>
		<Errorpage />
	</div>
}

export default Error

