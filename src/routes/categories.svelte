<script>
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
        

        li {
            position: relative;
            background-color: #33333d;
            padding: 0 20px;
            a {
                color: #a3a3a3;
                text-decoration: none;
                display: block;
                width: 100%;
                height: 100%;
                padding: 20px 0;
                border-bottom: 1px solid #26262e;
                position: relative;
                transition: .2s;
                &:hover{
                    color: #fff;
                    &:before {
                        width: 100%;
                    }
                }

                &:before {
                    content: '';
                    position: absolute;
                    height: 1px;
                    width: 0;
                    background: rgba(55, 239, 186, .3);
                    top: 100%;
                    left: 0;
                    transition: .2s;
                }
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
        display: inline-block;
        width: 40px;
        height: 100%;
        z-index: 2;
        background-color: transparent;
        color: #a3a3a3;
        top: 0; right: 10px;
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }

    .edit_item_btn{
        position: absolute;
        display: inline-block;
        width: 40px;
        height: 100%;
        z-index: 2;
        background-color: transparent;
        color: #a3a3a3;
        top: 0; right: 50px;
        border: 0;
        outline: 0;
        cursor: pointer;
        &:hover{
            color: #fff;
        }
    }

    
</style>

<svelte:head>
	<title>Категории</title>
</svelte:head>


<section class="category" in:slide out:slide>
    <div class="categories_list">
        <ul>
            {#each categoryService.items as category, i}
                <li>
                    <a href="category_item/{category.id}">
                        { category.name }
                    </a>
                    <button class="edit_item_btn" on:click={() => handleSubmit(category.id, category.name)}><i class="material-icons">edit</i></button>

                        {#if category.visible}
                            <span transition:fade>
                                <input type="text" bind:value={category.name}>
                                <button type="submit" on:click={handleSubmit(category.id, category.name)}>submit</button>
                            </span>
                        {/if}

                    <button 
                        class="delete_item_btn"
                        on:click={removeCategory(category.id)}><i class="material-icons">close</i></button>
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

