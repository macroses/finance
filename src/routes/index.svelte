<svelte:head>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css">
	<link href="https://fonts.googleapis.com/css?family=Roboto+Condensed:400,700&display=swap&subset=cyrillic" rel="stylesheet">
</svelte:head>

<script>
	import Header from '../components/Header.svelte';
</script>

<div class="wrapper">
	<Header />
	<main>

	</main>
	<footer></footer>
</div>

<style>
	.wrapper{
		max-width: 768px;
		margin: 0 auto;
		border: 1px solid;
		font-family: 'Roboto Condensed', sans-serif;
	}
</style>