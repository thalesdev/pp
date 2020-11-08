import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import PropertiesGrid from './section-components/properties-grid';
import Footer from './global-components/footer';

const Properties = () => {
	return (
		<div>
			<Navbar />
			<PageHeader headertitle="Pesquise Propriedades" subheader="Propriedades" />
			<PropertiesGrid />
			<Footer />
		</div>
	);
}

export default Properties;

