import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import blogdata from '../../data/blogdata.json';
import useDebounce from '../../hooks/useDebounce';

const PopularPost = ({ setSearchTerm }) => {

	const [query, setQuery] = useState('');

	setSearchTerm(useDebounce(query, 500));


	let publicUrl = process.env.PUBLIC_URL + '/';
	let imagealt = 'image';
	let data = blogdata.popularpost;

	return (
		<div>
			<div className="popular-post-area">
				<div className="container">
					<div className="post-and-search">
						<div className="news-search-btn">
							<i className="fa fa-search" />
						</div>
						<div className="news-search-box news-search-box-show">
							<input type="text"
								placeholder="Pesquisar"
								onChange={(e) => setQuery(e.target.value)}
							/>
							<button><i className="fa fa-search" /></button>
						</div>
						{

						/* <h6 className="mb-3 popular-post-title">Postagens Populares</h6>
						<div className="popular-post-slider">
							{data.items.map((item, i) =>
								<div key={i} className="item">
									<Link to={item.url} className="media single-popular-post">
										<div className="media-left">
											<img src={item.image} alt={imagealt} />
										</div>
										<div className="media-body">
											<h6>{item.title}</h6>
											<span>{item.date}</span>
										</div>
									</Link>
								</div>
							)}

						</div> */}
					</div>
				</div>
			</div>
		</div>
	)

};

export default PopularPost;
