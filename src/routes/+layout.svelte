<script lang='ts'>
	import "../app.pcss";
	import Navbar from "$lib/components/Navbar.svelte";
	import { page } from "$app/stores";
	import { ModeWatcher, setMode } from "mode-watcher";
	setMode("dark")
</script>

<ModeWatcher />
{#if $page.route.id !== "/editor"}
	<Navbar />
{/if}
<slot />
