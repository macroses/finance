<script context="module">
	export async function preload(page) {
        const {idPage} = page.params;
		return { idPage };
    }
</script>

<script>
    import CategoryService from '../../service-finance.js';

    export let idPage;

    let categoryService = new CategoryService();
    let arrFromStore    = JSON.parse(localStorage.getItem('arr'));

    let { id, name, visible } = categoryService.getStoreElem(arrFromStore, idPage);
</script>

<p>новая страница {name}</p>