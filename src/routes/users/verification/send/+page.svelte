<script lang="ts">
    import schema from "./schema";
    import LoadingSvg from "$lib/shared/components/LoadingSvg.svelte";
    import requestEmailVerification from "./logic";

    let values = {
        email: "",
    }

    let errors = {};
    let loading = false;

    const submit = async () => {
        loading = true;
        try {
            await schema.validate(values, { abortEarly: false });
            await requestEmailVerification(values.email);
            errors = {};
        } catch (error) {
            errors = error.inner.reduce((acc, err) => {
                return {
                    ...acc,
                    [err.path]: err.message
                };
            }, {});
        } finally {
            loading = false;
        }
    };
</script>

<svelte:head>
    <title>
        Request Email Verification
    </title>
</svelte:head>


<section class="confirm">
    <div class="wrapper">
        <h2 class="title">Request Email Verification</h2>
        <form on:submit|preventDefault={submit}>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input class="form-input" type="email" id="email" bind:value={values.email} />
                {#if errors.email}
                    <p class="form-error">{errors.email}</p>
                {/if}
            </div>

            <div class="form-group">
                <button class="form-button" type="submit" disabled={loading}>
                    {#if loading}
                        <LoadingSvg />
                    {:else}
                        Submit
                    {/if}
                </button>
            </div>
        </form>
    </div>
</section>

<style>
    .confirm {
        padding: 20px 60px;
        max-width: 1300px;
        margin: 0 auto;
    }


    .title {
        margin-bottom: 20px;
        font-size: 65px;
        font-family: Gilmer, sans-serif;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 150%;
    }


    @media (max-width: 1200px) {
        .title {
            font-size: 50px;
        }
    }

    @media (max-width: 768px) {
        .title {
            font-size: 30px;
        }
    }
</style>

