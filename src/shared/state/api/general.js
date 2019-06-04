import gql from 'graphql-tag';
import { client } from '../utils';

export const updateMealOptions = async ({ mealOptions }) => {
    const mutation = gql`
        mutation($mealOptions: [String]) {
            mealOptions(names: $mealOptions) {
                _id
                name
            }
        }
    `;
    const { data: { mealOptions: response } = {} } = await client.mutate({
        mutation,
        variables: { mealOptions }
    });
    return response;
};

export const getMealOptions = async () => {
    const query = gql`
        query {
            mealOptions {
                _id
                name
            }
        }
    `;
    const { data: { mealOptions } = {} } = await client.query({
        query
    });
    return mealOptions;
};
