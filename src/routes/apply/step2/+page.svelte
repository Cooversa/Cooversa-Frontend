<script lang="ts">
    import schema from './schema';
    import type { CreateProfileType } from "./schema";
    import {completeRegistration, verifyPayment} from "./logic";
    import Selector from "$lib/shared/components/Selector.svelte";
    import countries from "$lib/utils/countries.js";
    import {currentUser} from "$lib/stores/auth";
    import {onMount} from "svelte";
    import {goto} from "$app/navigation";
    import {PUBLIC_PAYSTACK_PUBLIC_KEY} from "$env/static/public"
    import {makeAlert} from "$lib/shared/store/alert";
    import {browser} from "$app/environment";

    let values: CreateProfileType = {
        first_name: "",
        last_name: "",
        age: 18,
        phone_number: "",
        gender: '',
        state: "",
        country: "",
        user: $currentUser?.id,
        paid: false,
    };

    const generateTransactionRef = () => {
        let text = '';
        const possible =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 10; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }


    const pay = async () => {
        loading = true;
        try {
            await schema.validate(values, { abortEarly: false });
            let paystack = PaystackPop.setup({
                key: PUBLIC_PAYSTACK_PUBLIC_KEY,
                email: $currentUser?.email,
                amount: 8000 * 100,
                currency: "NGN",
                ref: generateTransactionRef(),
                embed: false,
                disabled: false,
                callback: (response: any) => {
                    submit(response);
                },
                onClose: () => {
                    makeAlert({
                        title: "Payment Cancelled",
                        content: "You cancelled the payment process",
                        type: "error"
                    })
                },
            })
            paystack.openIframe();
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

    }

    let genders = [
        {
            label: 'Male',
            value: 'male'
        },
        {
            label: 'Female',
            value: 'female'
        },
        {
            label: 'Prefer not to say',
            value: 'prefer_not_to_say',
        },
        {
            label: 'Others',
            value: 'others'
        }
    ]

    const selectGender = (e: CustomEvent) => {
        values.gender = e.detail.value;
    }

    const selectCountry = (e: CustomEvent) => {
        values.country = e.detail.value;
    }


    let errors = {};
    let loading = false;

    const submit = async (response: any) => {
        loading = true;
        try {
            await verifyPayment(response.reference)
            values.paid = true;
            await completeRegistration(values)
        } catch (error) {

            errors = error.inner.reduce((acc, err) => {
                return {
                    ...acc,
                    [err.path]: err.message
                };
            }, {});
            console.log(error);
        } finally {
            loading = false;
        }
    };

    onMount(() => {
        console.log($currentUser);
        if (browser) {
            if ($currentUser === null) {
                goto('/auth/login');
            }
        }
    })
</script>

<svelte:head>
    <title>Cooversa - Complete your application</title>
</svelte:head>

<section id="apply">
    <h2 class="title">Continue your application</h2>
    <p class="caption">
        Thank you for your interest in applying to Cooversa. To continue your application process, <br
    />
        please note that you will be charged <b>&#8358;8,000</b>
    </p>
    <form class="form" on:submit|preventDefault={pay}>


        <div class="form-group">
            <label class="form-label" for="first_name">First Name</label>
            <input
                class="form-input"
                type="text"
                name="first_name"
                id="first_name"
                bind:value={values.first_name}
            />
            {#if errors.first_name}
                <p class="form-error">{errors.first_name}</p>
            {/if}
        </div>

        <div class="form-group">
            <label class="form-label" for="last_name">Last Name</label>
            <input
                class="form-input"
                type="text"
                name="last_name"
                id="last_name"
                bind:value={values.last_name}
            />
            {#if errors.last_name}
                <p class="form-error">{errors.last_name}</p>
            {/if}
        </div>

        <div class="form-group">
            <label class="form-label" for="age">Age</label>
            <input
                class="form-input"
                type="number"
                name="age"
                id="age"
                bind:value={values.age}
            />
            {#if errors.age}
                <p class="form-error">{errors.age}</p>
            {/if}
        </div>

        <div class="form-group">
            <label for="phone_number" class="form-label">Phone number</label>
            <input
                class="form-input"
                type="tel"
                name="phone_number"
                id="phone_number"
                placeholder="e.g +234 812 345 6789"
                bind:value={values.phone_number}
            />
            {#if errors.phone_number}
                <p class="form-error">{errors.phone_number}</p>
            {/if}
        </div>


        <div class="form-group">
            <p class="form-label">Gender</p>
            <Selector options={genders} name="Gender" placeholder="Select Gender" on:selected={selectGender}/>
            {#if errors.gender}
                <p class="form-error">{errors.gender}</p>
            {/if}
        </div>

        <div class="form-group">
            <label for="state" class="form-label">State</label>
            <input
                class="form-input"
                type="text"
                name="state"
                id="state"
                placeholder="e.g Lagos"
                bind:value={values.state}
            />
            {#if errors.state}
                <p class="form-error">{errors.state}</p>
            {/if}
        </div>

        <div class="form-group">
            <p class="form-label">Country</p>
            <Selector options={countries} name="Country" placeholder="Select Country" on:selected={selectCountry}/>
            {#if errors.country}
                <p class="form-error">{errors.country}</p>
            {/if}
        </div>

        <button class="form-button">
            {#if loading}
                <!-- Loading spinner -->
                <svg
                        class="animate-spin  h-5 w-5 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                >
                    <circle
                            class="opacity-25
						"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            stroke-width="4"
                    ></circle>
                    <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8v8z"
                    ></path>
                </svg>
            {:else}
                Continue to pay
            {/if}
        </button>
    </form>
</section>

<style>
    #apply {
        max-width: 1300px;
        margin: 0 auto;
        padding: 20px 60px;
    }

    .title {
        margin-bottom: 20px;
        font-size: 65px;
        font-family: Gilmer, sans-serif;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 150%;
    }

    .caption {
        font-size: 14px;
        color: #454545;
        line-height: 200%;
    }

    @media (max-width: 1200px) {
        .title {
            font-size: 50px;
        }
    }

    @media (max-width: 768px) {
        #apply {
            padding: 30px 20px;
        }

        .title {
            font-size: 30px;
        }

        .caption br {
            display: none;
        }
    }
</style>
