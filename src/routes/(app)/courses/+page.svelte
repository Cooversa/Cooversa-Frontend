<script lang="ts">
    import CoursesGrid from "$lib/shared/components/CoursesGrid.svelte";
    import type {Course} from "$lib/client/schools/types";
    import {browser} from "$app/environment";
    import client from "$lib/client";
    import {AxiosError} from "axios";
    import {makeAlert} from "$lib/shared/store/alert";


    const getCourses = async (): Promise<Course[]> => {
        if (browser) {
            try {
                const response = await client.get('/users/courses/all')
                return response.data
            } catch (e) {
                if (e instanceof AxiosError) {
                    makeAlert({
                        type: "error",
                        title: "Couldn't load courses!",
                        content: e.response.data.message || 'Ooops, something went wrong!'
                    })
                    return
                }
                makeAlert({
                    type: "error",
                    title: "Couldn't load courses!",
                    content: 'Ooops, something went wrong!'
                })
            }
        }
    };

    let courses = getCourses();
</script>


<svelte:head>
    <title>
        Courses - Cooversa Dashboard
    </title>
</svelte:head>

<main>
    <h1 class="text-3xl font-semibold">
        All Courses
    </h1>
    <div class="pt-10 ">
        <CoursesGrid {courses}/>
    </div>
</main>
