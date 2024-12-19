// All registered participants (for login)
let participants = [
    { name: 'Rohith', phone: '1234567890', address: '123 Street, City', pickedBy: null },
    { name: 'John', phone: '0987654321', address: '456 Avenue, City', pickedBy: null },
    { name: 'Alice', phone: '1122334455', address: '789 Boulevard, City', pickedBy: null },
    // Add other participants
];

// Chits for the game (dynamic list that will change)
let remainingChits = [...participants];  // Initialize remaining chits with all participants

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

    participants.push({ name, phone, address, pickedBy: null });
    remainingChits.push({ name, phone, address, pickedBy: null });

    document.getElementById('name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('address').value = '';
};

// Login Logic
const login = () => {
    const name = document.getElementById('login-name').value.trim();
    const phone = document.getElementById('login-phone').value.trim();

    const user = participants.find(p => p.name.toLowerCase() === name.toLowerCase() && p.phone === phone);
    if (!user) {
        alert('Invalid login details!');
        return;
    }

    currentPlayer = name;
    document.getElementById('current-user-info').textContent = `Logged in as: ${user.name}`;
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('game-stage').style.display = 'block';
    loadChits();
};

// Load Chits Logic (For Game Stage)
const loadChits = () => {
    const chitBox = document.querySelector('.chit-box');
    chitBox.innerHTML = '';

    // Filter out the current player's name from the available chits
    const filteredChits = remainingChits.filter(participant => participant.name !== currentPlayer);

    filteredChits.forEach((participant, index) => {
        const chit = document.createElement('div');
        chit.classList.add('chit');
        chit.setAttribute('data-index', index);
        chit.addEventListener('click', () => pickChit(index));
        chitBox.appendChild(chit);
    });
};

// Picking a Chit
const pickChit = (index) => {
    const chitBox = document.querySelector('.chit-box');
    const chit = chitBox.children[index];

    if (!chit || chit.classList.contains('picked')) {
        alert('You cannot pick this chit!');
        return;
    }

    const picked = remainingChits[index];

    // Set the pickedBy value for the participant
    picked.pickedBy = currentPlayer;

    chit.classList.add('picked'); // Flip the chit to show the backside

    // Create a div for the backside of the chit with a delete button
    const backSide = document.createElement('div');
    backSide.classList.add('back');
    backSide.style.display = 'flex'; // Make the backside visible
    backSide.innerHTML = `
        <div class="result-message">
            <p>Ho ho ho! 🎅 Thanks for picking your chit! Here’s your festive mission: You should surprise <strong>${picked.name}</strong> with a wonderful gift! 🎁
            <br>Phone: <strong>${picked.phone}</strong><br>Address: <strong>${picked.address}</strong>
            <br>Wishing you a Merry Christmas and a Happy New Year! 🎉🎁
            <button class="delete-chit" onclick="deleteChit(${index})">Delete</button></p>
        </div>
    `;
    chit.appendChild(backSide);

    // Display the result message in a separate div on the page
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.innerHTML = `
        <div class="result-message">
            <p>Ho ho ho! 🎅 Thanks for picking your chit! Here’s your festive mission: You should surprise <strong>${picked.name}</strong> with a wonderful gift! 🎁
            <br>Phone: <strong>${picked.phone}</strong><br>Address: <strong>${picked.address}</strong>
            <br>Wishing you a Merry Christmas and a Happy New Year! 🎉🎁
            <button class="delete-chit" onclick="deleteChit(${index})">Delete</button></p>
        </div>
    `;

    chitResultContainer.style.display = 'block';
};

// Deleting the Chit
const deleteChit = (index) => {
    const chitBox = document.querySelector('.chit-box');
    const chit = chitBox.children[index];
    const picked = remainingChits[index];

    // Remove the chit from remainingChits (but keep the participant in the original list)
    remainingChits = remainingChits.filter((_, i) => i !== index);

    // Remove chit from the display
    chit.remove();

    // Update the remaining chits for the game
    loadChits();

    // Optionally, update the UI to show that the participant's chit was deleted
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.innerHTML = `<p>The chit for <strong>${picked.name}</strong> has been deleted! 🎅</p>`;
    chitResultContainer.style.display = 'block';
};

// Go Back Button Logic
const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', () => {
    // Hide the result message when going back
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.style.display = 'none'; // Hide result
    loadChits(); // Reload the chits and reset the state if needed
});
