<script lang="ts">
	const steppers = [
		{
			description: `On the hero section (the top section on this site), you will see an <a href="#apply-container" class="text-black">"Apply Now"</a> button. Click on it`
		},
		{
			description: `You will be directed to a registration page. Fill out the forms with the correct information`
		},
		{
			description: `After registering you will get a verification mail, click on the button in that email to verify your account.`
		},
		{
			description: `Then finally you will be required to pay the application fee of ₦8,000 and other information's will be passed across to you.`
		}
	];
</script>

<section id="tuition">
	<div class="wrapper">
		<h2 class="title">We’ve made tuition easy for you!</h2>
		<p class="caption">Learn now, Pay later</p>

		<div class="card_container">
			<div class="card card-1">
				<h3 class="card-title">Application</h3>
				<p class="card-text">Register for the course of your choice</p>
				<p class="card-price">&#8358;8,000</p>
			</div>

			<div class="card card-2">
				<h3 class="card-title">Tuition</h3>
				<p class="card-text">No tuition until you're hired</p>
				<div class="flex items-center justify-center space-x-3">
					<p class="card-price">&#8358;0 <span class="text-sm" /></p>
					<p>(until you <br />get hired)</p>
				</div>
			</div>
		</div>

		<div class="w-full text-start mt-24  items-center flex gap-[120px]">
			<div class="flex w-full flex-col gap-16">
				<div class="flex flex-col gap-3">
					<h3 class="text-3xl font-semibold text-foundationalBlack">How do i pay for tuition?</h3>
					<p class="text-sm text-foundationalBlack">
						Its easy as ABC, all you have to do is follow the steps below to officially join us!
					</p>
				</div>
				<div>
					<ol class="t-stepper">
						{#each steppers as step, id}
							<li
								class="stepper__item text-sm xl:text-base before:bg-success before:text-white before:text-lg"
								data-id={id + 1}
							>
								<div class="stepper__content">
									<p class="stepper__desc text-[#9E9E9F]">
										{@html step.description}
									</p>
								</div>
							</li>
						{/each}
					</ol>
				</div>
				<div id="apply-container" class="flex gap-5">
					<button id="apply-more" class="py-3 text-sm px-10 rounded text-white bg-primary"
						>Apply Now</button
					>
					<button class="py-3 text-sm px-10 rounded border-[#DADADF] text-foundationalBlack border"
						>Learn more</button
					>
				</div>
			</div>
			<div class="w-full h-full">
				<img
					class="w-full h-full"
					src="tuition.png"
					alt="A young man in his early twenties busy with a laptop placed on a table while sitting on a chair, He's leaning forward with the fingers on his right hand on the laptop trackpad while the other arm is resting on the table"
				/>
			</div>
		</div>
	</div>
</section>

<style>
	#tuition {
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
		color: #5c57ff;
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
		background-color: #f5f5f5;
		border: #454545 dashed 1px;
		transform: rotate(-8.7deg);
	}

	.card-2 {
		transform: rotate(8.7deg);
		border: #454545 solid 1px;
	}

	.card-title {
		color: #1a1a1a;
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
		color: #1a1a1a;
		font-weight: 600;
	}

	.t-stepper {
		--size: 2rem;
		--spacing: 0.5rem;
		position: relative;
	}

	.stepper__item {
		display: flex;
		gap: 1rem;
		position: relative;
		padding-bottom: 4rem;
		word-wrap: break-word;
		align-items: center;
	}
	.stepper__item::before {
		--size: 2rem;
		content: attr(data-id);
		position: relative;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		z-index: 1;
		font-size: calc(var(--spacing) * 2);
		flex: 0 0 var(--size);
		height: var(--size);
		border-radius: 50%;
	}
	.stepper__item::after {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: -30px;
		bottom: 0;
		height: 100%;
		transform: translateX(calc(var(--size) / 2));
		width: 1px;
		background-color: #22c55e2c;
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
