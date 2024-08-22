<script lang="ts">
	import Logo from "../static/favicon.png";
	import NavbarLoginComponent from "./NavbarLoginComponent.svelte";
</script>

<nav class="absolute top-0 left-0 z-10 w-screen h-20 flex items-center md:pl-24 pl-12">
	<img src={Logo} alt="Discodes Logo" class="lg:w-16 w-12 rounded-md" />
	<h1 class="font-sans lg:text-3xl md:text-2xl text-xl font-bold ml-4 text-white">Discodes</h1>
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
	{#await Promise.resolve() then _}
		<NavbarLoginComponent />
	{/await}
</nav>
