<script lang='ts'>
    import getDB from "$lib/utils/localDB/manager";
	import WorkspaceCard from "./WorkspaceCard/WorkspaceCard.svelte";

    const db = getDB()

    const workspaces = db.workspaces
</script>

<div class="w-full h-full pl-10 pt-10 lg:pr-10 md:pr-10 pr-0 lg:overflow-auto md:overflow-auto overflow-x-hidden">
    <h1 class="text-4xl font-varela font-extrabold text-white mb-3">Workspaces</h1>
    <button
        class="bg-slate-900 py-1 mb-5 text-gray-300 text-lg font-varela px-5 rounded-lg hover:bg-slate-950 transition-all"
        on:click={() => {
            db.addWorkspace({
                name: "TEST WORKSPACE",
                id: "testinglol",
                files: [],
                createdAt: new Date(),
                lastEditedAt: new Date(),
                owner: "retro",
                description: "test",
                timeWasted: 123,
                editors: [],
                viewers: [],
                token: "icdjasjcndkjacdsa",
                lastOpened: new Date().toISOString()
            })
        }}
    >
        Create Workspace
    </button>
    {#each workspaces as wp, i}
        <WorkspaceCard wp={wp} index={i} />
    {/each}
</div>