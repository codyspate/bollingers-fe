import React from 'react';
import styled from 'styled-components';
import css from './home.module.css';
import TopImage from '../../shared/img/pointing.jpg';
import Rsvp from './components/rsvp/index';
import Rules from './components/rules';
import Registry from './components/registry';
import Paper from '@material-ui/core/Paper';
import OneImage from '../../shared/img/IMG_2346.JPG';
import TwoImage from '../../shared/img/IMG_2385.JPG';
import ThreeImage from '../../shared/img/IMG_2317.JPG';
import Image from '../../shared/components/image';

const Content = styled.div`
    padding: 64px 0;
    background-image: ${props => props.backgroundImage};
    background-position: center;
    background-size: ${props => props.backgroundSize || 'cover'};
    /* @media only screen and (max-width: 600px) {
    } */
`;

const TopSection = styled.div`
    font-family: 'mugglenewsregular';
    background-color: rgba(93, 109, 91, 0.79);
    color: #fff;
    padding: 1.5rem;
    border-radius: 16px;
    & > * {
        text-align: center;
    }
    & h1 {
        font-size: 2.8rem;
    }
    & p {
        font-size: 2rem;
    }
`;
const Home = props => {
    return (
        <React.Fragment>
            <Content
                backgroundImage={`url("${TopImage}")`}
                className={css.topSection}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <TopSection className={css.topSectionContent}>
                                <h1>Aaron and Madi</h1>
                                <p>November 30, 2019</p>
                                <p>Clovis, CA</p>
                            </TopSection>
                        </div>
                    </div>
                </div>
            </Content>
            <div className="container py-3">
                <div className="row justify-content-end">
                    <div className="col-12 col-md-4">
                        <Image src={OneImage} />
                    </div>
                    <div className="col-12 col-md-4 mb-4">
                        <Image src={ThreeImage} />
                    </div>
                    <div className="col-12 col-md-4 order-first order-md-last">
                        <Registry className="mb-4" />
                        <Rules className="mb-4" />
                        {/* <Rsvp /> */}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Home;
