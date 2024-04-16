import * as React from 'react';
import Slider from '../components/Slider';
import Recommended from '../components/Recommended';
import Latest from '../components/Latest';

const Home = () => {

    return (
        <div>
            <Slider />
            <Recommended />
            <Latest />
        </div>
    );
};

export default Home;