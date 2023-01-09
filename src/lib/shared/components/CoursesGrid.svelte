<script lang="ts">
    import CourseCard from "$lib/shared/components/CourseCard.svelte";
    import type {Course} from "$lib/client/schools/types";
    export let courses: Promise<Course[]>;
</script>

<div class="grid course-div gap-4">

    {#await courses}
        {#each [1,2,3,4] as number}
            <div class="bg-white rounded-lg shadow-lg p-4 animate-pulse">
                <!-- Image -->
                <div class="h-40 bg-gray-200 rounded"></div>
                <div>
                    <div class="w-full h-5 bg-slate-200 rounded-full mt-5"></div>
                    <div class="w-3/4 h-5 bg-slate-200 rounded-full mt-2"></div>
                    <div class="w-1/2 h-5 bg-slate-200 rounded-full mt-2"></div>
                </div>
            </div>
        {/each}
    {:then courses}
        {#each courses as course}
            <CourseCard course={course} />
        {/each}
    {/await}
</div>



<style>
    .course-div {
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    }
</style>