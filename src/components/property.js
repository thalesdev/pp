import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import PropertySection from './section-components/property';
import TopAuthor from './section-components/top-author';
import Footer from './global-components/footer';

const Property = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Property" />
        <PropertySection />
        <TopAuthor />
        <Footer />
    </div>
}

export default Property

