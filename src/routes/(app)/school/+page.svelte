<script lang="ts">
    import {currentUser, initCurrentUser} from "$lib/stores/auth";
    import {enrollStudentToSchool, getSchools} from "$lib/client/schools";
    import {confirmStudentEnrollmentToSchool} from "$lib/client/schools/index.js";
    import {AxiosError} from "axios";
    import {makeAlert} from "$lib/shared/store/alert";
    import type {School} from "$lib/client/schools/types";
    import LoadingSvg from "$lib/shared/components/LoadingSvg.svelte";

    const schools = getSchools();

    let loadingId = '';

    const enrollStudent = async (school: School) => {

        loadingId = school.schoolId;

        try {
            await enrollStudentToSchool(school.slug);
            await initCurrentUser();
        } catch (e) {
            if (e instanceof AxiosError) {
                makeAlert({
                    type: "error",
                    title: "Enrollment failed",
                    content: e.response?.data?.message || "Something went wrong"
                })

                console.error(e.response?.data);
            }

            makeAlert({
                type: "error",
                title: "Enrollment failed",
                content: "Something went wrong"
            })


        } finally {
            loadingId = '';
        }
    }

</script>

<svelte:head>
    <title>Schools - Cooversa Dashboard</title>
</svelte:head>

<h2 class="text-2xl md:text-3xl font-bold">Schools</h2>

<div class="mt-5 space-y-5">
    {#await schools}
        <div class="border p-5 animate-pulse rounded space-y-5 md:flex justify-between items-center">
            <div>
                <div class="bg-slate-200 h-5 rounded md:w-[20rem] w-full"></div>
                <div class="mt-5 space-y-2">
                    <div class="bg-slate-200 h-2 rounded w-[80%]"></div>
                    <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                    <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                </div>
            </div>
            <div>
                <div class="bg-slate-200 h-10 rounded w-28 "></div>
            </div>
        </div>
        <div class="border p-5 animate-pulse rounded space-y-5 md:flex justify-between items-center">
            <div>
                <div class="bg-slate-200 h-5 rounded md:w-[20rem] w-full"></div>
                <div class="mt-5 space-y-2">
                    <div class="bg-slate-200 h-2 rounded w-[80%]"></div>
                    <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                    <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                </div>
            </div>
            <div>
                <div class="bg-slate-200 h-10 rounded w-28 "></div>
            </div>
        </div>
    {:then schools}
        {#if $currentUser}
            {#each schools as school}
            <div class="border p-5 rounded flex justify-between items-center">
                <div>
                    <h3 class="text-xl font-bold">{school.name}</h3>
                    <p class="text-gray-500 text-sm mt-2">{school.description}</p>
                </div>
                <div>
                    <button on:click={async () => {
                        const isEnrolled = await confirmStudentEnrollmentToSchool($currentUser, school);
                        if (!isEnrolled) {
                            await enrollStudent(school);
                        }
                    }} disabled={confirmStudentEnrollmentToSchool($currentUser, school)} class="button {confirmStudentEnrollmentToSchool($currentUser, school) ? 'button-disabled' : ''}">
                        {#if loadingId === school.schoolId}
                            <LoadingSvg/>
                        {:else}
                            {confirmStudentEnrollmentToSchool($currentUser, school) ? 'Enrolled' : 'Enroll'}
                        {/if}
                    </button>
                </div>
            </div>

        {/each}

        {:else}
            <div class="border p-5 animate-pulse rounded space-y-5 md:flex justify-between items-center">
                <div>
                    <div class="bg-slate-200 h-5 rounded md:w-[20rem] w-full"></div>
                    <div class="mt-5 space-y-2">
                        <div class="bg-slate-200 h-2 rounded w-[80%]"></div>
                        <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                        <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                    </div>
                </div>
                <div>
                    <div class="bg-slate-200 h-10 rounded w-28 "></div>
                </div>
            </div>
            <div class="border p-5 animate-pulse rounded space-y-5 md:flex justify-between items-center">
                <div>
                    <div class="bg-slate-200 h-5 rounded md:w-[20rem] w-full"></div>
                    <div class="mt-5 space-y-2">
                        <div class="bg-slate-200 h-2 rounded w-[80%]"></div>
                        <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                        <div class="bg-slate-200 h-2 rounded w-[60%] "></div>
                    </div>
                </div>
                <div>
                    <div class="bg-slate-200 h-10 rounded w-28 "></div>
                </div>
            </div>
        {/if}
    {/await}
</div>
