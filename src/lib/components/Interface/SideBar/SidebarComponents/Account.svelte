<script lang="ts">
	const user = localStorage.getItem("user");

	if (!user) window.location.replace("/");

	const userJSON = JSON.parse(user!);
</script>

<div class="w-full h-full p-10">
	<div class="bg-slate-900 w-full h-full rounded-lg overflow-hidden">
		<div class="w-full h-40" style={`background-color: ${userJSON.banner_color || "#020617"};`}>
			<img
				src={`https://cdn.discordapp.com/avatars/${userJSON.id}/${userJSON.avatar}.png`}
				alt={`${userJSON.username}'s avatar'`}
				class="rounded-full absolute top-28 left-20 w-40"
			/>
		</div>
		<div class="w-full mt-24 pl-12">
			<p class="text-3xl font-varela font-extrabold">{userJSON.global_name}</p>
			<p class="font-varela text-gray-500">{userJSON.username}</p>
		</div>
	</div>
</div>
