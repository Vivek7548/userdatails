const userForm = document.getElementById("userForm");
const userList = document.getElementById("userList");

userForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;

    // Create user object
    const userInput = {
        username: username,
        email: email,
        phone: phone
    };

    // Save user details to local storage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    users.push(userInput);
    localStorage.setItem("users", JSON.stringify(users));

    // Display user details on the screen
    showUserInput();

    // Clear the form
    userForm.reset();
});

  window.addEventListener("DOMContentLoaded", () => {
    const data = axios.get("https://crudcrud.com/api/41fb4a53bec341e28e3332dc4d21f521/appointdata")
    .then((response) => {

        for(var i = 0; i< response.data.length; i++){
            showUserInput(response.data[i])
        }
    })
    .catch((error) => {
        console.log(error)
    })
    console.log(data)
  })




function showUserInput() {
    userList.innerHTML = "";
    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.forEach(function(userInput, index) {
        const userItem = document.createElement("div");
        userItem.className = "userItem";
        userItem.innerHTML = `
            <strong>${userInput.username}</strong> <br>
            Email: ${userInput.email} <br>
            Phone: ${userInput.phone} <br>
            <button onclick="editUser(${index})">Edit</button>
            <button onclick="deleteUser(${index})">Delete</button>
        `;
        userList.appendChild(userItem);
    });
}

function editUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userInput = users[index];

    // Set form values for editing
    document.getElementById("username").value = userInput.username;
    document.getElementById("email").value = userInput.email;
    document.getElementById("phone").value = userInput.phone;

    // Remove the edited user from local storage
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));

    // Display remaining user details
    showUserInput();
}

function deleteUser(index) {
    const users = JSON.parse(localStorage.getItem("users")) || [];
    // Remove the user from local storage
    users.splice(index, 1);
    localStorage.setItem("users", JSON.stringify(users));

    // Display updated user details
    showUserInput();
}

// Initial display of user details
showUserInput();