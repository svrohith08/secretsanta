// Array holding remaining chits data
let participants = [
    { name: 'Rohith', phone: '1234567890', address: '123 Street, City', pickedBy: null },
    { name: 'John', phone: '0987654321', address: '456 Avenue, City', pickedBy: null },
    { name: 'Alice', phone: '1122334455', address: '789 Boulevard, City', pickedBy: null }
];
let remainingChits = [...participants]; // This will hold the list of chits for the game
let currentPlayer = null;

// Registration Logic
const addParticipant = () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        alert('Please fill out all fields!');
        return;
    }

    // Add participant to the list
    const newParticipant = { name, phone, address, pickedBy: null };
    participants.push(newParticipant);
    remainingChits.push({ ...newParticipant });  // Create a copy for the chits

    // Display participants in the list
    document.getElementById('participants-list').innerHTML += `<p>${name} - ${phone} - ${address}</p>`;

    // Clear input fields
    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
};

document.getElementById('add-participant').addEventListener('click', addParticipant);

document.getElementById('go-to-login').addEventListener('click', () => {
    document.getElementById('registration-form').style.display = 'none';
    document.getElementById('login-form').style.display = 'block';
});

document.getElementById('go-back').addEventListener('click', () => {
    location.reload();
});

// Login Logic
const login = () => {
    const name = document.getElementById('login-name').value;
    const phone = document.getElementById('login-phone').value;

    const user = participants.find(p => p.name === name && p.phone === phone);
    if (!user) {
        alert('Invalid login details!');
        return;
    }

    currentPlayer = name;
    document.getElementById('current-user-info').textContent = `Logged in as: ${name}`;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('game-stage').style.display = 'block';
    loadChits();
};

document.getElementById('login-button').addEventListener('click', login);

// Game Logic
const loadChits = () => {
    const chitBox = document.querySelector('.chit-box');
    chitBox.innerHTML = '';

    // Filter out current player and already picked chits
    const availableChits = remainingChits.filter(p => p.name !== currentPlayer && !p.pickedBy);

    availableChits.forEach((participant, index) => {
        const chit = document.createElement('div');
        chit.classList.add('chit');
        chit.setAttribute('data-index', index);
        chit.addEventListener('click', () => pickChit(index));
        chitBox.appendChild(chit);
    });
};

const pickChit = (index) => {
    const chitBox = document.querySelector('.chit-box');
    const chit = chitBox.children[index];

    if (!chit || chit.classList.contains('picked')) {
        alert('You cannot pick this chit!');
        return;
    }

    // Get the participant who was picked
    const availableParticipants = remainingChits.filter(p => p.name !== currentPlayer && !p.pickedBy);

    if (availableParticipants.length === 0) {
        alert('No more participants to pick!');
        return;
    }

    const picked = availableParticipants[index % availableParticipants.length];
    picked.pickedBy = currentPlayer;

    chit.classList.add('picked'); // Flip the chit to show the backside

    // Create a div for the backside of the chit
    const backSide = document.createElement('div');
    backSide.classList.add('back');
    backSide.style.display = 'flex'; // Make the backside visible
    backSide.innerHTML = `
        <div class="result-message">
            <p>Ho ho ho! 🎅 Thanks for picking your chit! Here’s your festive mission: You should surprise <strong>${picked.name}</strong> with a wonderful gift! 🎁<br>
            They’ve been extra nice this year, and here’s the info to help you make their holiday season merry and bright:<br>
            <strong>Phone</strong>: <strong>${picked.phone}</strong><br>
            <strong>Address</strong>: <strong>${picked.address}</strong><br><br>
            Use this information to spread some holiday cheer — maybe even a little New Year’s sparkle! ✨🎄 Enjoy gift-giving and make sure it’s wrapped with joy, love, and a dash of holiday magic! 🌟<br>
            Wishing you a Merry Christmas and a Happy New Year! 🎉🎁
            Remember to give your stand-up updates in the channel okay!! ✨✨</p>
        </div>
    `;
    chit.appendChild(backSide); // Append the backside to the chit

    // Display the result message in a separate div on the page
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.innerHTML = `
        <div class="result-message">
            <p>Ho ho ho! 🎅 Thanks for picking your chit! Here’s your festive mission: You should surprise <strong>${picked.name}</strong> with a wonderful gift! 🎁<br>
            They’ve been extra nice this year, and here’s the info to help you make their holiday season merry and bright:<br>
            <strong>Phone</strong>: <strong>${picked.phone}</strong><br>
            <strong>Address</strong>: <strong>${picked.address}</strong><br><br>
            Use this information to spread some holiday cheer — maybe even a little New Year’s sparkle! ✨🎄 Enjoy gift-giving and make sure it’s wrapped with joy, love, and a dash of holiday magic! 🌟<br>
            Wishing you a Merry Christmas and a Happy New Year! 🎉🎁
            Remember to give your stand-up updates in the channel okay!! ✨✨</p>
        </div>
    `;

    chitResultContainer.style.display = 'block'; // Make sure the result is visible

    // Remove picked chit from remainingChits
    remainingChits = remainingChits.filter((p, i) => i !== index);

    // Reload the chits after a small delay (optional)
    setTimeout(() => {
        loadChits(); // Reload to update available chits
    }, 3000); // After the message has been displayed for a while
};

// Delete Chit Logic
const deleteChit = (index) => {
    const chitBox = document.querySelector('.chit-box');
    const chit = chitBox.children[index];

    if (!chit) {
        alert('Chit not found!');
        return;
    }

    // Remove the chit from the remainingChits array
    remainingChits = remainingChits.filter((_, i) => i !== index);
    
    // Remove chit from display
    chit.remove();

    // Hide the result message
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.style.display = 'none';
};

// Go Back Button Logic
const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', () => {
    // Hide the result message when going back
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.style.display = 'none'; // Hide result
    loadChits(); // Reload the chits and reset the state if needed
});
