<script lang="ts">
	import getDB from "$lib/utils/localDB/manager";
    
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [fragment.get('access_token'), fragment.get('token_type')];

    if(!accessToken) {
        window.location.replace("/")
    } else {
        const db = getDB()

        fetch('https://discord.com/api/users/@me', {
            headers: {
                Authorization: `${tokenType} ${accessToken}`
            }
        }).then(r => r.json()).then(v => {
            window.localStorage.setItem("user", JSON.stringify(v))

            db.userID = v.id
            
            window.location.replace("/")
        })
    }
</script>

<main class="w-screen h-screen bg-gradient-to-b flex justify-center text-white items-center text-5xl font-varela font-extrabold from-blue-950 to-gray-900">
    <div class="bg-blend-darken bg-blue-400 w-60 h-60 rounded-full blur-[140px] opacity-75 absolute top-10 left-10"></div>
    <div class="bg-blend-darken bg-purple-400 w-60 h-60 rounded-full blur-[140px] opacity-75 absolute bottom-10 right-10"></div>
    <p class="animate-pulse">Redirecting you ...</p>
</main>