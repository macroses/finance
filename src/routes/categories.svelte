<script>
    import TransitionWrapper from '../components/TransitionWrapper.svelte';

    
    let popularCategories = [];
    let customCategoryName = '';

    let store = JSON.parse(localStorage.getItem('arr'));

    if(store === null) {
        store = [
            {id: 1, name: 'Транспорт', visible: false},
            {id: 2, name: 'Продукты', visible: false},
            {id: 3, name: 'Здоровье', visible: false}
        ];

        localStorage.setItem('arr', JSON.stringify(store));
    }

    popularCategories = store;

    function addCategory() {
        if(customCategoryName === '') {
            return;
        }

        let elem = popularCategories[popularCategories.length -1];

        if(elem === undefined) {
            elem = 1;
        }

        let newObj = {
            id: elem.id === undefined ? 1 : elem.id + 1,
            name: customCategoryName,
            visible: false
        }

        popularCategories = [...popularCategories, newObj];
        customCategoryName = '';

        localStorage.setItem('arr', JSON.stringify(popularCategories));
    }

    function removeCategory(index) {
        popularCategories = [...popularCategories.slice(0, index), ...popularCategories.slice(index + 1)]
        localStorage.setItem('arr', JSON.stringify(popularCategories));
    }

    function handleSubmit(idNum, name) {
        let elem = popularCategories.filter(a => a.id === idNum);
        elem[0].name = name;
        localStorage.setItem('arr', JSON.stringify(popularCategories));
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

        .need_more {
            pointer-events: none;
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

    .edit_item_btn{
        position: absolute;
        background: url(../img/pen.svg) no-repeat;
        background-size: contain;
        display: inline-block;
        width: 20px;
        height: 100%;
        z-index: 2;

        top: 0; right: 30px;
        border: 0;
        outline: 0;
        cursor: pointer;
    }

    
</style>

<TransitionWrapper>
    <section class="category">
        <div class="categories_list">
            <ul>
                {#each popularCategories as category, i}
                    <li>
                        <b>{ i + 1 }</b>
                        { category.name }

                        <button class="edit_item_btn" on:click={() => category.visible = !category.visible}></button>

                            {#if category.visible}
                                <input type="text" bind:value={category.name}>
                                <button type="submit" on:click={() => handleSubmit(category.id, category.name)}>submit</button>
                            {/if}

                        <button 
                            class="delete_item_btn"
                            on:click={() => removeCategory(i)}></button>
                    </li>
                {:else} 
                    <li class="need_more">Добавьте категорию</li>
                {/each}
            </ul>

            <div class="add_category">
                <input type="text" bind:value={ customCategoryName }>
                <button on:click|preventDefault={ addCategory }>Добавить категорию</button>
            </div>
        </div>
    </section>
</TransitionWrapper>
