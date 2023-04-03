<script>
	import { Confetti } from 'svelte-confetti';
</script>

<svelte:head>
	<title>Welcome to Cooversa</title>
</svelte:head>

<section class="confirm">
	<div class="wrapper">
		<Confetti
			colorArray={['#ffbe0b', '#fb5607', '#ff006e', '#8338ec', '#3a86ff']}
			x={[-5, 5]}
			y={[-5, 5]}
			amount="1000"
			delay={[0, 1500]}
			cone
		/>

		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke-width="1.5"
			stroke="currentColor"
			class="h-36 w-36 text-[#5C57FF]"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
			/>
		</svg>

		<h1 class="text-3xl font-bold text-center mt-4">Welcome to Cooversa!</h1>
		<p class="text-center text-[#454545] text-[14px] mt-4">
			The next steps will be communicated to you via email. We look forward to seeing you become a
			successful software developer!
		</p>
	</div>
</section>

<style>
	.confirm {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20px 60px;
		flex-direction: column;
		max-width: 1300px;
		margin: 0 auto;
		height: 100%;
	}

	.wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	@media (max-width: 768px) {
		.confirm {
			padding: 60px 30px;
		}
	}
</style>
