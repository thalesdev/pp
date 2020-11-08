import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import NewsDetailsSection from './blog-components/news-details';
import Footer from './global-components/footer';
import { useParams } from 'react-router-dom';



const NewsDetails = () => {
	const { id } = useParams();

	return (
		<div>
			<Navbar />
			<PageHeader headertitle="News Details" />
			<NewsDetailsSection id={id} />
			<Footer />
		</div>
	);
}

export default NewsDetails

