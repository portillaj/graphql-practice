
const message = 'Some message from myModule.js';
const name = 'Jason';
const location = 'Orlando';
const getGreeting = (name) => {
  return `Welcome to the course ${name}`;
}

export { message, name, location as default, getGreeting }