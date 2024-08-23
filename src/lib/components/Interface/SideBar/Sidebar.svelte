<script lang="ts">
    import "./Sidebar.css"
    // @ts-expect-error
    import FaHome from 'svelte-icons/fa/FaHome.svelte'
    // @ts-expect-error
    import GoFileDirectory from 'svelte-icons/go/GoFileDirectory.svelte'

    type PageType = "home"|"workspace"

    export let currentPage: PageType = "home"

    function getSetPageFunction(buttonName: PageType) {
        return () => {
            if(buttonName === currentPage) return
            currentPage = buttonName
        }
    }
</script>

<div class="top-16 flex flex-col left-0 h-[calc(100vh-64px)] w-52 absolute border-r-[1px] border-gray-950">
    <button class="sidebar-buttons mt-2" on:click={getSetPageFunction("home")}>
        <div class="icons">
            <FaHome />
        </div>
        Home
    </button>
    <button class="sidebar-buttons" on:click={getSetPageFunction("workspace")}>
        <div class="icons">
            <GoFileDirectory />
        </div>
        Workspaces
    </button>
</div>