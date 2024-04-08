import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import zoomPlugin from 'chartjs-plugin-zoom';

// eslint-disable-next-line react/prop-types
export const LineChart = ({ data }) => {
  const chartContainer = useRef(null);

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const ctx = chartContainer.current.getContext('2d');

      const chart = new Chart(ctx, {
        type: 'line',
        data: {
          labels: Object.keys(data),
          datasets: [{
            label: Object.keys(data),
            data: Object.values(data),
            borderColor: '#0369a1',
            borderWidth: 2,
            pointBackgroundColor: '#0369a1',
            pointBorderColor: '#0369a1',
            pointRadius: 4,
            fill: false
          }]
        },
        options: {
          scales: {
            x: {
              title: {
                display: true,
                text: 'Dates'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Values'
              }
            }
          },
          plugins:{
            zoom:{
                pan:{
                    enabled:true,
                    mode:'xy',
                    onPan:()=>{
                        const chartCanvas = chartContainer.current;
                        chartCanvas.style.cursor = 'pointer';
                    }
                },
                zoom:{
                    wheel:{
                        enabled:true
                    },
                    pinch:{
                        enabled:true
                    },
                    onZoom: () => {
                        const chartCanvas = chartContainer.current;
                        chartCanvas.style.cursor = 'zoom-in';
                      }
                }

            }
          }
        },
        plugins:[zoomPlugin]
      });

      return () => chart.destroy();
    }
  }, [data]);

  return (
    
      <canvas ref={chartContainer} />

  );
};
