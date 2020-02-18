<script>
    import { setContext } from 'svelte';
 
    let bankAcc = JSON.parse(localStorage.getItem('accounts'));
    console.log(bankAcc)
    export let selectValue;
</script>

<select bind:value={selectValue}>
    {#each bankAcc as item, i}
        <option value={item.id}>{item.accName}</option>
    {/each}
</select>


<style>
    select {
        padding: 12px 7px;
        background: #26282f;
        color: #fff;
        font-size: 13px;
        border: 0;
        width: 100%;
        border-radius: 2px;
        transition: .2s;
        outline: 0;
    }
</style>