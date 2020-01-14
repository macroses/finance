<script>
    
</script>

<header>
    <div class="header_box">
        <div class="total_sum">100000 руб</div>
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
    <a href="/categories" class="add_operation_link">+</a>
</header>

<style lang="scss">
    header {
        background: #aea9f2;
        color: #fff;
        padding: 10px 0 50px;
        position: relative;
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

    .add_operation_link{
		display: flex;
		align-items: center;
		color: #fff;
		justify-content: center;
		font-size: 70px;
		text-decoration: none;
		font-weight: bold;
		position: absolute;
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: orange;

		bottom: -50px;
		left: calc(50% - 50px);
	}

</style>