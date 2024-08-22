<script lang="ts">
	import { onMount } from "svelte";

    let user: any
    
    onMount(() => {
        // TODO: Implement server side log-in for users instead of locally storing it.
		const userDummy = window.localStorage.getItem("user");

        if (userDummy) user = JSON.parse(userDummy);
    })
</script>

{#if !user}
<a
    href="/auth/login"
    class="text-xl text-gray-300 ml-auto md:mr-24 mr-12 flex items-center justify-center w-32 h-11 rounded-md border-2 border-gray-300 hover:text-gray-50 hover:border-gray-50 transition-all"
>
    Login
</a>
{:else}
<div class="ml-auto md:mr-24 mr-12 flex justify-center items-center">
    <img
        src={`https://cdn.discordapp.com/avatars/691111067807514685/${user.avatar}.png`}
        class="lg:h-14 md:h-12 lg:block md:block hidden rounded-full mr-5"
        alt=""
    />
    <p class="text-2xl font-bold text-white">{user.global_name}</p>
</div>
{/if}