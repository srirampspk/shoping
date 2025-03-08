async function fetchData() {
    try {
        const response = await fetch('http://localhost:3000/shoping');
        const data = await response.json();

        const sareesContainer = document.getElementById('sarees');
        const casualsContainer = document.getElementById('casuals');
        const dressesContainer = document.getElementById('dresses');
        const nightContainer = document.getElementById('night');
        const kidsContainer = document.getElementById('kids');
        const traditionalContainer = document.getElementById('traditional');

        // Filter data for saree items
        const sareeItems = data.filter(item => item.name === 'saree.html');
        // Filter data for casual items
        const casualItems = data.filter(item => item.name === 'casual.html');
        // Filter data for dress items
        const dressItems = data.filter(item => item.name === 'dress.html');
        // Filter data for night items
        const nightItems = data.filter(item => item.name === 'night.html');
        // Filter data for kids items
        const kidsItems = data.filter(item => item.name === 'kids.html');
        // Filter data for traditional items
        const traditionalItems = data.filter(item => item.name === 'traditional.html');

        // Function to create elements for each item and append them to the container
        function createAndAppendItem(container, item) {
            const itemDiv = document.createElement('div');
            const image = document.createElement('img');
            image.src = `data:image/jpeg;base64,${btoa(new Uint8Array(item.image.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`;
            image.alt = 'Item Image';
            const description = document.createElement('p');
            description.textContent = item.des;
            const price = document.createElement('p');
            price.textContent = `Price: ${item.price}`;
            const color = document.createElement('p');
            color.textContent = `Color: ${item.color}`;
            const buyButton = document.createElement('button');
            buyButton.textContent = 'Buy Now';
            buyButton.addEventListener('click', () => buyItem(item));
            itemDiv.appendChild(image);
            itemDiv.appendChild(description);
            itemDiv.appendChild(price);
            itemDiv.appendChild(color);
            itemDiv.appendChild(buyButton);
            container.appendChild(itemDiv);
        }

        // Loop through saree items and create elements for each
        sareeItems.forEach(item => createAndAppendItem(sareesContainer, item));
        // Loop through casual items and create elements for each
        casualItems.forEach(item => createAndAppendItem(casualsContainer, item));
        // Loop through dress items and create elements for each
        dressItems.forEach(item => createAndAppendItem(dressesContainer, item));
        // Loop through night items and create elements for each
        nightItems.forEach(item => createAndAppendItem(nightContainer, item));
        // Loop through kids items and create elements for each
        kidsItems.forEach(item => createAndAppendItem(kidsContainer, item));
        // Loop through traditional items and create elements for each
        traditionalItems.forEach(item => createAndAppendItem(traditionalContainer, item));

    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function buyItem(item) {
    // Add logic for buying item
    alert(`Item "${item.des}" added to cart!`);
}

// Call the function to fetch and display data for all categories
fetchData();
