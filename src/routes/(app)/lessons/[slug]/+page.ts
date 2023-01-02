import pocketbase from "$lib/pocketbase";
import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/courses/[slug]/$types";
import type {Record} from "pocketbase";
import {ClientResponseError} from "pocketbase";

const getAvailability = (dateString: string) => {
    const date = new Date(dateString);
    if (date.toLocaleDateString() === "Invalid Date") return true;
    const now = new Date()
    return date <= now;
}

const getLesson = async (slug: string) => {
    const lesson = await pocketbase.collection("lesson").getFirstListItem(`slug="${slug}"`, {
        expand: "module,modules.lesson"
    });
    return lesson;
}

const getNextAndPreviousLessons = async (currentLessonOrderNumber: number, moduleId: string) => {
    type Result = {
        nextLesson: Record | undefined,
        previousLesson: Record | undefined
    }
    const result: Result = {
        nextLesson: undefined,
        previousLesson: undefined
    }

    const currentModule = await pocketbase.collection("module").getFirstListItem(`id="${moduleId}"`)

    const allModuleLessons =  await pocketbase.collection("lesson").getList(1, 100, {
        filter: `module="${moduleId}"`,
    })





    result.nextLesson = allModuleLessons.items.find((lesson) => lesson.order === currentLessonOrderNumber + 1)
    result.previousLesson = allModuleLessons.items.find((lesson) => lesson.order === currentLessonOrderNumber - 1)

    if (!result.nextLesson) {
        try {
            const nextModule = await pocketbase.collection("module").getFirstListItem(`order=${currentModule.order + 1}`)
            const nextModuleLessons = await pocketbase.collection("lesson").getList(1, 100, {
                filter: `module="${nextModule.id}"`,
            })
            if (getAvailability(nextModule.available_at)) {
                result.nextLesson = nextModuleLessons.items.find((lesson) => lesson.order === 1)
            }
        } catch (e) {
            if (e instanceof ClientResponseError && e.status === 404) {
                result.nextLesson = undefined
            }
        }
    }

    if (!result.previousLesson) {
        try {
            console.log(currentModule.order)
            const previousModule = await pocketbase.collection("module").getFirstListItem(`order=${currentModule.order - 1}`)
            const previousModuleLessons = await pocketbase.collection("lesson").getList(1, 100, {
                filter: `module="${previousModule.id}"`,
            })
            if (getAvailability(previousModule.available_at)) {
                result.previousLesson = previousModuleLessons.items.find((lesson) => lesson.order === previousModuleLessons.items.length)
            }
        } catch (e) {
            console.log(e)
            if (e instanceof ClientResponseError && e.status === 404) {
                result.previousLesson = undefined
            }
        }
    }

    return result
}

export const load: PageLoad = async ({ params }) => {
    const lesson = await getLesson(params.slug);
    const {nextLesson, previousLesson} = await getNextAndPreviousLessons(lesson.order, lesson.module)

    return {
        lesson,
        modules: lesson.expand.modules,
        nextLesson,
        previousLesson
    };
}