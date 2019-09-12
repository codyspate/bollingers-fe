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
                    mealChoice
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

export const getInvitation = async ({ id, guestId }) => {
    const query = gql`
        query($id: String, $guestId: String) {
            invitation(id: $id, guestId: $guestId) {
                _id
                guests {
                    _id
                    firstName
                    lastName
                    mealChoice
                    songRecommendation
                    attending
                }
                guestCount
                additionalGuests
            }
        }
    `;
    const { data: { invitation } = {} } = await client.query({
        query,
        variables: { id, guestId }
    });
    return invitation;
};

export const getGuests = async ({ firstName, lastName }) => {
    const query = gql`
        query guests($firstName: String, $lastName: String) {
            guests(firstName: $firstName, lastName: $lastName) {
                _id
                firstName
                lastName
            }
        }
    `;

    const { data: { guests } = {} } = await client.query({
        query,
        variables: {
            firstName,
            lastName
        }
    });
    return guests;
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

export const updateGuest = async (guestId, updateObj) => {
    const mutation = gql`
        mutation($guestId: String!, $updateObj: InputGuest2) {
            guest(id: $guestId, updateFields: $updateObj) {
                _id
                mealChoice
            }
        }
    `;
    try {
        const { data: { guest } = {} } = await client.mutate({
            mutation,
            variables: {
                guestId,
                updateObj
            }
        });
        console.log('updated guest', guest);
        return guest;
    } catch (e) {
        console.error(e, 'Guest update error');
    }
};

export const addGuest = async (invitationId, guest, removeAdditional) => {
    const mutation = gql`
        mutation(
            $invitationId: ID
            $guest: InputGuest
            $removeAdditional: Boolean
        ) {
            addGuest(
                invitationId: $invitationId
                guest: $guest
                removeAdditional: $removeAdditional
            ) {
                _id
                guests {
                    _id
                    firstName
                    lastName
                    mealChoice
                    songRecommendation
                    attending
                }
                guestCount
                additionalGuests
            }
        }
    `;
    const {
        data: { addGuest }
    } = await client.mutate({
        mutation,
        variables: {
            invitationId,
            guest,
            removeAdditional
        }
    });
    return addGuest;
};
