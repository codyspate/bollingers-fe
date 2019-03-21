import React from 'react';
import styled from 'styled-components';
import css from './home.module.css';
import { Container } from '../../shared/components';
import TopImage from '../../shared/img/pointing.jpg';

const Image = styled.img`
    position: absolute;
    z-index: -1;
`;

const Half = styled.div`
    display: flex;
    flex-basis: 50% auto;
    padding: 1rem;
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
    console.log(props, 'home props');
    return (
        <div className={css.topSection}>
            <Image
                className={css.topSectionImage}
                src={TopImage}
                alt="Madi and Aaron Pointing"
            />
            <Container>
                <Half>
                    <TopSection className={css.topSectionContent}>
                        <h1>Aaron and Madi</h1>
                        <p>November 30, 2019</p>
                        <p>Clovis, CA</p>
                    </TopSection>
                </Half>
            </Container>
        </div>
    );
};

export default Home;
