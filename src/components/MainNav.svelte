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
        background: #27272f;
        li{
            flex: 1;
            text-align: center;
        }
        img{
            width: 35px;
        }

        a{
            display       : flex;
            align-items: center;
            justify-content: center;
            border-bottom : 3px solid transparent;
            padding: 10px 0;
            color: #a3a3a3;
            text-decoration: none;
            font-weight: bold;
            &.selected{
                border-bottom: 3px solid #37efba;
                color: #fff;
            }

            i {
                margin-right: 10px;
                font-size: 18px;
            }
        }
    }
</style>

<ul class="main_nav">
    <li>
        <a href="." class:selected={segment === undefined}><i class="material-icons">home</i>Home</a>
    </li>
    <li>
        <a href="categories" class:selected={segment === 'categories'}><i class="material-icons">category</i>Categories</a>
    </li>
</ul>