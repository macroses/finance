<script>
	import Header from '../components/Header.svelte';
	import Graph from '../components/Graph.svelte';
	import TransitionWrapper from '../components/TransitionWrapper.svelte';

</script>

<svelte:head>
	<title>Учет расходов и доходов</title>
</svelte:head>

<TransitionWrapper>
	<Header />
	<main>
		<Graph />
	</main>
</TransitionWrapper>


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