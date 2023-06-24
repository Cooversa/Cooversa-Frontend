export interface School {
	schoolId: string;
	courses: Course[];
	name: string;
	slug: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	students: string[];
	tracks: Track[];
}

export interface Track {
	trackId: string;
	name: string;
	schoolId: string;
	slug: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
}

export interface Course {
	courseId: string;
	name: string;
	slug: string;
	excerpt: string;
	description: string;
	featuredImage: string;
	acceptedStatuses: string[];
	createdAt: Date;
	updatedAt: Date;
	schoolId: string;
	school: School;
	modules: Module[];
	tracks: Track[] | string[];
}

export interface CreateCourse {
	name: string;
	excerpt: string;
	description: string;
	featuredImage: string;
	acceptedStatuses: string[];
	schoolId: string;
}

export interface Module {
	moduleId: string;
	name: string;
	slug: string;
	order: number;
	excerpt: string;
	description: string;
	availableOn: Date;
	courseId: string;
	createdAt: Date;
	updatedAt: Date;
}
