'use client';

import React, { FormEvent, useState } from 'react';
import { User } from '../../components/register_form';
import { useRegisterMutation } from '../../generated/graphql';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import RegisterForm from '../../components/register_form';

const Register = () => {
	const router = useRouter();
	const [register, { loading }] = useRegisterMutation();
	const [user, setUser] = useState<User>({
		username: '',
		email: '',
		password: '',
		picture: '',
	});

	const createUser = React.useCallback(
		async (e: FormEvent) => {
			e.preventDefault();

			try {
				const response = await register({
					variables: {
						options: user,
					},
				});

				// Automatically sign in the user after registration
				await signIn('credentials', {
					email: user.email,
					password: user.password,
					callbackUrl: `${window.location.origin}/`,
				});
				console.log(response);
				router.push('/');
			} catch (error) {
				console.log(error);
			}
		},
		[user]
	);

	return (
		<RegisterForm
			setUser={setUser}
			handleSubmit={createUser}
			user={user}
			submitting={loading}
		/>
	);
};

export default Register;
