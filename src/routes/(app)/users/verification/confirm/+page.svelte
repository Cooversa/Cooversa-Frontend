<script lang="ts">
    import Loading from "$lib/shared/components/Loading.svelte";
    import {onMount} from "svelte";
    import {AxiosError} from "axios";
    import {page} from "$app/stores";
    import {confirmEmailVerification} from "$lib/client";
    import {initCurrentUser} from "$lib/stores/auth";
    import {browser} from "$app/environment";
    import {makeAlert} from "$lib/shared/store/alert";
    import {goto} from "$app/navigation";

    let loading = false;
    let errorMessage: string | null = null;

    const confirmEmail = async () => {
        loading = true;
        try {
            const token = $page.url.searchParams.get('token')
            if (!token) {
                errorMessage = 'Invalid verification token!'
                return
            }

            await confirmEmailVerification(token)
            await initCurrentUser();
            makeAlert({
                type: 'success',
                title: 'Verification successful',
                content: 'Your email has successfully been verified!'
            })
        } catch (e) {
           if (e instanceof AxiosError) {
               makeAlert({
                   type: 'error',
                   title: 'Verification failed',
                   content: e.response?.data.message || 'Ooops, something went wrong'
               })
               return
           }
            makeAlert({
                type: 'error',
                title: 'Verification failed',
                content: 'Ooops, something went wrong'
            })
        } finally {
            loading = false
            await goto('/dashboard')
        }
    }

    onMount(async () => {
        if (browser) {
            await confirmEmail();
        }
    })
</script>


{#if loading}
    <Loading/>
{:else }
<div class="h-screen flex flex-col px-10 justify-center items-center">
    <div class="max-w-3xl mx-auto text-center space-y-5">
        <h1 class="text-2xl font-semibold">Email confirmed</h1>
        <p>{#if errorMessage}{errorMessage}{:else } Your email has been confirmed successfully {/if}</p>
    </div>
</div>
{/if}