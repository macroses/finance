<script>
    import MainNav from '../components/MainNav.svelte'

    export let segment;
</script>

<div class="wrapper">
    <MainNav {segment}/>
    <slot></slot>
</div>

<style>
    .wrapper{
		max-width: 768px;
		margin: 0 auto;
		border: 1px solid;
		font-family: 'Roboto Condensed', sans-serif;
	}
</style>