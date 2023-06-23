<script lang="ts">
	export let tooltip: string;
	export let href: string;
</script>

<a
	{href}
	class="bg-primary group p-2.5 flex items-center text-white fixed rounded-full bottom-5 right-5 border border-primary hover:bg-white hover:text-primary z-10"
>
	<iconify-icon icon="akar-icons:plus" width="20" />
	<span
		class="group-hover:opacity-100 transition-opacity text-xs bg-gray-800 px-1 text-gray-100 rounded-md absolute left-1/2 
    -translate-x-[130%]  opacity-0 m-4 mx-auto">{tooltip}</span
	>
</a>
