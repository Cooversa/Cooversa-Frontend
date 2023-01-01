<script lang="ts">
    import Banner from "./components/Banner.svelte";
    import pocketbase from "$lib/pocketbase";
    import CoursesGrid from "$lib/shared/components/CoursesGrid.svelte";

    const getCourses = async () => {
        return (await pocketbase.collection("course").getList(1, 100, {
            sort: "order",
        })).items;
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
