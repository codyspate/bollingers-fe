import gql from 'graphql-tag';
import { client } from '../../../../shared/state/utils';

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
            additionalGuests
        }
    });
    console.log(data);
};
