<script lang="ts">

    let mobileNavOpen = false;

    const toggleNav = () => {
        mobileNavOpen = !mobileNavOpen;
    }
</script>

<div>
    <div class="navbar-wrapper">
        <!--Logo-->
        <a href="/" >
            <img class="brand-logo" src="transparent-icon.svg" alt="Cooversa Logo">
        </a>

        <!-- Primary Nav -->
        <nav class="primary-nav">
            <a href="#curriculum" class="primary-nav-item">Curriculum</a>
            <a href="#curriculum" class="primary-nav-item">FAQs</a>
            <a href="#curriculum" class="primary-nav-item">Tuition</a>
            <a href="#curriculum" class="primary-nav-item">Contact Us</a>
        </nav>

        <!-- Secondary Nav -->
        <nav class="secondary-nav space-x-[80px]">
            <a href="/apply" class="secondary-nav-item">Apply Now</a>
        </nav>

        <!-- Mobile Nav Toggler -->
        <button on:click={toggleNav} class="mobile-nav-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
        </button>

        <!-- Mobile Nav -->
        <div class="{mobileNavOpen? 'mobile-nav-open' : 'mobile-nav'}">
            <button class="mobile-nav-close" on:click={toggleNav}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
            <div class="mobile-nav-items-wrapper">
                <a href="#curriculum" class="mobile-nav-item">Curriculum</a>
                <a href="#curriculum" class="mobile-nav-item">FAQs</a>
                <a href="#curriculum" class="mobile-nav-item">Tuition</a>
                <a href="#curriculum" class="mobile-nav-item">Contact Us</a>
                <a href="/apply" class="mobile-nav-item-btn">Apply Now</a>
            </div>
        </div>
    </div>
</div>

<style>
    .navbar-wrapper {
        max-width: 1560px;
        margin: 0 auto;
        padding: 30px 60px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
    }

    .brand-logo {
        width: 100px;
    }

    .primary-nav-item {
        padding: 0 20px;
    }

    .primary-nav-item:hover {
        color: #5C57FF;
    }

    .secondary-nav-item {
        background-color: #fff;
        border: #5C57FF 1px solid;
        padding: 10px 20px;
        color: #5C57FF;
        border-radius: 5px;
    }

    .secondary-nav-item:hover {
        background-color: #5C57FF;
        color: #fff;
    }

    .mobile-nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #5C57FF;
        color: #ffffff;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translateX(-100%);
        transition: transform 0.3s ease-in-out;
    }

    .mobile-nav-open {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: #5C57FF;
        color: #ffffff;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: translateX(0);
        transition: all 0.3s ease-in-out;
    }

    .mobile-nav-items-wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .mobile-nav-item {
        padding: 20px 0;
    }

    .mobile-nav-item-btn {
        background-color: #1A1A1A;
        border: #5C57FF 1px solid;
        padding: 10px 20px;
        color: #ffffff;
        border-radius: 5px;
    }

    .mobile-nav-item-btn:hover {
        background-color: #5C57FF;
        color: #fff;
    }

    .mobile-nav-close {
        position: absolute;
        top: 20px;
        right: 20px;
    }

    .mobile-nav-toggle {
        display: none;
    }

    @media (max-width: 1200px) {
        .navbar-wrapper {
            max-width: 1300px;
        }
    }


    @media (max-width: 768px) {
        .navbar-wrapper {
            padding: 30px 20px;
        }

        .primary-nav {
            display: none;
        }

        .secondary-nav {
            display: none;
        }

        .mobile-nav {
            display: flex;
        }


        .mobile-nav-open {
            display: flex;
        }

        .mobile-nav-toggle {
            display: flex;
        }
    }
</style>