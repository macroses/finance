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
    let iconVisible = false;
    let iconsArr = new CategoryService().icons;
    let chosenIcon = 'icon';

    const clearInput = () => {
        customCategoryName = '';
    }

    if(categoryService.items === null) {
        categoryService.items = [
            {id: 1, name: 'Транспорт', visible: false, icon: 'directions_car'},
            {id: 2, name: 'Продукты', visible: false, icon: 'local_dining'},
            {id: 3, name: 'Здоровье', visible: false, icon: 'favorite'}
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

        categoryService.items = categoryService.addItem(elem.id, customCategoryName, chosenIcon);        
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

    const showIcons = () => {
        iconVisible = !iconVisible;
    }

    const currentIcon = (icon) => {
        chosenIcon = icon;
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
            <ButtonApply on:click={ addCategory } >Добавить</ButtonApply>
            <div class="icon_container">
                {#if iconVisible}
                    <ul transition:slide>
                        {#each iconsArr as iconItem}
                            <li 
                                class="material-icons"
                                on:click={() => currentIcon(iconItem)} >
                                {iconItem}
                            </li>
                        {/each}
                    </ul>
                {/if}
                
            </div>
            <button on:click={showIcons}><i class="material-icons">{ chosenIcon }</i></button>
        </div>
        <ul>
            {#each categoryService.items as category (category.id)}
                <li transition:slide>
                    <a href="category_item/{category.id}">
                        <div class="category_icon">
                            <i class="material-icons">{ category.icon }</i>
                        </div>
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
    </div>
</section>

<style lang="scss">
    .icon_container {
        position: relative;

        li {
            cursor: pointer;
            font-size: 30px;
            color: #fff;
            margin: 10px;
        }
    }

    .category {
        display: flex;
    }

    .category_icon{
        width: 20px;
        height: 20px;
        border-radius: 6px;
        border: #a3a3a3;
        margin-right: 20px;
        display: inline-block;
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
                    font-size: 20px;
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
        flex-wrap: wrap;
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