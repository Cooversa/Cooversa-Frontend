<footer>
    <div class="wrapper">
        <div class="footer-1">
            <img src="/transparent-icon-white.svg" width="100" alt="">
            <div class="social-icons mt-[30px] flex items-center space-x-5">
                <a href="https://facebook.com/profile.php?id=100088533108683" target="_blank" rel="noreferrer">
                    <img src="/facebook-icon.png" alt="Facebook logo">
                </a>
                <a href="https://www.instagram.com/cooversa/" target="_blank" rel="noreferrer">
                    <img src="/instagram-icon.png" alt="Instagram logo">
                </a>
            </div>
        </div>
        <div>
            <h2 class="title">Resources</h2>
            <div class="links space-y-5">
                <a href="/apply" class="link">Apply Now</a>
                <a href="/static#faq" class="link">FAQs</a>
                <a href="/static#curriculum" class="link">Curriculum</a>
            </div>
        </div>
        <div>
            <h2 class="title">Contact</h2>
            <div class="links space-y-5">
                <!-- Telephone -->
                    <a class="flex items-center space-x-5" href="tel:+2349013334883" target="_blank" rel="noreferrer">
                        <img src="/call.png" alt="Telephone Icon">
                        <p>
                            +234 901-333-4883
                        </p>
                    </a>


                    <a class="flex items-center space-x-5" href="https://api.whatsapp.com/send?phone=2349013334883" target="_blank" rel="noreferrer">
                        <img src="/whatsapp.png" alt="Whatsapp Icon">
                        <p>
                            +234 901-333-4883
                        </p>
                    </a>

                <a class="flex items-center space-x-5" href="mailto:info@cooversa.com" target="_blank" rel="noreferrer">
                    <img src="/gmail.png" alt="Telephone Icon">
                    <p>
                        info@cooversa.com
                    </p>
                </a>
            </div>
        </div>
    </div>
    <p class="copyright">
        &copy;2022 COOVERSA, All rights reserved.
    </p>
</footer>


<style>
    footer {
        width: 100%;
        background-color: #5C57FF;
        color: #fff;
        padding: 70px 60px;
    }

    .wrapper {
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-gap: 20px;
    }

    .title {
        font-weight: 700;
        font-size: 18px;
        line-height: 17px;
    }

    .links {
        margin-top: 30px;
    }

    .link {
        font-size: 14px;
        line-height: 17px;
        display: block;
    }

    .copyright {
        margin-top: 30px;
        font-size: 14px;
        font-weight: 700;
    }


    @media screen and (max-width: 768px) {
        footer {
            padding: 50px 20px;
        }

        .wrapper {
            grid-template-columns: 1fr;
        }

        .title {
            margin: 20px 0;

        }
    }
</style>