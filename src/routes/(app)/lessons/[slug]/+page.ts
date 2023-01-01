import pocketbase from "$lib/pocketbase";
import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/courses/[slug]/$types";
import {ClientResponseError, Record} from "pocketbase";

const getLesson = async (slug: string) => {
    const leesson = await pocketbase.collection("lesson").getFirstListItem(`slug="${slug}"`, {
        expand: "module,modules.lesson"
    });
    return leesson;
}

const getNextAndPreviousLessons = async (currentLessonOrderNumber: number) => {
    type Result = {
        nextLesson: Record | null,
        previousLesson: Record | null
    }
    const result: Result = {
        nextLesson: null,
        previousLesson: null
    }

    try {
        const nextLesson = await pocketbase.collection("lesson").getFirstListItem(`order=${currentLessonOrderNumber+1}`)
        if (nextLesson) {
            result.nextLesson = nextLesson
        }
    } catch (e) {
        if (e instanceof ClientResponseError && e.status === 404) {
            result.nextLesson = null
        }
    }

    try {
        const previousLesson = await pocketbase.collection("lesson").getFirstListItem(`order=${currentLessonOrderNumber-1}`)
        if (previousLesson) {
            result.previousLesson = previousLesson
        }
    } catch (e) {
        if (e instanceof ClientResponseError && e.status === 404) {
            result.previousLesson = null
        }
    }

    return result
}

export const load: PageLoad = async ({ params }) => {
    const lesson = await getLesson(params.slug);
    const {nextLesson, previousLesson} = await getNextAndPreviousLessons(lesson.order)

    return {
        lesson,
        modules: lesson.expand.modules,
        nextLesson,
        previousLesson
    };
}