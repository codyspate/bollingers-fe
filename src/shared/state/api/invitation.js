import gql from 'graphql-tag';
import { client } from '../utils';

export const getInvitations = async () => {
    const query = gql`
        query {
            invitations {
                _id
                guests {
                    _id
                    firstName
                    lastName
                    mealOption
                    songRecommendation
                }
                guestCount
                additionalGuests
            }
        }
    `;
    const { data: { invitations } = {} } = await client.query({
        query
    });
    return invitations;
};
