import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/courses/[slug]/$types";
import client from "$lib/client";

const getAvailability = (dateString: string) => {
    const date = new Date(dateString);
    if (date.toLocaleDateString() === "Invalid Date") return true;
    const now = new Date()
    return date <= now;
}

const getLesson = async (slug: string) => {
    const response = await client.get('/lessons/'+slug);
    return response.data;
}

const getNextLesson = async (slug: string) => {
    const response = await client.get('/lessons/'+slug+'/next');
    return response.data;
}

const getPreviousLesson = async (slug: string) => {
    const response = await client.get('/lessons/'+slug+'/previous');
    return response.data;
}

export const load: PageLoad = async ({ params }) => {
    const lesson = await getLesson(params.slug);
    const nextLesson = await getNextLesson(params.slug);
    const previousLesson = await getPreviousLesson(params.slug);


    return {
        lesson,
        nextLesson,
        previousLesson
    };
}