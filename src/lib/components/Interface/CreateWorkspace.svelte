<script lang="ts">
	import * as Dialog from "$lib/components/ui/dialog";
    import getLocalDB from "$lib/utils/localDB/manager"

    const db = getLocalDB()

    let isOpen = false
</script>

<Dialog.Root bind:open={isOpen}>
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
            <input type="text" id="wpc-name-input" class="py-2 px-3 rounded-md">
        </div>
        <div class="w-full flex flex-col">
            <label for="wpc-bot-token" class="mb-2 outline-none">Bot Token</label>
            <input type="text" id="wpc-bot-token" class="py-2 px-3 rounded-md">
        </div>
        <Dialog.Footer>
            <div class="w-full flex justify-end">
                <button class="px-3 py-2 rounded-lg bg-red-600">
                    Close
                </button>
                <button class="px-3 py-2 rounded-lg ml-2 bg-green-600">
                    Create
                </button>
            </div>
        </Dialog.Footer>
    </Dialog.Content>
</Dialog.Root>
