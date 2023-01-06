import type {CreateProfile, CreateUser, Profile, User} from '$lib/client/users/types';
import client from '$lib/client';
import {AxiosError} from "axios";

export const createUser = async (user: CreateUser): Promise<User> => {
	const response = await client.post('/users', user);
	return response.data;
};

export const loginUser = async (user: CreateUser): Promise<User> => {
	const response = await client.post('/auth/login', user);
	return response.data;
}


export const getLoggedInUser = async (): Promise<User | null> => {
	try {
		const response = await client.get('/auth/me');
		return response.data;
	} catch (e) {
		if (e instanceof AxiosError && e.response?.status === 401) {
			return null;
		}
		throw e;
	}
}

export const logoutUser = async (): Promise<void> => {
	await client.get('/auth/logout');
}

export const createProfile = async (profile: CreateProfile): Promise<Profile> => {
	const response = await client.post('/users/profile', profile);
	return response.data;
}