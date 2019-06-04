import React from 'react';
import styled from 'styled-components';
import MealOptionConfig from './components/meal-options';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as invitationActions from '../../../../shared/state/actions/invitation';
import * as generalActions from '../../../../shared/state/actions/general';

const Content = styled.div`
    max-width: 800px;
    margin: auto;
`;

class GeneralOptions extends React.Component {
    render() {
        const { updateMealOptions, mealOptions, getMealOptions } = this.props;
        return (
            <Content className="py-4">
                <MealOptionConfig
                    mealOptions={mealOptions}
                    onSave={updateMealOptions}
                    onLoad={getMealOptions}
                />
            </Content>
        );
    }
}

const mapStateToProps = state => ({ ...state.invitations, ...state.general });
const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...invitationActions, ...generalActions }, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps,
    null,
    {
        pure: false
    }
)(GeneralOptions);
