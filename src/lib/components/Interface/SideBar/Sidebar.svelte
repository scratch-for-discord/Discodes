<script lang="ts">
	import "./Sidebar.css";
	// @ts-expect-error the library did not expect a dts file
	import FaHome from "svelte-icons/fa/FaHome.svelte";
	// @ts-expect-error the library did not expect a dts file
	import GoFileDirectory from "svelte-icons/go/GoFileDirectory.svelte";
	// @ts-expect-error the library did not expect a dts file
	import FaUserAlt from "svelte-icons/fa/FaUserAlt.svelte";

	type PageType = "home" | "workspace" | "account";

	export let currentPage: PageType = "home";

	export let isShowing = true;

	function getSetPageFunction(buttonName: PageType) {
		return () => {
			if (buttonName === currentPage) return;
			currentPage = buttonName;
		};
	}
</script>

<div
	class={`top-16 flex flex-col bg-slate-800 left-0 h-[calc(100vh-64px)] md:w-52 lg:w-52 ${isShowing ? "w-52" : "w-0"} transition-all z-10 absolute border-r-[1px] border-gray-950`}
>
	<button
		class={`sidebar-buttons mt-2 lg:flex ${isShowing ? "flex" : "hidden"} md:flex`}
		on:click={getSetPageFunction("home")}
	>
		<div class="icons">
			<FaHome />
		</div>
		Home
	</button>
	<button
		class={`sidebar-buttons lg:flex ${isShowing ? "flex" : "hidden"} md:flex`}
		on:click={getSetPageFunction("workspace")}
	>
		<div class="icons">
			<GoFileDirectory />
		</div>
		Workspaces
	</button>
	<button
		class={`sidebar-buttons lg:flex ${isShowing ? "flex" : "hidden"} md:flex`}
		on:click={getSetPageFunction("account")}
	>
		<div class="icons">
			<FaUserAlt />
		</div>
		Your Account
	</button>
</div>
