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
                    attending
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

export const updateAttendingStatus = async ({ guestId, attending }) => {
    const mutation = gql`
        mutation guest($id: String!, $updateFields: InputGuest2) {
            guest(id: $id, updateFields: $updateFields) {
                _id
                attending
            }
        }
    `;
    const { data: { guest } = {} } = await client.mutate({
        mutation,
        variables: {
            id: guestId,
            updateFields: { attending }
        }
    });
    return guest;
};

export const createInvitation = async ({ guests, additionalGuests }) => {
    const mutation = gql`
        mutation($guests: [InputGuest]!, $additionalGuests: Int) {
            invitation(guests: $guests, additionalGuests: $additionalGuests) {
                guests {
                    firstName
                    lastName
                }
                guestCount
                additionalGuests
            }
        }
    `;
    const data = await client.mutate({
        mutation,
        variables: {
            guests,
            additionalGuests: parseInt(additionalGuests)
        }
    });
    return data;
};
