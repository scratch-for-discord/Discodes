<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
    import getLocalDB, { type DiscodesWorkspace } from "$lib/utils/localDB/manager"

    const db = getLocalDB()

    let wpName = ""
    let botToken = ""

    let isMissingName = false
    let isMissingToken = false

    let isOpen = false
</script>

<Dialog.Root bind:open={isOpen} onOpenChange={(isOpened) => {
    if(isOpened) {
        isMissingName = false
        isMissingToken = false
    }
}}>
	<Dialog.Trigger>
		<button class="bg-slate-900 py-1 mb-5 text-gray-300 text-lg font-varela px-5 rounded-lg hover:bg-slate-950 transition-all">
			Create Workspace
		</button>
	</Dialog.Trigger>
    <Dialog.Content>
        <Dialog.Header>
            <Dialog.Title class="font-bold text-lg text-white">
                Create a new workspace
            </Dialog.Title>
        </Dialog.Header>
        <div class="w-full flex flex-col">
            <label for="wpc-name-input" class="mb-2 outline-none">Workspace name</label>
            <input type="text" id="wpc-name-input" class="py-2 px-3 rounded-md" on:change={(e) => {
                wpName = e.currentTarget.value ?? ""
            }}>
            {#if isMissingName}
                <p class="text-sm text-red-500 mt-2">This Field is required</p>
            {/if}
        </div>
        <div class="w-full flex flex-col">
            <label for="wpc-bot-token" class="mb-2 outline-none">Bot Token</label>
            <input type="text" id="wpc-bot-token" class="py-2 px-3 rounded-md" on:change={(e) => {
                botToken = e.currentTarget.value ?? ""
            }}>
            {#if isMissingToken}
                <p class="text-sm text-red-500 mt-2">This Field is required</p>
            {/if}
        </div>
        <Dialog.Footer>
            <div class="w-full flex justify-end">
                <Dialog.Close>
                    <button class="px-3 py-2 rounded-lg bg-red-600">
                        Close
                    </button>
                </Dialog.Close>
                <button class="px-3 py-2 rounded-lg ml-2 bg-green-600" on:click={() => {
                    if(!wpName || !botToken) {
                        if(!wpName) isMissingName = true
                        if(!botToken) isMissingToken = true
                    }

                    if(wpName) isMissingName = false
                    if(botToken) isMissingToken = false

                    const user = localStorage.getItem("user")

                    if(!user) return window.location.replace("/")

                    db.addWorkspace({
						token: botToken,
						name: wpName,
						createdAt: new Date(),
						lastEditedAt: new Date(),
						id: db.workspaces.length.toString(),
						owner: JSON.parse(user).global_name,
						files: [],
						description: "A Discodes workspace",
						editors: [JSON.parse(user).username],
						viewers: [],
						timeWasted: 0,
						lastOpened: new Date().toISOString()
					})

                    window.dispatchEvent(new StorageEvent("storage", {
                        key: "workspaces",
                        newValue: localStorage.getItem("workspaces")
                    }))

                    isOpen = false
                }}>
                    Create
                </button>
            </div>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
