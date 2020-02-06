<script>
    import TransitionWrapper from '../components/TransitionWrapper.svelte';
    import {fly, slide, fade} from 'svelte/transition';
    import CategoryService from '../service-finance';

    let categoryService = new CategoryService();

    let popularCategories  = [];
    let customCategoryName = '';


    if(categoryService.items === null) {
        categoryService.items = [
            {id: 1, name: 'Транспорт', visible: false},
            {id: 2, name: 'Продукты', visible: false},
            {id: 3, name: 'Здоровье', visible: false}
        ];
        localStorage.setItem('arr', JSON.stringify(categoryService.items));
    }

    const addCategory = () => {
        if(customCategoryName === '') {
            return;
        }

        let elem = categoryService.items[categoryService.items.length - 1];

        if(elem === undefined) {
            elem = 1;
        }

        categoryService.items = categoryService.addItem(elem.id, customCategoryName);        
        customCategoryName = '';

        localStorage.setItem('arr', JSON.stringify(categoryService.items));
    }

    const removeCategory = (id) => {
        categoryService.items = categoryService.removeItem(id);
        localStorage.setItem('arr', JSON.stringify(categoryService.items));
    }

    const handleSubmit = (id, name) => {
        categoryService.items = categoryService.editItem(id, name);
        localStorage.setItem('arr', JSON.stringify(categoryService.items));
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

<svelte:head>
	<title>Категории</title>
</svelte:head>

<TransitionWrapper>
    <section class="category">
        <div class="categories_list">
            <ul>
                {#each categoryService.items as category, i}
                    <li in:slide out:slide>
                        <a href="category_item/{category.id}">
                            <b>{ i + 1 }</b>
                            { category.name }
                        </a>
                        <button class="edit_item_btn" on:click={() => handleSubmit(category.id, category.name)}></button>

                            {#if category.visible}
                                <span transition:fade>
                                    <input type="text" bind:value={category.name}>
                                    <button type="submit" on:click={handleSubmit(category.id, category.name)}>submit</button>
                                </span>
                            {/if}

                        <button 
                            class="delete_item_btn"
                            on:click={removeCategory(category.id)}></button>
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
