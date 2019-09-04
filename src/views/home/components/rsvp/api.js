import gql from 'graphql-tag';
import { client } from '../../../../shared/state/utils';

export const search = async ({ firstName, lastName }) => {
    const query = gql`
        query($firstName: String, $lastName: String) {
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
    console.log('hit');
    return guests;
};
