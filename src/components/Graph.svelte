<script>
    import Chart from 'chart.js';
    import { onMount } from 'svelte';
    
    let accounts = JSON.parse(localStorage.getItem('accounts'));
    let operations = JSON.parse(localStorage.getItem('operations'));

    let accountNames = accounts.map(e => e.accName);

    function createChart() {
        const ctx = document.getElementById('myChart');
        const myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: accounts.map(e => e.accName),
                datasets: [{
                    label: '',
                    data: accounts.map(e => e.accValue),
                    backgroundColor: [
                        'rgba(181, 63, 38, .5)',
                        'rgba(54, 162, 235, 0.5)',
                        'rgba(255, 206, 86, 0.5)',
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                        'rgba(255, 159, 64, 0.5)'
                    ],
                    borderColor: [
                        'rgba(181, 63, 38, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 2
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true,
                            fontColor: 'lightblue'
                        }
                    }]
                }
            }
        });
    }

    onMount(createChart);
    
</script>

<canvas id="myChart" width="400" height="120"></canvas>