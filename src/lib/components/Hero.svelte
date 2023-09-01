<script lang="ts">
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	let light: HTMLDivElement;
	let squareCount = 0;
	let hero: HTMLElement;
	let mousepos = { x: 0, y: 0 };
	// Calculate the number of squares based on screen width
	function calculateSquareCount() {
		const numCols = Math.ceil(hero.clientWidth / 50);
		const numRows = Math.ceil(hero.clientHeight / 50);

		squareCount = numCols * numRows;
	}

	onMount(() => {
		// calculateSquareCount();
		// window.addEventListener('resize', calculateSquareCount);
		// console.log(squareCount);
	});

	const handleMouseMove = (event: MouseEvent) => {
		// console.log(event);

		let scrollX = document.documentElement.scrollLeft;
		let scrollY = document.documentElement.scrollTop;

		light.style.left = `${event.clientX}px`;
		light.style.top = `${event.clientY}px`;
	};
</script>

<section bind:this={hero} class="hero">
	<div class="hero-content">
		<h1 class="hero-title">
			Discover boundless opportunities with our <span class="hero-title-span text-secondary"
				>flexible diploma program</span
			>
		</h1>
		<img
			src="graduate-cap.svg"
			class="absolute left-20 translate-y-[110%]"
			alt="A graduation cap with green background, here it serves as an icon to register the fact that we are an educational institution into mind of users"
		/>
		<p class="hero-description">
			Accelerate your software engineering career worry-free with Cooversa's tuition aid
		</p>
		<a href="/apply" class="hero-button">Apply now</a>
	</div>
</section>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
	.hero {
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		padding: 60px;
		max-width: 1300px;
		margin: 0 auto;
		overflow: hidden;
		background: url(grid.svg) no-repeat center;
	}

	/* .grid-container .grid {
		position: absolute;
		top: 0;
		left: 0;
		background: url(Squares.jpg) repeat;
		width: 100%;
		height: 100%;
		z-index: -10;
		background-size: 800px;
	} */
	.square-container {
		display: flex;
		position: absolute;
		flex-wrap: wrap;
		align-items: center;
		justify-content: center;
		top: 0;
		height: 100%; /* Set container to full viewport height */
		width: 100%; /* Set container to full viewport width */
		margin: 0;
		padding: 0;
		z-index: -2;
		--x: 0px;
		--y: 0px;
	}

	.square {
		/* Allow squares to grow and shrink as needed */
		width: 50px;
		height: 50px; /* Calculate width based on square count */
		border: red 0.5px solid;
		margin: 0;
		padding: 0;
		/* opacity: 0; */
		-webkit-mask-image: radial-gradient(
			300px circle at var(--x) var(--y),
			black 20%,
			rgba(0, 0, 0, 0.25),
			transparent
		);
		mask-image: radial-gradient(
			300px circle at var(--x) var(--y),
			black 20%,
			rgba(0, 0, 0, 0.25),
			transparent
		);
	}
	/* .square-container::after {
		content: '';
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: radial-gradient(
			rgb(23, 24, 37) 40%,
			rgb(102, 51, 238) 50%,
			rgb(142, 100, 255),
			rgb(249, 38, 114)
		);
		mix-blend-mode: darken;
	} */
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
		color: #a69e9e;
		text-align: center;
		margin: 0;
		padding: 8px 12px;
		border-radius: 30px;
		border: #a69e9e 1px solid;
		width: fit-content;
	}

	.hero-title {
		margin: 20px 0;
		font-size: 48px;
		font-family: 'Plus Jakarta Sans', sans-serif;
		color: #575759;
		font-weight: 600;
		letter-spacing: 0.04em;
		line-height: 67.2px;
		word-wrap: break-word;
		max-width: 900px;
	}

	.hero-description {
		color: #848487;
		font-size: 14px;
		line-height: 150%;
		letter-spacing: 0.04em;
		max-width: 500px;
		margin-bottom: 40px;
	}

	.hero-button {
		background-color: #5c57ff;
		color: #fff;
		padding: 10px 20px;
		border-radius: 5px;
		font-size: 14px;
	}

	.hero-button:hover {
		background-color: #4b46e0;
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
			font-size: 40px;
			max-width: 800px;
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
