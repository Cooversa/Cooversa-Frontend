<script lang="ts">
	import {onMount} from "svelte";
	import {slide} from "svelte/transition";

	let mobileNavOpen = false;

	const toggleNav = () => {
		mobileNavOpen = !mobileNavOpen;
	};

	let visibleNav = true;
    let lastScrollY = 0;
	let addShadow = false;

    const setShow = (value: boolean) => {
        visibleNav = value;
    }

    const setLastScrollY = (value: number) => {
        lastScrollY = value;
		addShadow = value > 0;
    }

    const controlNavbar = () => {
        if (typeof window !== 'undefined') {
            if (window.scrollY > lastScrollY) { // if scroll down hide the navbar
                setShow(false);
            } else {
                setShow(true);
            }

            // remember current page location to use in the next move
            setLastScrollY(window.scrollY);
        }
    };

    onMount(() => {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', controlNavbar);
        }
    });
</script>

<div id="navbar" class:with-shadow={addShadow}>
	{#if visibleNav}
		<div in:slide={{
			start: 0,
			duration: 200
		}} out:slide={{
			start: 0,
			duration: 200
		}} class="navbar-wrapper">
			<!--Logo-->
			<a href="/">
				<img class="brand-logo" src="transparent-icon.svg" alt="Cooversa Logo" />
			</a>

			<!-- Primary Nav -->
			<nav class="primary-nav">
				<a href="#curriculum" class="primary-nav-item">Curriculum</a>
				<a href="#faq" class="primary-nav-item">FAQs</a>
				<a href="#tuition" class="primary-nav-item">Tuition</a>
				<a href="#about" class="primary-nav-item">About us</a>
			</nav>

			<!-- Secondary Nav -->
			<nav class="secondary-nav space-x-[80px]">
				<a href="/apply" class="secondary-nav-item">Apply Now</a>
			</nav>

			<!-- Mobile Nav Toggler -->
			<button on:click={toggleNav} class="mobile-nav-toggle">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					stroke="currentColor"
					class="w-6 h-6"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
					/>
				</svg>
			</button>
		</div>
	{/if}
	<!-- Mobile Nav -->
	<div class={mobileNavOpen ? 'mobile-nav-open' : 'mobile-nav'}>
		<button class="mobile-nav-close" on:click={toggleNav}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</button>
		<div class="mobile-nav-items-wrapper">
			<a on:click={toggleNav} href="#curriculum" class="mobile-nav-item">Curriculum</a>
			<a on:click={toggleNav} href="#faq" class="mobile-nav-item">FAQs</a>
			<a on:click={toggleNav} href="#tuition" class="mobile-nav-item">Tuition</a>
			<a on:click={toggleNav} href="#about" class="mobile-nav-item">About Us</a>
			<a on:click={toggleNav} href="/apply" class="mobile-nav-item-btn">Apply Now</a>
		</div>
	</div>
</div>

<style>
	#navbar {
		position: fixed;
		width: 100%;
		background-color: #ffffff;
		z-index: 9999;
	}

	#navbar.with-shadow {
		box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
	}

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
		color: #5c57ff;
	}

	.secondary-nav-item {
		background-color: #fff;
		border: #5c57ff 1px solid;
		padding: 10px 20px;
		color: #5c57ff;
		border-radius: 5px;
	}

	.secondary-nav-item:hover {
		background-color: #5c57ff;
		color: #fff;
	}

	.mobile-nav {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #5c57ff;
		color: #ffffff;
		display: none;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transform: translateX(-100%);
		transition: transform 0.3s ease-in-out;
		z-index: 99999;
	}

	.mobile-nav-open {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-color: #5c57ff;
		color: #ffffff;
		display: none;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		transform: translateX(0);
		transition: all 0.3s ease-in-out;
		z-index: 99999;
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
		background-color: #1a1a1a;
		border: #5c57ff 1px solid;
		padding: 10px 20px;
		color: #ffffff;
		border-radius: 5px;
	}

	.mobile-nav-item-btn:hover {
		background-color: #5c57ff;
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
