let participants = [];
let currentPlayer = null;

// Registration
const addParticipant = () => {
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const address = document.getElementById('address').value;

    if (!name || !phone || !address) {
        alert('Please fill out all fields!');
        return;
    }

    participants.push({ name, phone, address, pickedBy: null });
    document.getElementById('participants-list').innerHTML += `<p>${name} - ${phone} - ${address}</p>`;

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

// Login
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
    participants
        .filter(p => p.name !== currentPlayer && !p.pickedBy)
        .forEach((participant, index) => {
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

    // Get the participant information
    const availableParticipants = participants.filter(p => p.name !== currentPlayer && !p.pickedBy);

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

    // Reload the chits after a small delay (optional)
    setTimeout(() => {
        loadChits(); // Reload to update available chits
    }, 3000); // After the message has been displayed for a while
};

// Go Back Button Logic
const goBackButton = document.getElementById('go-back');
goBackButton.addEventListener('click', () => {
    // Hide the result message when going back
    const chitResultContainer = document.getElementById('chit-result');
    chitResultContainer.style.display = 'none'; // Hide result
    loadChits(); // Reload the chits and reset the state if needed
});

document.addEventListener('DOMContentLoaded', () => {
    const developerNote = document.getElementById('developer-note');
    //const message = 'This is a fun game developed by Rohith S V. Treat him with a coffee if you like this innovative idea.';

    let wordIndex = 0;

    function addWord() {
        const words = message.split(' ');

        // Stop the typing effect after the word "idea"
        if (wordIndex < words.length) {
            developerNote.innerHTML += words[wordIndex] + ' ';
            wordIndex++;
            setTimeout(addWord, 300); // Adjust speed as desired
        }
    }

    addWord(); // Start typing the message
});

// Go back to previous page/view
document.getElementById('go-back').addEventListener('click', () => {
    if (document.getElementById('login-form').style.display === 'block') {
        document.getElementById('login-form').style.display = 'none';
        document.getElementById('registration-form').style.display = 'block';  // Show Registration Form
    } else if (document.getElementById('game-stage').style.display === 'block') {
        document.getElementById('game-stage').style.display = 'none';
        document.getElementById('login-form').style.display = 'block';  // Show Login Form
    } else {
        window.history.back();  // For navigating back if needed in a multi-page app
    }
});

