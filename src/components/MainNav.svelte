<script>
    let currentPage = "home";
    let bool = true;
</script>

<style lang="scss">
    .main_nav{
        display: flex;
        list-style: none;
        align-items: center;
        justify-content: space-around;
        margin-bottom: 20px;
        li{
            flex: 1;
            text-align: center;
        }
        img{
            width: 35px;
        }

        a{
            display: block;
            border-bottom: 3px solid transparent;
            padding-bottom: 10px;
            &.active{
                border-bottom: 3px solid orange;
            }
        }
    }
</style>

<ul class="main_nav">
    <li>
        <a href="." 
            class:active={currentPage === "home" ? 'active' : ''}
            on:click={() => currentPage = "home"}><img src="img/home.svg" alt=""></a>
    </li>
    <li>
        <a href="." 
            class:active={currentPage === "category" ? 'active' : ''}
            on:click={() => currentPage = "category"}><img src="img/folder.svg" alt=""></a>
    </li>
</ul>