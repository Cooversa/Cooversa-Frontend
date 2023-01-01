import pocketbase from "$lib/pocketbase";
import type {PageLoad} from "../../../../../.svelte-kit/types/src/routes/(app)/courses/[slug]/$types";

const getCourse = async (slug: string) => {
    const course = await pocketbase.collection("course").getFirstListItem(`slug="${slug}"`, {
        expand: "modules",
    });
    return course;
}

const getCourseModules = async (courseId: string) => {
    const modules = await pocketbase.collection("module").getList(1, 100, {
        filter: `course="${courseId}"`,
        expand: "lessons",
        sort: "order",
    });
    return modules;
}

export const load: PageLoad = async ({ params }) => {
    const course = await getCourse(params.slug);
    const modules = (await getCourseModules(course.id)).items;

    // console.log(modules);

    return {
        course,
        modules,
    };
}