import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import SearchListSection from './section-components/search-list';
import Footer from './global-components/footer';

const SearchList = () => {

	return <div>
		<Navbar />
		<PageHeader headertitle="Empreendimentos" subheader="Apartamentos" />
		<SearchListSection />
		<Footer />
	</div>
}

export default SearchList

