export interface School {
    schoolId:    string;
    name:        string;
    slug:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
    students:    string[];
    tracks:      Track[];
}

export interface Track {
    trackId:     string;
    name:        string;
    slug:        string;
    description: string;
    createdAt:   Date;
    updatedAt:   Date;
}


export interface Course {
    courseId:         string;
    name:             string;
    slug:             string;
    excerpt:          string;
    description:      string;
    featuredImage:    string;
    acceptedStatuses: string[];
    createdAt:        Date;
    updatedAt:        Date;
    schoolId:         string;
    school:           School;
    modules:          Module[];
}

export interface Module {
    moduleId:    string;
    name:        string;
    slug:        string;
    order:       number;
    excerpt:     string;
    description: string;
    availableOn: Date;
    courseId:    string;
    createdAt:   Date;
    updatedAt:   Date;
}

