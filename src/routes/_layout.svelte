<script>
    import MainNav from '../components/MainNav.svelte'
    import {fly, slide, fade} from 'svelte/transition';

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
        overflow: hidden;
        background: #33333d;
    }
    
    :global(body) {
        background-color: #424250;
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