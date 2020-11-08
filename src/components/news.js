import React, { useState } from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import PopularPost from './blog-components/popular-post';
import PostList from './blog-components/post-list';
import Footer from './global-components/footer';

const News = () => {

	const [searchTerm, setSearchTerm] = useState('');

	return <div>
		<Navbar />
		<PageHeader headertitle="Blog Prime Properties" subheader="News" />
		<PopularPost setSearchTerm={setSearchTerm} />
		<PostList searchTerm={searchTerm} />
		<Footer />
	</div>
}

export default News

