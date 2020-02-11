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
		margin: 20px auto 0;
        font-family: 'Roboto Condensed', sans-serif;
        box-shadow: 0px 4px 10px 5px rgba(0, 0, 0, .5);
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