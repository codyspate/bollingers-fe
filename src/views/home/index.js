import React from 'react';
import css from './home.module.css';
import TopImage from '../../shared/img/pointing.jpg';
const Home = () => {
    return (
        <div className={css.topSection}>
            <img
                className={css.topSectionImage}
                src={TopImage}
                alt="Madi and Aaron Pointing"
            />
            <div className={css.topSectionContent}>
                <div className={css.card}>
                    <h1>Aaron and Madi</h1>
                    <p>November 30, 2019</p>
                    <p>Clovis, CA</p>
                </div>
            </div>
        </div>
    );
};

export default Home;
