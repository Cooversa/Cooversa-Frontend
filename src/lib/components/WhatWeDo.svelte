<script lang="ts">
	const cards = [
		{
			title: 'Global Opportunities',
			description:
				'With the right training and practice, you will become a very skilled software engineer which gives you access to global opportunities in top tech industries',
			icon: 'mdi_globe.svg',
			alt: 'The globe in green representing the global opportunities we present our students'
		},
		{
			title: 'Collaborative Learning',
			description:
				'At Cooversa, we believe that collaborative learning not only accelerates your technical skills but also cultivates essential interpersonal skills, teamwork, and adaptability.',
			icon: 'mdi_account-group.svg',
			alt: 'An icon consisting of three faceless heads in color yellow'
		},
		{
			title: 'Productive Community',
			description:
				"Discover the power of our productive community at Cooversa, where you'll engage through social media, receive timely updates, and find dedicated support, all fueling your growth as an aspiring software engineer.",
			icon: 'mdi_lightbulb-on.svg',
			alt: 'A lightbulb representing ideas and productivity'
		},
		{
			title: 'Internship Opportunity',
			description:
				'Cooversa is thrilled to offer an internship opportunity that will provide you with hands-on training, mentorship, and the chance to work on impactful projects. Join us and take the first step towards a successful career in the field.',
			icon: 'mdi_teach.svg',
			alt: 'An icon illustrating someone teaching'
		},
		{
			title: 'Student tuition aid',
			description:
				'Invest in your future without financial worries. At Cooversa, we offer a unique tuition model where you pay only after securing a job that pays over ₦‎250,000 per month, ensuring your success is our priority',
			icon: 'ph_piggy-bank-fill.svg',
			alt: 'A yellow piggy bank'
		},
		{
			title: 'Software engineering diploma',
			description:
				'Rest assured, the software engineering diploma you earn at Cooversa holds great value in the industry. Our program provides a credible and recognized qualification, empowering you to confidently pursue your career goals as a skilled software engineer.',
			icon: 'vaadin_diploma.svg',
			alt: 'An icon illustrating a diploma'
		}
	];
</script>

<section class="what-we-do">
	<div class="w-full mb-20 text-center">
		<h2 class="text-3xl mb-3 font-semibold text-foundationalBlack">Why choose Cooversa?</h2>
		<p class="text-sm text-foundationalBlack">
			We make sure to provide an overall learning experience for our students.
		</p>
	</div>
	<div class="grid grid-cols-3 gap-10  items-center w-full ">
		{#each cards as card}
			<div class="card shadow-md px-7 py-7 transition-all hover:bg-primary hover:text-white">
				<img src={card.icon} alt={card.alt} class="card-image" />
				<h3 class="card-title  text-foundationalBlack ">{card.title}</h3>
				<p class="card-text">
					{card.description}
				</p>
			</div>
		{/each}
	</div>
</section>

<style>
	.what-we-do {
		max-width: 1300px;
		margin: 0 auto;
		padding: 100px 20px;
	}

	.card {
		border-radius: 5px;
		max-width: 22.875rem;
		display: flex;
		flex-direction: column;
		align-items: start;
		gap: 0.5rem;
		color: #1a1a1a;
		text-align: start;
		height: 16.5rem;
	}

	.card:hover > h3 {
		color: white !important;
	}

	.card:hover > p {
		color: white !important;
	}
	.card-title {
		font-size: 1rem;
		line-height: 1.875rem;
		font-weight: 600;
	}

	.card-text {
		color: #454545;
		font-size: 0.6rem;
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
			max-width: 400px;
		}
	}
</style>
