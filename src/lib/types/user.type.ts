enum Role {
    STUDENT = 'student',
    TEACHER = 'teacher',
    ADMIN = 'admin',
}

enum UserStatus {
    PENDING_PAYMENT = 'pending_payment',
    APPLIED = 'applied',
    ACCEPTED = 'accepted',
    PROBATION = 'probation',
    EXPELLED = 'expelled',
}

export interface User {
    userId: string;
    name: string;
    email: string;
    profileImage?: string;
    role: Role;
    status: UserStatus;
    isEmailVerified: boolean;
    schoolId?: string;
    createdAt: string;
    updatedAt: string;
}

