<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>
    import CategoryService from '../../service-finance';
    export let idPage;
    let categoryService = new CategoryService();
    let { id, name, visible } = categoryService.getElem(idPage);

    let moneyValue = '';
    let commentValue = '';

</script>

<style>
    h1 {
        font-size: 50px;
        text-align: center;
    }

    input[type=number], textarea {
        width: 100%;
        padding: 5px;
        margin-bottom: 10px;
        font-size: 22px;
    }

    .money_item {
        padding: 10px;
        border: 1px solid lightgray;
    }

    .money_item-value {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 10px;
    }
</style>

<h1>{name}</h1>
<input type="number" placeholder="введите сумму" bind:value={moneyValue}>
<textarea placeholder="Комментарий" bind:value={commentValue}></textarea>
<ul class="money_list">
    <li class="money_item">
        <div class="money_item-value">{moneyValue}</div>
        <div class="money_item-comment">{commentValue}</div>
    </li>
</ul>