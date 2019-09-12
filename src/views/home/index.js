import React from 'react';
import styled from 'styled-components';
import css from './home.module.css';
import TopImage from '../../shared/img/pointing.jpg';
import Rsvp from './components/rsvp/index';
import Rules from './components/rules';
import Registry from './components/registry';
import OneImage from '../../shared/img/IMG_2346.JPG';
import ThreeImage from '../../shared/img/IMG_2317.JPG';
import Image from '../../shared/components/image';
import SunFlower from '../../shared/img/sun-flower.jpg';

const Content = styled.div`
    padding: 64px 0;
    background-image: ${props => props.backgroundImage};
    background-position: center;
    background-size: ${props => props.backgroundSize || 'cover'};
    /* @media only screen and (max-width: 600px) {
    } */
`;

const TopSection = styled.div`
    font-family: 'Northwell Alt';
    background-color: rgba(93, 109, 91, 0.95);
    color: #fff;
    padding: 1.5rem;
    border-radius: 16px;
    & > * {
        text-align: center;
    }
    & h1 {
        font-size: 4.8rem;
    }
    & p {
        font-size: 3rem;
    }
    .bold {
        font-weight: bold;
    }
    & span {
        font-size: 2rem;
        display: block;
        &.big {
            font-size: 3rem;
            font-weight: bold;
        }
    }
`;

const ImageWrapper = styled.div`
    background-image: url(${TopImage});
    background-position: center;
    background-size: cover;
    height: 100%;
    border-radius: 16px;
`;

const Wrapper = styled.div`
    background-image: url(${SunFlower});
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    background-repeat: no-repeat;
`;
const Home = props => {
    return (
        <Wrapper>
            <Content
                // backgroundImage={`url("${TopImage}")`}
                className={css.topSection}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 mb-3">
                            <TopSection className={css.topSectionContent}>
                                <h1 className="bold">Aaron and Madi</h1>
                                <span>November 30, 2019</span>
                                <span className="pb-5">Clovis, CA</span>
                                <span className="big">Ceremony</span>
                                <span>3:30pm Mercedes Edwards Theatre</span>
                                <span className="big">Reception</span>
                                <span>
                                    4:30 - 10:30pm Classic Catering at 625
                                </span>
                            </TopSection>
                        </div>
                        <div className="col-12 col-md-6 mb-3">
                            <ImageWrapper>
                                {/* <img
                                    src={TopImage}
                                    alt="Madi and Aaron pointing"
                                /> */}
                            </ImageWrapper>
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
                        <Rsvp className="mb-4" />
                        <Registry className="mb-4" />
                        <Rules className="mb-4" />
                    </div>
                </div>
            </div>
        </Wrapper>
    );
};

export default Home;
