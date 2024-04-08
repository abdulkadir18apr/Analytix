    import  { useEffect, useRef } from 'react';
    import Chart from 'chart.js/auto';
    import zoomPlugin from 'chartjs-plugin-zoom';

    // eslint-disable-next-line react/prop-types
    export const BarChart = ({ data,onBarClick }) => {
    const chartContainer = useRef(null);
   

    useEffect(() => {
        if (chartContainer && chartContainer.current) {
        const ctx = chartContainer.current.getContext('2d');
        const screenWidth = window.innerWidth;
        const barThickness = screenWidth <= 760 ? 10 : screenWidth<=1080 ? 10 :40 ;
        

        const chart = new Chart(ctx, {
            type: 'bar',
            data: {
            labels: Object.keys(data).reverse(),
            datasets: [{
                label: 'Total Time Spent',
                data: Object.values(data),
                backgroundColor: '#0369a1',
                borderColor: '#0369a1',
                barThickness:barThickness,
                borderWidth: 1,
                borderSkipped:'bottom',
                hoverBackgroundColor:"#d97706",
                hoverBorderColor:"#d97706",
            }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Total Time Spent'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Features'
                    }
                  }
                },
                onClick:(e,element)=>{
                    console.log(element)
                    if(element && element.length>0){
                        onBarClick(e,element[0].index)
                    }
                },plugins: {
                    zoom: {
                      pan: {
                        enabled: true,
                        mode: 'x',
                      },
                      zoom: {
                        wheel: {
                          enabled: true,
                        },
                        pinch: {
                          enabled: true,
                        },
                        mode: 'x',
                        speed: 0.1,
                      }
                    }
                  }
              },
              plugins: [zoomPlugin]
           
        });

        return () => chart.destroy();
        }
    }, [data]);

    return <canvas ref={chartContainer} />;
    };

