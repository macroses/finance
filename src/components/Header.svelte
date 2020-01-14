<script>
    let totalSum = 0;
    let currentPage = "home";
    export let inpValue;
</script>

<header>
    <div class="header_box">
        <div class="total_sum">{inpValue} руб</div>
        <div class="main_data">
            <div class="main_data_item">
                <div class="title">Доход</div>
                <div class="main_data_item_value profit">+ 5500 руб</div>
            </div>
            <div class="main_data_item">
                <div class="title">Расход</div>
                <div class="main_data_item_value loss">- 800 руб</div>
            </div>
        </div>
    </div>
</header>

<style lang="scss">
    header {
        background: #aea9f2;
        color: #fff;
        padding: 10px 0 50px;
    }

    .total_sum{
        text-align: center;
        font-size: 50px;
        font-weight: bold;
        margin-bottom: 50px;
    }

    .main_data{
        display: flex;
        justify-content: space-around;
    }

    .main_data_item{
        font-weight: bold;
        .profit{
            color: green;
        }
        .loss{
            color: red;
        }
    }

    .title{
        font-size: 25px;
    }

</style>