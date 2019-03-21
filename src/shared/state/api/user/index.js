import gql from 'graphql-tag';
import { client } from '../../utils';

export const SignIn = async ({ email, password }) => {
    const mutation = gql`
        mutation SignIn($email: String, $password: String) {
            signIn(email: $email, password: $password) {
                token
                user {
                    email
                }
            }
        }
    `;
    const { data: { signIn } = {} } = await client.mutate({
        mutation,
        variables: { email, password }
    });
    return signIn;
};
