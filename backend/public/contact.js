const form = document.querySelector('#contact');

const resetMsg = document.querySelector('#resetMsg')

const valMsg = (id) => {
    if (id.value.length < 4) {
        console.log('Message too short.');
        return false;
    }
    else {
        return true;
    }
};

const valName = (id) => {
    if (id.value.length < 2) {
        console.log('Name has to be at least 2 characters');
        return false;
    }
    else {
        return true;
    }
};

const valEmail = (id) => {
    if (id.value.length < 2) {
        console.log('Email to short');
        return false;
    }
    else {
        return true;
    }
};

//skapar ett meddelande
class Message {
    constructor(message, name, email, category) {
        this.message = message.value.trim()
        this.name = name.value
        this.email = email.value
        this.category = category.value
    }
}

//errors
const errors = [];
//sparar meddelanden
const messages = [];

form.addEventListener('submit', e => {
    e.preventDefault();

    const message = document.querySelector('#msg');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    const category = document.querySelector('#category');

    errors[0] = valMsg(message);
    errors[1] = valName(name);
    errors[2] = valEmail(email);
    errors[3] = category;

    if (errors.includes(false)) {
        console.log('Please fill in all the forms.')
    }

    else {
    //skapar meddelande    
    const request = new Message(message, name, email, category);
    //pushar in meddelande i array
    messages.push(request);

    //töm inputs
    message.value = '';
    name.value = '';
    email.value = '';
    category.value = '';


 
    //loggar meddelandena    
    console.log(messages);
    }
})




console.log(messages[0])




