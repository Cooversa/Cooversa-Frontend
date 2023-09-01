<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import WhatWeDo from '$lib/components/WhatWeDo.svelte';
	import AboutUs from '$lib/components/AboutUs.svelte';
	import Curriculum from '$lib/components/Curriculum.svelte';
	import Tuition from '$lib/components/Tuition.svelte';
	import Faq from '$lib/components/Faq.svelte';
	import Loading from '$lib/shared/components/Loading.svelte';
	import loading from '$lib/shared/store/loading.js';
</script>

<svelte:head>
	<title>Cooversa - Get a Software Engineering Diploma</title>
	<meta
		name="description"
		content="Get a top-quality software engineering diploma without breaking the bank. Our program allows you to pay tuition only when you get hired, so you can focus on your studies and future career without financial stress. Enroll now and take the first step towards a rewarding career in software engineering."
	/>
	<meta name="keywords" content="Software, Diploma, Learning" />
	<meta name="og:title" content="Cooversa - Get a Software Engineering Diploma" />
	<meta
		name="og:description"
		content="Discover boundless opportunities with our flexible diploma program"
	/>
	<meta name="og:image" content="https://cooversa.com/about-us.png" />
	<meta name="og:url" content="https://cooversa.com" />
	<meta name="og:site_name" content="Cooversa" />
	<meta name="og:type" content="website" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@cooversa" />
	<meta name="twitter:creator" content="@sheyzi" />
	<meta name="twitter:title" content="Cooversa - Get a Software Engineering Diploma " />
	<meta
		name="twitter:description"
		content="Get a top-quality software engineering diploma without breaking the bank. Our program allows you to pay tuition only when you get hired, so you can focus on your studies and future career without financial stress. Enroll now and take the first step towards a rewarding career in software engineering."
	/>
	<meta name="twitter:image" content="https://cooversa.com/about-us.png" />
	<meta name="twitter:url" content="https://cooversa.com" />
	<meta name="twitter:image:alt" content="Cooversa" />
</svelte:head>

{#if $loading === true}
	<Loading />
{/if}
<Hero />
<WhatWeDo />
<AboutUs />
<Curriculum />
<Tuition />
<Faq />
