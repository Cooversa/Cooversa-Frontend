<script lang="ts">
    import Banner from "./components/Banner.svelte";
    import pocketbase from "$lib/pocketbase";
    import CoursesGrid from "$lib/shared/components/CoursesGrid.svelte";
    import {navigating} from "$app/stores";


    const getCourses = async () => {
        if (!$navigating) {
            return (await pocketbase.collection("course").getList(1, 100, {
                sort: "order",
            })).items;
        }
    };

    let courses:any = [];

    $: {
        if (!$navigating) {
            getCourses().then((data) => {
                courses = data;
            });
        }
    };

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
