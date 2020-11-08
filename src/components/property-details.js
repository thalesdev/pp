import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import PropertyDetailsSection from './section-components/property-details';
import RecomandProperties from './section-components/recomand-properties';
import Footer from './global-components/footer';
import { useParams } from 'react-router-dom';
const PropertyDetails = () => {
	const { id } = useParams();
	return (
		<div>
			<Navbar />
			<PageHeader headertitle="Detalhes da Propriedade" />
			<PropertyDetailsSection id={id} />
			<Footer />
		</div>
	);
}

export default PropertyDetails

