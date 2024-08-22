<script>
	import "../app.pcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import { showNavbar } from "$lib/stores/navbarStore";
</script>

{#await Promise.resolve() then _}
	{#if showNavbar}
		<Navbar />
	{/if}
{/await}
<slot />
