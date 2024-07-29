<script lang="ts">
	import { onMount } from "svelte";
	import Logo from "../static/favicon.png";

	let user: any;

	onMount(() => {
		const userDummy = window.localStorage.getItem("user");

		if (userDummy) user = JSON.parse(userDummy);
	});
</script>

<nav class="absolute top-0 left-0 z-10 w-screen h-20 flex items-center md:pl-24 pl-12">
	<img src={Logo} alt="Discodes Logo" class="w-16 rounded-md" />
	<h1 class="font-sans text-3xl font-bold ml-4 text-white">Discodes</h1>
	<div class="md:flex items-center text-xl text-gray-300 hidden">
		<a href="/">
			<p class="ml-16 hover:text-gray-50 transition-all">Home</p>
		</a>
		<a href="/app/editor">
			<p class="ml-6 hover:text-gray-50 transition-all">Editor</p>
		</a>
		<a href="/blog">
			<p class="ml-6 hover:text-gray-50 transition-all">blog</p>
		</a>
	</div>
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
				class="h-14 rounded-full mr-5"
				alt=""
			/>
			<p class="text-2xl font-bold text-white">{user.global_name}</p>
		</div>
	{/if}
</nav>
