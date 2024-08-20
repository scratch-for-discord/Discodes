<script>
	import "../app.pcss";
	import Navbar from "$lib/components/Navbar.svelte";
</script>

{#await Promise.resolve() then _}
	<Navbar />
{/await}
<slot />
