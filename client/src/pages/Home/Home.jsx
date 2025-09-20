import React from 'react';
import Banner from '../../components/shared/Banner/Banner';
import TopRooms from '../../components/shared/TopRooms/TopRooms';
import About from '../../components/shared/About/About';

const Home = () => {
    return (
        <div>
            <Banner/>
            <About/>
            <TopRooms/>
        </div>
    );
};

export default Home;