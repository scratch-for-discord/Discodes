<script lang='ts'>
    import getDB from "$lib/utils/localDB/manager";
	import CreateWorkspace from "../../CreateWorkspace.svelte";
	import WorkspaceCard from "./WorkspaceCard/WorkspaceCard.svelte";

    const db = getDB()

    let workspaces = db.workspaces

    window.addEventListener("storage", (event) => {
        console.log(event.newValue)
        if(event.key === "workspaces") workspaces = JSON.parse(event.newValue ?? '{"workspaces": []}').workspaces
    })
</script>

<div class="w-full h-full pl-10 pt-10 lg:pr-10 md:pr-10 pr-0 lg:overflow-auto md:overflow-auto overflow-x-hidden">
    <h1 class="text-4xl font-varela font-extrabold text-white mb-3">Workspaces</h1>
    <CreateWorkspace />
    {#each workspaces as wp, i}
        <WorkspaceCard wp={wp} index={i} />
    {/each}
</div>