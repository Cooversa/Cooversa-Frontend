import client from "$lib/client";
import type {School} from "$lib/client/schools/types";
import type {User} from "$lib/client/users/types";

export const getSchools = async (): Promise<School[]> => {
    const { data } = await client.get('/schools')
    return data.items
}

export const confirmStudentEnrollmentToSchool = (student: User, school: School) => {
    if (student.schools.some(s => s.schoolId === school.schoolId)) {
        return true
    }
    return false
}


export const enrollStudentToSchool = async (schoolSlug: string) => {
    const { data } = await client.get(`/schools/${schoolSlug}/enroll`)
    return data
}