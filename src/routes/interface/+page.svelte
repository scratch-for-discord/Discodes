<script lang="ts">
	import getLocalDB from "../../lib/utils/localDB/manager"

    const db = getLocalDB()

    if(!db.userID) {
        window.location.replace("/")
    }

    let workspaces = db.workspaces.map((v) => {
        
    })
</script>

<main class="w-screen h-screen">

</main>