<section class="what-we-do">
    <div class="wrapper">
        <div class="card">
            <img src="global.png" alt="Html, Css and Javascript logo" class="card-image">
            <h3 class="card-title">Global Opportunities</h3>
            <p class="card-text">
                With the right training and practice, you will become a very
                skilled software engineer which gives you access to global opportunities.
            </p>
        </div>
        <div class="card">
            <img src="collaborative.png" alt="Circle of people" class="card-image">
            <h3 class="card-title">Collaborative Learning</h3>
            <p class="card-text">
                You will learn through pair programming, group projects,
                career coach guidance, and project reviews.
            </p>
        </div>
        <div class="card">
            <img src="diploma.png" alt="Html, Css and Javascript logo" class="card-image">
            <h3 class="card-title">Get your diploma</h3>
            <p class="card-text">
                With a software engineering diploma, you will be equipped with the knowledge
                and skills needed to pursue a career as a software engineer, where you can design,
                develop, and maintain software systems for a wide range of applications.
            </p>
        </div>
    </div>
</section>

<style>
    .what-we-do {
        max-width: 1300px;
        margin: 0 auto;
        padding: 100px 20px;
    }

    .wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 80px;
    }

    .card {
        border: #454545 solid 1px;
        border-radius: 5px;
        padding: 50px 30px;
        max-width: 500px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 30px;
        color: #1A1A1A;
        height: 380px;
        text-align: center;
    }

    .card-title {
        font-size: 18px;
        line-height: 30px;
        font-weight: 600;
    }

    .card-text {
        color: #454545;
        font-size: 14px;
        line-height: 30px;
        font-weight: 400;
    }

    @media (max-width: 1200px) {
        .what-we-do {
            padding: 100px 20px;
        }

        .wrapper {
            gap: 50px;
        }

        .card {
            padding: 40px 20px;
            gap: 20px;
            max-width: 400px;
        }
    }

</style>