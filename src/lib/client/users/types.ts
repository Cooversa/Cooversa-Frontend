import type { School } from '$lib/client/schools/types';

export interface CreateUser {
	email: string;
	password: string;
}

export interface CreateProfile {
	firstName: string;
	lastName: string;
	age: number;
	phoneNumber: string;
	gender: string;
	state: string;
	country: string;
	avatar?: string;
	paymentReference: string;
}

export enum UserRole {
	STUDENT,
	TEACHER,
	ADMIN
}

export interface User {
	userId: string;
	email: string;
	role: string;
	status: string;
	isEmailVerified: boolean;
	profile: Profile;
	schools: School[];
	createdAt: Date;
	updatedAt: Date;
}

export interface Profile {
	profileId: string;
	firstName: string;
	lastName: string;
	age: number;
	phoneNumber: string;
	gender: string;
	state: string;
	country: string;
	avatar: string;
	paymentReference: string;
	userId: string;

	user?: User;

	createdAt: Date;
	updatedAt: Date;
}
