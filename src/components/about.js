import React from 'react';
import Navbar from './global-components/navbar';
import PageHeader from './global-components/page-header';
import Mission from './section-components/mission';
import AboutUs from './section-components/about-us';
import ServiceTwo from './section-components/service-two';
import Footer from './global-components/footer';
import Professional from './section-components/professional';
import SellHome from './section-components/sellhome';
import Process from './section-components/process';

const About = () => {
    return <div>
        <Navbar />
        <PageHeader headertitle="Prime Properties" />
        <Mission />
        <AboutUs />
        <ServiceTwo />   
        <SellHome />             
        <Process />
        <Professional />
        <Footer />
    </div>
}

export default About

