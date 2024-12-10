// Helper function to fetch data from API and display it
async function fetchData(apiEndpoint) {
    const response = await fetch(apiEndpoint);
    const data = await response.json();
    return JSON.stringify(data, null, 2);  // Format and return JSON data as string
}

// Event listeners for the buttons
document.getElementById('getBrands').addEventListener('click', async () => {
    const result = await fetchData('/api/brands');
    document.getElementById('results').innerText = result;
});

document.getElementById('getTopDevices').addEventListener('click', async () => {
    const result = await fetchData('/api/top');
    document.getElementById('results').innerText = result;
});

document.getElementById('getSearchResults').addEventListener('click', async () => {
    // Get the value from the input field
    const query = document.getElementById('searchInput').value.trim();
    
    // If there are multiple search terms, split by commas and send them
    if (query) {
        const result = await fetchData(`/api/search?query=${query}`);
        document.getElementById('results').innerText = result;
    } else {
        document.getElementById('results').innerText = "Please enter search terms.";
    }
});

document.getElementById('getDeals').addEventListener('click', async () => {
    const result = await fetchData('/api/deals');
    document.getElementById('results').innerText = result;
});

// Export content to PDF
document.getElementById('exportPDF').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    const content = document.getElementById('results').innerText;

    if (content) {
        // Add the content to PDF
        doc.text(content, 10, 10);

        // Save the PDF with a custom name
        doc.save('device_info_results.pdf');
    } else {
        alert('No content to export!');
    }
});

// Zoom-in functionality
let zoomLevel = 1;

document.getElementById('zoomIn').addEventListener('click', () => {
    zoomLevel += 0.1;
    document.getElementById('results').style.fontSize = `${zoomLevel}em`;
});

// Zoom-out functionality
document.getElementById('zoomOut').addEventListener('click', () => {
    zoomLevel = Math.max(0.5, zoomLevel - 0.1);  // Prevent zooming out too much
    document.getElementById('results').style.fontSize = `${zoomLevel}em`;
});

