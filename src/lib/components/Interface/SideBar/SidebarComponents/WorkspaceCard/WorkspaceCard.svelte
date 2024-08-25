<script lang='ts'>
	import type { DiscodesWorkspace } from "$lib/utils/localDB/manager";
    import "./WorkspaceCard.css"
    import getLocalDB from "$lib/utils/localDB/manager"

    const db = getLocalDB()

    export let wp: DiscodesWorkspace
    export let index: number
</script>

<div class={`lg:w-full md:w-full w-[70vw] lg:h-20 md:h-20 h-16 ${index === 0 ? "border-t-[1px]" : ""} border-b-[1px] flex items-center px-3`}>
    <p class="lg:text-lg md:text-lg text-base text-white font-bold">{wp.name}</p>
    <p class="lg:text-base md:text-base text-sm text-gray-400 mx-auto">{wp.owner}</p>
    <div class="h-full ml-auto flex items-center">
        <a class="util-buttons bg-green-600 mr-2" href={`/editor?id=${wp.id}`}>Edit</a>
        <button class="util-buttons bg-red-600" on:click={() => {
            db.deleteWorkspace(wp.id)
            window.dispatchEvent(new StorageEvent("storage", {
                newValue: localStorage.getItem("workspaces"),
                key: "workspaces"
            }))
        }}>Delete</button>
    </div>
</div>