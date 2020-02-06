<script>
    export let segment;
</script>

<style lang="scss">
    :global(.main_nav){
        padding        : 0;
        display        : flex;
        list-style     : none;
        align-items    : center;
        justify-content: space-around;
        margin-bottom  : 20px;
        margin-top     : 0;
        li{
            flex: 1;
            text-align: center;
        }
        img{
            width: 35px;
        }

        a{
            display       : block;
            border-bottom : 3px solid transparent;
            padding-bottom: 10px;
            &.selected{
                border-bottom: 3px solid orange;
            }
        }
    }
</style>

<ul class="main_nav">
    <li>
        <a href="." class:selected={segment === undefined}><img src="img/home.svg" alt=""></a>
    </li>
    <li>
        <a href="categories" class:selected={segment === 'categories'}><img src="img/folder.svg" alt=""></a>
    </li>
</ul>