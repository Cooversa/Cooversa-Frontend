<script lang="ts">
    const tracks = [
        {
            id: 1,
            name: 'Fundamentals',
            courses: [
                "Logic Building",
                "HTML",
                "CSS",
                "JavaScript",
            ],
            active: false,
        },
        {
            id: 2,
            name: "Frontend",
            courses: [
                "Tailwind CSS",
                "React",
                "Redux",
                "Next.js",
                "Testing",
                "Data Structures and Algorithms",
            ],
            active: false,
        },
        {
            id: 3,
            name: "Backend",
            courses: [
                "Node.js",
                "Express",
                "Databases and ORMs",
                "Testing",
                "Nest.js",
                "Data Structures and Algorithms",
            ],
            active: false,
        },
    ]

    let activeTrackId = 0;

    const changeActiveAccordion = (id: number) => {
        if (activeTrackId === id) {
            activeTrackId = 0;
        } else {
            activeTrackId = id;
        }
    }
</script>

<section id="curriculum">
    <div class="wrapper">
        <div>
            <h2 class="title">We offer our students a robust curriculum</h2>
            <p class="text">
                At our software engineering bootcamp, we pride ourselves on providing a
                comprehensive and rigorous educational experience for our students.
                That's why we offer a robust curriculum that covers a wide range of
                topics in software development. From foundational programming languages
                to cutting-edge technologies, our curriculum is designed to give our students the
                skills and knowledge they need to succeed in the fast-paced world of tech.
            </p>
            <p class="text text-2">
                Our experienced instructors and hands-on learning approach ensure that
                our students are well-prepared to enter the workforce as professional
                software engineers. Choose our bootcamp and take the first step towards
                a rewarding career in tech.
            </p>
        </div>

        <!-- Accordion -->
        <div class="accordion">
            {#each tracks as track}
                <div class="accordion-items" class:active={activeTrackId === track.id}>
                    <div class="accordion-header" on:click={() => changeActiveAccordion(track.id)} on:keydown={() => console.log('Key Down')}>
                        <h3 class="accordion-title">{track.name}</h3>
                        <button class="accordion-button" aria-label="Expand Accordion" aria-expanded="false">
                            {#if activeTrackId === track.id}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-up"><polyline points="18 15 12 9 6 15"></polyline></svg>
                            {:else}
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-chevron-down"><polyline points="6 9 12 15 18 9"></polyline></svg>
                            {/if}
                        </button>
                    </div>
                    <div class="accordion-body" class:active={activeTrackId === track.id}>
                        <ul class="accordion-list">
                            {#each track.courses as course}
                                <li class="accordion-item">{course}</li>
                            {/each}
                        </ul>
                    </div>
                </div>
            {/each}

        </div>
    </div>
</section>

<style>
    #curriculum {
        background-color: #F5F5F5;
        padding: 100px 60px;
    }

    .wrapper {
        max-width: 1300px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 90px;
    }


    .title {
        margin-bottom: 40px;
        font-weight: 700;
        color: #5C57FF;
        font-size: 30px;
        line-height: 36px;
    }

    .text-2 {
        margin-top: 30px;
    }


    .text {
        font-size: 14px;
        color: #454545;
        line-height: 200%;
    }

    .accordion {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .accordion-list {
        background-color: #F5F5F5;
        border-radius: 10px;
        padding: 20px;
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




    @media (max-width: 1200px) {
        .text-2 {
            display: none;
        }
    }

    @media (max-width: 768px) {
        #curriculum {
            padding: 50px 20px;
        }

        .wrapper {
            grid-template-columns: 1fr;
        }
    }
</style>

