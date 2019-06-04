import gql from 'graphql-tag';
import { client } from '../../../../shared/state/utils';

export const search = ({ firstName, lastName }) => {
    const query = gql`
        query($firstName: String, $lastName: String) {
            guests(firstName: $firstName, lastName: $lastName) {
                _id
                firstName
                lastName
            }
        }
    `;

    const { data: { guests } = {} } = client.query({
        query,
        variables: {
            firstName,
            lastName
        }
    });
    return guests;
};
