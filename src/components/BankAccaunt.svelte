<script>
    import { setContext } from 'svelte';
 
    $: bankAcc = JSON.parse(localStorage.getItem('accounts'));
    export let selectValue;
</script>

<select bind:value={selectValue}>
    <option selected disabled>Выберите счет</option>
    {#each bankAcc as item, i}
        <option value={item.accName}>{item.accName}</option>
    {/each}
</select>


<style>
    select {
        padding: 12px 7px;
        background: #26282f;
        color: #fff;
        font-size: 13px;
        width: 200px;
        border: 0;
        border-radius: 2px;
        transition: .2s;
        outline: 0;
    }
</style>