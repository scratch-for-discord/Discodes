<script lang="ts">
	import { onMount } from "svelte";

	let animate = false;
	let className = "mt-5 w-0 bg-white border-[1px]";
	onMount(() => {
		setTimeout(() => {
			className = "mt-5 w-full bg-white border-[1px]";
			animate = true;
		}, 50);
	});
</script>

<main class="h-screen w-screen bg-gradient-to-b from-blue-950 to-gray-900 flex">
	<div class="md:w-[60%] w-full h-screen flex items-center justify-center">
		<div>
			<p class="text-3xl text-white font-varela font-extrabold text-center md:text-5xl">
				Login to your account
			</p>
			<div class={`${className} transition-all`}></div>
			<a
				href={`https://discord.com/oauth2/authorize?client_id=1104985401044774953&response_type=token&redirect_uri=${encodeURIComponent(`${window.location.origin}/auth/discord`)}&scope=identify`}
			>
				<div
					class="w-full h-12 text-white bg-gray-700 mt-4 rounded-lg flex justify-center items-center text-xl font-bold"
				>
					Login With Discord
				</div>
			</a>
		</div>
	</div>
	<div
		class="w-[40%] h-screen bg-gradient-to-br from-blue-950 via-blue-950 to-gray-700 md:flex hidden justify-center items-center"
	>
		<div>
			<p class="text-4xl font-extrabold text-white text-center">New Here?</p>
			<div class="w-[50%] text-gray-400 mx-auto mt-3">
				Start exploring the world of visual scripting by making a Discord Bot
			</div>
			<a
				class="mx-auto w-44 mt-5 h-12 flex items-center justify-center rounded-full text-white text-xl font-bold bg-blue-500"
				href="/docs/getting-started">Get started!</a
			>
		</div>
	</div>
	<div
		class={`w-40 h-40 rounded-full blur-sm absolute bg-white opacity-5 right-[15%] top-[20%] transition-all -translate-x-20 ${animate ? "opacity-5 scale-100" : "opacity-0 scale-0"}`}
	></div>
	<div
		class={`w-20 h-20 rounded-full blur-sm absolute bg-white opacity-5 right-[5%] top-[50%] transition-all delay-100 -translate-x-20 ${animate ? "opacity-5 scale-100" : "opacity-0 scale-0"}`}
	></div>
	<div
		class={`w-32 h-32 rounded-full blur-sm absolute bg-white opacity-5 right-[18%] top-[80%] transition-all delay-200 -translate-x-20 ${animate ? "opacity-5 scale-100" : "opacity-0 scale-0"}`}
	></div>
</main>
