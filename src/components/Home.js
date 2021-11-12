import React from "react";
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home-container'>
            <p>Hey, how about some pizza?</p>
            <Link to='/pizza' id='order-pizza'>Order!</Link>
        </div>
    )
}

export default Home;