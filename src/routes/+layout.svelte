<script>
    import Navbar from "$lib/components/Navbar.svelte";
    import '../styles/app.css'
    import Footer from "$lib/components/Footer.svelte";
</script>

<Navbar/>
<main class="pt-[100px]">
    <slot></slot>
</main>
<Footer/>