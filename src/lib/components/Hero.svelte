<section class="hero">
    <div class="hero-content">
        <p class="hero-pill">Made for developers by developers</p>
        <h1 class="hero-title">Get a <span class="hero-title-span text-primary">diploma</span> in software engineering today </h1>
        <p class="hero-description">Learn the skills necessary to land a job. Learn online and connect to life changing<br/> opportunities. Pay no tuition until you get hired!</p>
        <a href="/apply" class="hero-button">Apply now</a>
    </div>
    <div class="hero-images px-5">
        <img src="hero_blue_guy.png" alt="Hero Circles" class="blue-boy">
        <img src="hero_arrow_left.png" alt="Hero Circles" class="arrow-left">
        <img src="hero_yellow_girl.png" alt="Hero Circles" class="yellow-girl">
        <img src="hero_purple_girl.png" alt="Hero Circles" class="purple-girl">
        <img src="hero_arrow_right.png" alt="Hero Circles" class="arrow-right">
        <img src="hero_yellow_guy.png" alt="Hero Circles" class="yellow-guy">
    </div>

</section>

<style>
    .hero {
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        padding: 60px;
        max-width: 1300px;
        margin: 0 auto;
    }

    .hero-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
    }

    .hero-pill {
        font-size: 12px;
        font-weight: 400;
        color: #A69E9E;
        text-align: center;
        margin: 0;
        padding: 8px 12px;
        border-radius: 30px;
        border: #A69E9E 1px solid;
        width: fit-content;
    }

    .hero-title {
        margin: 20px 0;
        font-size: 65px;
        font-family: Gilmer, sans-serif;
        font-weight: 700;
        letter-spacing: 0.04em;
        line-height: 150%;
        max-width: 900px;
    }

    .hero-title-span {
        font-family: Besley, serif;
        font-weight: 400;
        font-style: italic;
    }

    .hero-description {
        color: #454545;
        font-size: 14px;
        line-height: 150%;
        letter-spacing: 0.04em;
        font-family: Gilmer, sans-serif;
        margin-bottom: 40px;
    }

    .hero-button {
        background-color: #5C57FF;
        color: #fff;
        padding: 10px 20px;
        border-radius: 5px;
        font-size: 14px;
    }

    .hero-button:hover {
        background-color: #4B46E0;
    }

    .blue-boy {
        position: absolute;
        top: 30px;
        left: 0;
    }

    .arrow-left {
        position: absolute;
        top: 170px;
        left: -25px;
    }

    .yellow-girl {
        position: absolute;
        top: 300px;
        left: 80px;
    }

    .purple-girl {
        position: absolute;
        top: 30px;
        right: 0;
    }

    .arrow-right {
        position: absolute;
        top: 170px;
        right: -25px;
    }

    .yellow-guy {
        position: absolute;
        top: 300px;
        right: 80px;
    }


    @media (max-width: 1200px) {
        .hero {
            padding: 60px 20px;
            max-width: 1100px;
        }

        .hero-title {
            font-size: 50px;
        }

        .blue-boy {
            left: 50px;
            width: 70px;
        }

        .purple-girl {
            right: 50px;
            width: 70px;
        }

        .yellow-girl {
            width: 55px;
            top: 250px;
            left: 120px;
        }

        .arrow-left {
            top: 150px;
            left: 45px;
            height: 90px;
        }

        .arrow-right {
            top: 150px;
            right: 45px;
            height: 90px;
        }

        .yellow-guy {
            width: 55px;
            top: 250px;
            right: 120px;
        }
    }
    @media (max-width: 950px) {
        .hero-images {
            display: none;
        }
    }
    @media (max-width: 768px) {
        .hero {
            padding: 30px;
        }

        .hero-description br {
            display: none;
        }

        .hero-images {
            display: none;
        }

        .hero-title {
            font-size: 30px;
        }

        .hero-description {
            font-size: 12px;
            margin-bottom: 20px;
        }

        .hero-button {
            font-size: 12px;
        }
    }

    @media (max-width: 500px) {
        .hero {
            padding: 30px 20px;
        }

        .hero-title {
            font-size: 25px;
        }
    }

</style>