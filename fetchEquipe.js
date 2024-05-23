const axios = require('axios');

async function fetchEquipes() {
    // Fake login to get a valid token
    const response = await axios.post('http://localhost:3000/login', {
        username: 'bilal hachoumi',
        password: 'bilal1234'
    });

    const token = response.data.token;

    try {
        const equipesResponse = await axios.get('http://localhost:3000/equipes', {
            headers: {
                Authorization: `Bearer ${token}`,
               
            }
        });

        console.log(equipesResponse.data);
    } catch (error) {
        console.error('Error:', error.response.data);
    }
}

fetchEquipes();
