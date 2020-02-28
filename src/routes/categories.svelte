<script>
    import {fly, slide, fade, scale} from 'svelte/transition';
    import ButtonApply from '../components/UI/ButtonApply.svelte';
    import InputText from '../components/UI/InputText.svelte';
    import IconList from '../components/UI/IconsList.svelte';

    import CategoryService from '../service-finance';

    let categoryService = new CategoryService();

    let popularCategories  = [];
    let customCategoryName = '';
    let icon = '';

    const clearInput = () => {
        customCategoryName = '';
    }

    if(categoryService.items === null) {
        categoryService.items = [
            {id: 1, name: 'Транспорт', visible: false, icon: '#'+Math.random().toString(16).substr(-6)},
            {id: 2, name: 'Продукты', visible: false, icon: '#'+Math.random().toString(16).substr(-6)},
            {id: 3, name: 'Здоровье', visible: false, icon: '#'+Math.random().toString(16).substr(-6)}
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

        categoryService.items = categoryService.addItem(elem.id, customCategoryName, icon);        
        customCategoryName = '';
        randomColor = '';

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
        <div class="add_category">
            <div class="inp_wrap">
                <InputText pholder="Введите название категории" bind:newValue={customCategoryName} />
                {#if customCategoryName.length > 0}
                    <i class="material-icons" on:click={clearInput}>close</i>
                {/if}
            </div>
            <button class="add_icon" title="Выберите иконку"><i class="material-icons">android</i></button>
            <ButtonApply on:click={ addCategory } >Добавить</ButtonApply>
        </div>
        <ul>
            {#each categoryService.items as category (category.id)}
                <li transition:slide>
                    <a href="category_item/{category.id}">
                        <div class="category_icon" style="background: {category.icon}"></div>
                        { category.name }
                        <i class="material-icons">arrow_right</i>
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

        
        <IconList />

    </div>
</section>

<style lang="scss">
    .category {
        display: flex;
    }

    .add_icon {
        cursor: pointer;
        background: #a3a3a3;
        display: inline-block;
        height: 100%;
        outline: 0;
        margin-right: 10px;
        i{
            font-size: 20px;
        }
    }

    .category_icon{
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: #a3a3a3;
        margin-right: 10px;
    }

    .categories_list {
        flex: 1;
        li {
            position: relative;
            background-color: #33333d;
            padding: 0 20px;
            a {
                display: flex;
                align-items: center;
                color: #a3a3a3;
                text-decoration: none;
                width: 100%;
                height: 100%;
                padding: 20px 0;
                border-bottom: 1px solid #26262e;
                position: relative;
                transition: .2s;
                &:hover{
                    color: #fff;
                }
                i {
                    margin-left: 10px;
                    font-size: 15px;
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