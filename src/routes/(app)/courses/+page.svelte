<script lang="ts">
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
