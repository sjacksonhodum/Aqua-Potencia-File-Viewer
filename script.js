document.getElementById('csvFileInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = e.target.result;
            parseCSV(data);
        };
        reader.readAsText(file);
    }
});

function parseCSV(csvData) {
    const lines = csvData.split('\n');
    const headers = lines[0].split(',');
    const dataset = [];

    for (let i = 1; i < lines.length; i++) {
        const currentLine = lines[i].split(',');

        if (currentLine.length === headers.length) {
            const entry = {};
            for (let j = 0; j < headers.length; j++) {
                entry[headers[j]] = currentLine[j];
            }
            dataset.push(entry);
        }
    }

    renderChart(dataset);
}

function renderChart(data) {
    const ctx = document.getElementById('dataChart').getContext('2d');
    const labels = data.map(d => d.Timestamp);
    const voltages = data.map(d => parseFloat(d.Voltage));

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Voltage',
                data: voltages,
                backgroundColor: 'rgba(73, 166, 204, 0.2)',
                borderColor: 'rgba(73, 166, 204, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: 'Voltage'
                    }
                },
                x: {
                    title: {
                        display: true,
                        text: 'Timestamp'
                    }
                }
            },
            responsive: true,
            maintainAspectRatio: false
        }
    });
}