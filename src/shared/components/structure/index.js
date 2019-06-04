import styled from 'styled-components';

export const Container = styled.div`
    display: ${props => (props.flex ? 'flex' : 'block')};
    flex-direction: ${props => (props.column || props.col ? 'column' : 'row')};
    justify-content: ${props => {
        console.log(props);
        if (props.spaceBetween) return 'space-between';
        return 'start';
    }};
    width: 90%;
    max-width: 1200px;
    margin: auto;
`;
