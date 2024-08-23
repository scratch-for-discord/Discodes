<script lang="ts">
	import Home from "$lib/components/Interface/SideBar/SidebarComponents/Home.svelte";
	import Sidebar from "$lib/components/Interface/SideBar/Sidebar.svelte";
	import Workspaces from "$lib/components/Interface/SideBar/SidebarComponents/Workspaces.svelte";
	import getLocalDB from "../../lib/utils/localDB/manager"
    import "./interface.css"

    let currentPage: "home"|"workspace" = "home"

    const db = getLocalDB()

    if(!db.userID) {
        window.location.replace("/")
    }
</script>

<main class="w-screen h-screen bg-slate-800">
    <Sidebar bind:currentPage />
    <div class="w-[calc(100vw-208px)] h-[calc(100vh-64px)] absolute top-16 right-0">
        {#if currentPage === "home"}
            <Home />
        {:else if currentPage === "workspace"}
            <Workspaces />
        {/if}
    </div>
</main>