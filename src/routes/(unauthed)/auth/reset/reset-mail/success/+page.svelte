<script>
	import { Confetti } from 'svelte-confetti';
	import 'iconify-icon';
</script>

<svelte:head>
	<title>Reset Email Successful - Cooversa</title>
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

		<iconify-icon icon="line-md:confirm-circle" style="color: #5c57ff;" width="100" height="100" />

		<h1 class="text-3xl font-bold text-center mt-4">Reset email sent successfully!</h1>
		<p class="text-center text-[#454545] text-[14px] mt-4">
			The next steps will be communicated to you via email.
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
