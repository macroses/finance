<script>
    import Graph from '../components/Graph.svelte';
    import {fly, slide, fade} from 'svelte/transition';

    import AccountService from '../service-acc';

    let accountService = new AccountService();
    let sumArrFromStore = [];

    if (accountService.items.length === 0) {
        sumArrFromStore = [0];
    } 
    else {
        sumArrFromStore = accountService.items.map(a => parseInt(a.accValue)).reduce((a, b) => a + b);
    }

</script>

<header out:slide>
    {#if accountService.items.length > 0}
        <Graph />
    {:else}
        <div class="promo_descr">Создайте <a href="accounts">счет</a> и начинайте считать свои денежки</div>
    {/if}
    
    <div class="header_box">
        <div class="total_sum"><i class="material-icons">attach_money</i>{ sumArrFromStore }</div>
        <!-- <div class="main_data">
            <div class="main_data_item">
                <div class="title">Доход</div>
                <div class="main_data_item_value profit"><i class="material-icons">attach_money</i>5500</div>
            </div>
            <div class="main_data_item">
                <div class="title">Расход</div>
                <div class="main_data_item_value loss"><i class="material-icons">attach_money</i>800</div>
            </div>
        </div> -->
    </div>
    <!-- <a href="/categories" class="add_operation_link">
        +
    </a> -->
</header>

<style lang="scss">
    .promo_descr{
        font-size: 20px;
        text-align: center;
        padding: 20px;
        a{
            color: #1eb980;
            text-decoration: underline;
            &:hover{
                text-decoration: none;
            }
        }
    }

    header {
        background: #33333d;
        color     : #fff;
        padding   : 10px 0 50px;
        position  : relative;
    }

    .header_box{
        margin-top: 30px;
    }

    .total_sum{
        text-align   : center;
        font-size    : 50px;
        font-weight  : bold;
        margin-bottom: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        i{
            font-size: 45px;
        }
    }

    // .main_data{
    //     display: flex;
    //     justify-content: space-around;
    // }

    // .main_data_item{
    //     font-weight: bold;
    //     font-size: 30px;
    //     text-align: center;
    //     i {
    //         font-size: 30px;
    //     }
    //     .profit{
    //         color: #1eb980;
    //     }
    //     .loss{
    //         color: #ff6859;
    //     }

    //     &_value {
    //         display: flex;
    //         align-items: center;
    //         justify-content: center;
    //     }
    // }

    // .title{
    //     font-size: 15px;
    //     color: #a3a3a3;
    //     margin-bottom: 10px;
    // }

    // .add_operation_link{
	// 	display        : flex;
	// 	align-items    : center;
	// 	justify-content: center;
	// 	text-decoration: none;
	// 	position       : absolute;
	// 	bottom         : -50px;
    //     left           : calc(50% - 50px);
        
	// }

</style>