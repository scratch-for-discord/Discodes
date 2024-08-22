<script lang='ts'>
	import "../app.pcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import { page } from "$app/stores";
</script>

{#if $page.route.id !== "/editor"}
	<Navbar />
{/if}
<slot />
