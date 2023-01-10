<script lang="ts">
    import type {Course} from "$lib/client/schools/types";
    export let course: Course;
</script>

<div class="bg-white rounded-lg shadow-lg p-4">
    <!-- Image -->
    <a href="/courses/{course.slug}">
        <div class="h-48 bg-gray-200 rounded">
            <img src={course.featuredImage} alt={course.title} class="object-cover h-full w-full object-center rounded" />
        </div>
    </a>
    <div class="mt-5">
        <a href="/courses/{course.slug}">
            <h3 class="text-xl font-bold mb-2">{course.name}</h3>
        </a>
        <p class="text-gray-500 line-clamp-3 text-[14px]">{course.excerpt}</p>
    </div>
</div>