<script>
    import TransitionWrapper from '../components/TransitionWrapper.svelte';

    
    let popularCategories = [];
    let customCategoryName = '';

    let store = JSON.parse(localStorage.getItem('arr'));

    if(store === null) {
        store = [
            {id: 1, name: 'Транспорт'},
            {id: 2, name: 'Продукты'},
            {id: 3, name: 'Здоровье'}
        ];

        localStorage.setItem('arr', JSON.stringify(store));
    }

    popularCategories = store;

    function addCategory() {
        if(customCategoryName === '') {
            return;
        }

        let elem = popularCategories[popularCategories.length -1];

        let newObj = {
            id: elem.id + 1,
            name: customCategoryName
        }

        popularCategories = [...popularCategories, newObj];
        customCategoryName = '';

        localStorage.setItem('arr', JSON.stringify(popularCategories));
    }

    function removeCategory(index) {
        popularCategories = [...popularCategories.slice(0, index), ...popularCategories.slice(index + 1)]
        localStorage.setItem('arr', JSON.stringify(popularCategories));
    }

    $: if(popularCategories.length === 0) {
        // что нибудь добавить, если категории пусты или если остался один элемент массива
    }

</script>

<style lang="scss">
    .category {
        display: flex;
    }

    .categories_list {
        flex: 1;
        background-color: cornsilk;
        li {
            position: relative;
            padding: 10px 20px;
            border-bottom: 1px solid lightgray;
            cursor: pointer;
            text-align: center;
            &:hover {
                background-color: #fff;
            }
        }
    }

    .add_category {
        display: flex;
        flex-direction: column;
        padding: 10px 20px;
        input {
            margin-bottom: 10px;
            padding: 5px 7px;
        }

        button {
            background-color: #ff3e00;
            color: #fff;
            font-size: 25px;
            border: 1px solid lightgray;
            border-radius: 4px;
        }
    }

    .delete_item_btn{
        position: absolute;
        background: url(../img/close.svg) no-repeat;
        background-size: contain;
        display: inline-block;
        width: 20px;
        height: 100%;
        z-index: 2;

        top: 0; right: 0;
        border: 0;
        outline: 0;
        cursor: pointer;
    }
</style>

<TransitionWrapper>
    <section class="category">
        <div class="categories_list">
            <ul>
                {#each popularCategories as {name}, i}
                    <li>
                        { i + 1 }
                        { name }
                        <button 
                            class="delete_item_btn"
                            on:click={() => removeCategory(i)}></button>
                            
                    </li>
                {/each}
            </ul>

            <div class="add_category">
                <input type="text" bind:value={ customCategoryName }>
                <button on:click|preventDefault={ addCategory }>Добавить категорию</button>
            </div>
        </div>
    </section>
</TransitionWrapper>
