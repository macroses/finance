<script>
	import Header from '../components/Header.svelte';
	import Graph from '../components/Graph.svelte';
	import MainNav from '../components/MainNav.svelte';

	let inpValue = "0";
	
	$: if(inpValue > 1000000000) {
		alert('У тебя нет столько денег');
	}
</script>

<div class="wrapper">
	<MainNav />
	<Header {inpValue}/>
	<main>
		<a href="/" class="add_operation_link">+</a>
		<Graph />
		<input type="text" bind:value={inpValue}>
	</main>
	<footer></footer>
</div>

<style>
	:global(*){
		margin: 0;
		padding: 0;
		box-sizing: border-box;
	}

	.wrapper{
		max-width: 768px;
		margin: 0 auto;
		border: 1px solid;
		font-family: 'Roboto Condensed', sans-serif;
	}

	main{
		position: relative;
	}

	.add_operation_link{
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
		font-size: 70px;
		text-decoration: none;
		font-weight: bold;
		position: absolute;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: orange;

		top: -110px;
		left: calc(50% - 50px);
	}
</style>