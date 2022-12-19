<section class="container_about" id="about">
    <div class="wrapper">
        <div>
            <img src="about-us.png" alt="A guy using is laptop">
        </div>

        <div class="content">
            <h2 class="title">Who are we?</h2>
            <p class="mb-[10px] lg:mb-[30px] text">
                COOVERSA is a start-up educational institution that offers you tech diploma programs without
                collecting tuition until you are hired.
                Our innovative approach to education provides you with the skills and knowledge you need to succeed in
                the tech industry, without the burden of student debt.
            </p>
            <p class="text text-2">
                We have assembled a team of experienced and knowledgeable instructors, who will
                deliver our tech programs through a combination of online classes, hands-on workshops,
                peer-to-peer learning, and internships with local and international tech companies.
            </p>
        </div>
    </div>
</section>

<style>
    .container_about {
        background-color: #F5F5F5;
        padding: 100px 60px;
    }

    .wrapper {
        max-width: 1300px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: 1fr 1fr;
        grid-gap: 120px;
    }

    .title {
        margin-bottom: 40px;
        font-weight: 700;
        color: #5C57FF;
        font-size: 30px;
        line-height: 36px;
    }

    .text {
        font-size: 14px;
        color: #454545;
        line-height: 200%;
    }

    @media (max-width: 1200px) {
        .text-2 {
            display: none;
        }
    }

    @media (max-width: 768px) {

        .container_about {
            padding: 50px 30px;
        }
        .wrapper {
            grid-template-columns: 1fr;
            grid-gap: 60px;
        }

        .content {
            grid-column-start: 1;
            grid-row-start: 1;
        }
    }


</style>

