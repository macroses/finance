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
		font-family: 'Roboto Condensed', sans-serif;
	}

    :global(*) {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    :global(ul) {
        list-style: none;
    }
</style>