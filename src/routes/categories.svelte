<script>
    import {fly, slide, fade, scale} from 'svelte/transition';
    import ButtonApply from '../components/UI/ButtonApply.svelte';
    import InputText from '../components/UI/InputText.svelte';

    import CategoryService from '../service-finance';

    let categoryService = new CategoryService();

    let popularCategories  = [];
    let customCategoryName = '';

    const clearInput = () => {
        customCategoryName = '';
    }

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

<svelte:head>
	<title>Категории</title>
</svelte:head>


<section class="category">
    <div class="categories_list" out:slide>
        <ul>
            {#each categoryService.items as category (category.id)}
                <li transition:slide>
                    <a href="category_item/{category.id}">
                        { category.name }
                    </a>
                    <button class="edit_item_btn" on:click={() => handleSubmit(category.id, category.name)}><i class="material-icons">edit</i></button>

                    {#if category.visible}
                        <span class="edit_box">
                            <InputText bind:newValue={category.name} pholder />
                            <ButtonApply on:click={handleSubmit(category.id, category.name)}><i class="material-icons">check</i></ButtonApply>
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
            <div class="inp_wrap">
                <InputText pholder="Введите название категории" bind:newValue={customCategoryName} />
                {#if customCategoryName.length > 0}
                    <i class="material-icons" on:click={clearInput}>close</i>
                {/if}
            </div>
            <ButtonApply on:click={ addCategory } >Добавить</ButtonApply>
        </div>
    </div>
</section>

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
                }
            }
        }

        .need_more {
            pointer-events: none;
            color: #a3a3a3;
            margin-top: 10px;
        }
    }

    .add_category {
        display: flex;
        padding: 10px 20px;
        align-items: center;
    }

    .inp_wrap{
        width: 50%;
        margin-right: 10px;
        position: relative;
        i {
            position: absolute;
            color: #a3a3a3;
            right: 7px;
            top: 7px;
            cursor: pointer;
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

    .edit_box {
        position: absolute;
        top: 8px;
        display: flex;
        font-size: 14px;

        i {
            font-size: 12px;
        }
    }

    
</style>