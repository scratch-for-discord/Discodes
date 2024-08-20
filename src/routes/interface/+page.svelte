<script lang="ts">
	import Home from "$lib/components/Interface/SideBar/Home.svelte";
	import getLocalDB from "../../lib/utils/localDB/manager"
    import "./interface.css"

    let currentPage: "home"|"workspace"|string = "home"

    const db = getLocalDB()

    if(!db.userID) {
        window.location.replace("/")
    }
</script>

<main class="w-screen h-screen bg-blue-950">
    <div class="w-72 h-72 bg-purple-400 opacity-20 top-6 left-6 border-white border-2 rounded-full absolute shadow-2xl transition-all"></div>
    <div class="flex pt-20 w-full h-full justify-center absolute">
        <div class="glassmorphism mt-8 w-60 h-[80%]">
            <div class="w-full mt-5 px-8">
                <button class="sidebar-tab group hover:bg-gray-400" on:click={() => {
                    if(currentPage === "home") return
                    currentPage = "home"
                }}>
                    <p class="sidebar-text group-hover:text-black">Home</p>
                </button>
                <button class="sidebar-tab group hover:bg-gray-400" on:click={() => {
                    if(currentPage === "workspace") return
                    currentPage = "workspace"
                }}>
                    <p class="sidebar-text group-hover:text-black">Workspaces</p>
                </button>
            </div>
        </div>
        <div class="ml-6 h-[80%] mt-8 w-[70%]">
            {#if currentPage === "home"}
                <Home />
            {/if}
        </div>
    </div>
</main>