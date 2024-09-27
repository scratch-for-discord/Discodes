<script lang="ts">
	import Home from "$lib/components/Interface/SideBar/SidebarComponents/Home.svelte";
	import Sidebar from "$lib/components/Interface/SideBar/Sidebar.svelte";
	import Workspaces from "$lib/components/Interface/SideBar/SidebarComponents/Workspaces.svelte";
	import "./interface.css";
	import { Button } from "$lib/components/ui/button";
	import ChevronLeft from "lucide-svelte/icons/chevron-left";
	import Account from "$lib/components/Interface/SideBar/SidebarComponents/Account.svelte";

	let currentPage: "home" | "workspace" | "account" = "home";
	let isShowing = false;
</script>

<main class="w-screen h-screen bg-slate-800">
	<Sidebar bind:currentPage bind:isShowing />
	<Button
		variant="default"
		class={`absolute ${isShowing ? "left-56" : "left-3 rotate-180"} transition-all z-20 top-20 lg:hidden md:hidden`}
		on:click={() => {
			isShowing = !isShowing;
		}}
	>
		<ChevronLeft />
	</Button>
	<div
		class={`lg:w-[calc(100vw-208px)] md:w-[calc(100vw-208px)] h-[calc(100vh-64px)] w-screen absolute lg:pl-0 md:pl-0 pl-12 top-16 lg:right-0 md:right-0 overflow-x-hidden ${isShowing ? "blur-sm brightness-50 transition-all" : ""}`}
	>
		{#if currentPage === "home"}
			<Home />
		{:else if currentPage === "workspace"}
			<Workspaces />
		{:else if currentPage === "account"}
			<Account />
		{/if}
	</div>
</main>
