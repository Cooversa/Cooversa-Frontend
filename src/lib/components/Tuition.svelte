<section id="tuition">
    <div class="wrapper">
        <h2 class="title">We’ve made tuition easy for you!</h2>
        <p class="caption">Learn now, Pay later</p>

        <div class="card_container">
            <div class="card card-1">
                <h3 class="card-title">
                    Application
                </h3>
                <p class="card-text">
                    Register for the course of your choice
                </p>
                <p class="card-price">&#8358;8,000</p>
            </div>

            <div class="card card-2">
                <h3 class="card-title">
                    Tuition
                </h3>
                <p class="card-text">
                    No tuition until you're hired
                </p>
                <div class="flex items-center justify-center space-x-3">
                    <p class="card-price">&#8358;0 <span class="text-sm"></span></p>
                    <p>(until you <br/>get hired)</p>
                </div>
            </div>
        </div>
    </div>
</section>

<style>
    #tuition {
        background-color: #F5F5F5;
        padding: 100px 60px;
    }

    .wrapper {
        max-width: 1300px;
        margin: 0 auto;
        text-align: center;
    }


    .title {
        margin-bottom: 40px;
        font-weight: 700;
        color: #5C57FF;
        font-size: 30px;
        line-height: 36px;
    }

    .caption {
        font-size: 18px;
        line-height: 24px;
        color: #454545;
    }

    .card_container {
        display: flex;
        justify-content: center;
        margin-top: 80px;
        gap: 10px;
    }

    .card {
        width: 300px;
        height: 300px;
        background-color: #fff;
        border-radius: 10px;
        padding: 50px 30px;
    }

    .card-1 {
        background-color: #F5F5F5;
        border: #454545 dashed 1px;
        transform: rotate(-8.7deg);
    }

    .card-2 {
        transform: rotate(8.7deg);
        border: #454545 solid 1px;
    }

    .card-title {
        color: #1A1A1A;
        font-size: 22px;
        font-weight: 600;
        margin-bottom: 30px;
    }

    .card-text {
        margin-bottom: 30px;
        color: #454545;
    }

    .card-price {
        font-size: 56px;
        color: #1A1A1A;
        font-weight: 600;
    }

    @media (max-width: 768px) {
        .card_container {
            flex-direction: column;
        }

        .card {
            width: 100%;
            margin-bottom: 20px;
        }

        .card-1 {
            transform: rotate(0deg);
        }


        .card-2 {
            transform: rotate(0deg);
        }
    }
</style>


