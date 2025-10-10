import React from 'react';
import Banner from '../../components/shared/Banner/Banner';
import TopRooms from '../../components/shared/TopRooms/TopRooms';
import About from '../../components/shared/About/About';
import ShowReviews from '../../components/shared/ShowReviews';
import WebsiteReview from '../../components/shared/WebsiteReview';
import LogoMarquee from '../../components/LogoMarquee';
import Article from '../../components/shared/Article/Article';

const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <TopRooms/>
            <Article/>
            <ShowReviews/>
            <WebsiteReview/>
            <LogoMarquee/>
        </div>
    );
};

export default Home;