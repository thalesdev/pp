import React from 'react';
import Navbar from './global-components/navbar';
import Bannerv2 from './section-components/banner-v2';
import FeaturedProperties from './section-components/featured-properties';
import RecentProperties from './section-components/recent-properties';
import FeaturedPorject from './section-components/featured-project';
import WhyChooseUs from './section-components/why-choose-us';
import Footer from './global-components/footer';

const Home_V1 = () => {
    return <div>
        <Navbar />
        <Bannerv2 />
        <FeaturedProperties />    
        <RecentProperties />
        <FeaturedPorject />
        <WhyChooseUs />
        <Footer />
    </div>
}

export default Home_V1

