<script lang="ts">
    let faqs = [
        {
            id: 1,
            question: "How does the tuition-free model work?",
            answer: `Tuition for our software engineering bootcamp is not free, but we offer
            a unique payment structure that allows you to pay your tuition after you have gotten hired
            and started earning at least &#8358;250,000 monthly. This means that you can focus on learning and developing
             your skills without the burden of upfront tuition costs. `
        },
        {
            id: 2,
            question: "How long is the program and what is the schedule like?",
            answer: "The program is an 8 months long program. You will learn for 6 months and do a 2 months internship after"
        },
        {
            id: 3,
            question: "Are there any prerequisites for the program?\n",
            answer: `
            This program is meant to take you as a total beginner to a skilled software engineer.
            The only things you will need are
            <ul>
                <li>- A stable internet connection</li>
                <li>- A laptop</li>
                <li>- Motivation</li>
            </ul>
            `
        },
        {
            id: 4,
            question: "How do I apply to the program?",
            answer: `On this page or in the navbar, you will see an <b>"Apply Now"</b> button.
            Click on it and register, after registering you will get a verification mail, click on
            the button in that email to verify your account. Then you will be required to pay the application fee
            and other information's will be passed across to you.`
        },
        {
            id: 5,
            question: 'Will Cooversa help me find a job after I complete the program?',
            answer: `No. You might get contacted by one of our partner companies or you
            will be in a community where job opportunities are shared.`
        },
    ]

    let activeFaqId = 0;

    const changeActiveAccordion = (id) => {
        if (activeFaqId === id) {
            activeFaqId = 0;
        } else {
            activeFaqId = id;
        }
    }
</script>

<section id="faq">
    <div class="wrapper">
        <h2 class="title">FAQs</h2>


        <!-- Accordion -->
        <div class="accordion">
            {#each faqs as faq}
                <div class="accordion-items" class:active={activeFaqId === faq.id}>
                    <div class="accordion-header" on:click={() => changeActiveAccordion(faq.id)} on:keydown={() => console.log('Key Down')}>
                        <h3 class="accordion-title">{faq.question}</h3>
                        <button class="accordion-button" aria-label="Expand Accordion" aria-expanded="false">
                            {#if activeFaqId === faq.id}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            {/if}
                        </button>
                    </div>
                    <div class="accordion-body" class:active={activeFaqId === faq.id}>
                        <p class="accordion-item">
                            {@html faq.answer}
                        </p>
                    </div>
                </div>
            {/each}

        </div>
    </div>
</section>

<style>
    #faq {
        max-width: 1300px;
        margin: 0 auto;
        padding: 100px 60px;
    }


    .title {
        margin-bottom: 40px;
        font-weight: 700;
        color: #5C57FF;
        font-size: 30px;
        line-height: 36px;
        text-align: center;
    }


    .accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .accordion-items {
        background-color: #fff;
        border-radius: 10px;
        padding: 10px ;
    }

    .accordion-items.active {
        background-color: #5C57FF;
    }

    .accordion-items.active .accordion-title {
        color: #fff;
        padding: 20px;
    }

    .accordion-items.active .accordion-button {
        color: #fff;
    }

    .accordion-item {
        border-radius: 10px;
        padding: 10px;
        font-size: 14px;
    }

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .accordion-title {
        font-size: 18px;
        font-weight: 700;
        color: #454545;
    }

    .accordion-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }


    .accordion-body {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;

        background-color: #F5F5F5;
        border-radius: 10px;
    }

    .accordion-body.active {
        max-height: 1000px;
        padding: 20px;
    }


    .accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .accordion-items {
        background-color: #fff;
        border-radius: 10px;
        padding: 10px ;
    }

    .accordion-items.active {
        background-color: #5C57FF;
    }

    .accordion-items.active .accordion-title {
        color: #fff;
        padding: 20px;
    }

    .accordion-items.active .accordion-button {
        color: #fff;
    }

    .accordion-item {
        border-radius: 10px;
        padding: 10px;
        font-size: 14px;
    }

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .accordion-title {
        font-size: 18px;
        font-weight: 700;
        color: #454545;
    }

    .accordion-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }


    .accordion-body {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .accordion-body.active {
        max-height: 1000px;
    }

    .accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }


    .accordion-items {
        background-color: #fff;
        border-radius: 10px;
        padding: 10px ;
    }

    .accordion-items.active {
        background-color: #5C57FF;
    }

    .accordion-items.active .accordion-title {
        color: #fff;
        padding: 20px;
    }

    .accordion-items.active .accordion-button {
        color: #fff;
    }

    .accordion-item {
        border-radius: 10px;
        padding: 10px;
        font-size: 14px;
    }

    .accordion-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        cursor: pointer;
    }

    .accordion-title {
        font-size: 18px;
        font-weight: 700;
        color: #454545;
    }

    .accordion-button {
        background-color: transparent;
        border: none;
        cursor: pointer;
        outline: none;
    }


    .accordion-body {
        max-height: 0;
        overflow: hidden;
        transition: all 0.3s ease;
    }

    .accordion-body.active {
        max-height: 1000px;
    }

    @media (max-width: 768px) {
        #faq {
            padding: 30px 20px;
        }
    }


</style>