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

<<<<<<< HEAD
    let courses = getCourses();
=======
    let courses:any = [];

    $: {
        if (!$navigating) {
            getCourses().then((data) => {
                courses = data;
            });
        }
    };
>>>>>>> 2b44bc1ad2339c2845412ce752137a0a821fd3c5

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
