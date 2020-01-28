<script context="module">
    let idPage;
	export async function preload(page, session) {
        idPage = page.params.id;
        let data = JSON.parse(localStorage.getItem('arr'));
		return idPage;
    }

    function getCategoryContent() {
        let arrFromStore = JSON.parse(localStorage.getItem('arr'));
        let elemItem = arrFromStore.filter(e => e.id == idPage);
        return console.log(elemItem[0]);
    } 


</script>

<script>
    

</script>

<p on:click={getCategoryContent}>новая страница {idPage}</p>