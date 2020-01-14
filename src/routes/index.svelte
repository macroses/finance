<script>
	import Header from '../components/Header.svelte';
	import Graph from '../components/Graph.svelte';

	function changeClass() {
		currentPage = "categories";
	}

</script>

<Header />
<main>
	<Graph />
</main>


<style>
	:global(*){
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	main{
		position: relative;
	}
</style>