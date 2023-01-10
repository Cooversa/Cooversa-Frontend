import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/courses/[slug]/$types";
import client from "$lib/client";
import type {Course} from "$lib/client/schools/types";

const getCourse = async (slug: string): Promise<Course> => {
    const response = await client.get('/courses/'+slug);
    return response.data;
}

export const load: PageLoad = async ({ params }) => {
    const course = await getCourse(params.slug);
    const modules = course.modules;

    return {
        course,
        modules,
    };
}