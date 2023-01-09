<script lang="ts">
    import Banner from "./components/Banner.svelte";
    import CoursesGrid from "$lib/shared/components/CoursesGrid.svelte";
    import {browser} from "$app/environment";
    import {AxiosError} from "axios";
    import {makeAlert} from "$lib/shared/store/alert";
    import client from "$lib/client";
    import type {Course} from "$lib/client/schools/types";


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
        Home - Cooversa Dashboard
    </title>
</svelte:head>

<Banner />

<div class="container pt-16">
    <CoursesGrid {courses} />
</div>
