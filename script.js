// Carga los datos del archivo JSON usando D3.js
d3.json('data.json').then(data => {
    // Procesa los datos
    const labels = data.map(item => moment(item.FHEvento, 'D/M/YYYY h:mm:ss a').toDate());
    const values = data.map(item => parseFloat(item.Ultrasonic_Fuel_Level_1));

    // Configura el gráfico principal
    const ctx = document.getElementById('lineChart').getContext('2d');
    const lineChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Nivel de Combustible (Litros)',
                data: values,
                borderColor: 'rgba(75, 80, 192, 1)',
                borderWidth: 2,
                fill: false,
                pointRadius: 2,
                pointBackgroundColor: 'rgba(75, 80, 192, 1)',
                pointBorderColor: 'rgba(75, 80, 192, 1)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    title: {
                        display: true,
                        text: 'Fecha y Hora'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nivel de Combustible'
                    }
                }
            },
            plugins: {
                zoom: {
                    pan: {
                        enabled: true,
                        mode: 'x', // Permite el paneo horizontal
                        threshold: 10 // Umbral en píxeles para activar el paneo
                    },
                    zoom: {
                        enabled: true,
                        mode: 'x', // Permite el zoom horizontal
                        wheel: {
                            enabled: true // Permite zoom con la rueda del ratón
                        },
                        pinch: {
                            enabled: true // Permite zoom con el gesto de pellizco
                        }
                    }
                }
            }
        }
    });

    // Configura el gráfico de previsualización
    const ctxPreview = document.getElementById('previewChart').getContext('2d');
    const previewChart = new Chart(ctxPreview, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Previsualización del Nivel de Combustible',
                data: values,
                borderColor: 'rgba(75, 25, 192, 0.5)',
                borderWidth: 1,
                fill: false,
                pointRadius: 1,
                pointBackgroundColor: 'rgba(75, 25, 192, 0.5)',
                pointBorderColor: 'rgba(75, 25, 192, 0.5)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    type: 'time',
                    time: {
                        unit: 'hour'
                    },
                    title: {
                        display: true,
                        text: 'Fecha y Hora'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Nivel de Combustible'
                    }
                }
            }
        }
    });
}).catch(error => console.error('Error al cargar los datos:', error));
