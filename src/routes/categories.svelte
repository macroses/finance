<script>
    import TransitionWrapper from '../components/TransitionWrapper.svelte';

    let customCategoryName ="";
    // let popularCategories = [
        // "Транспорт",
        // "Продукты",
        // "Здоровье"];

    let popularCategories = [];

    

    // localStorage.setItem('arr', JSON.stringify(popularCategories));

    let store = JSON.parse(localStorage.getItem('arr'));

    if(store === null) {
        store = [ "Транспорт",
        "Продукты",
        "Здоровье"];

        localStorage.setItem('arr', JSON.stringify(store));
    }

    popularCategories = store;

    function addCategory() {
        if(customCategoryName === '') {
            return;
        }

        popularCategories = [...popularCategories, customCategoryName];
        customCategoryName = '';

        localStorage.setItem('arr', JSON.stringify(popularCategories));
    }


</script>

<TransitionWrapper>
    <ul>
        {#each popularCategories as category}
            <li>{category}</li>
        {/each}
    </ul>

    <input type="text" bind:value={customCategoryName}>
    <button on:click|preventDefault={addCategory}>Добавить категорию</button>
</TransitionWrapper>
