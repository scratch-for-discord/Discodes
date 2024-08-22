<script lang="ts">
	import "../app.pcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import { showNavbar } from "$lib/stores/navbarStore";
</script>

{#if showNavbar}
	<Navbar />
{/if}
<slot />
