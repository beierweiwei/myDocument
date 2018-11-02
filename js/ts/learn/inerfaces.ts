interface Person  {
    firstName: String;
    lastName: String;
}

function greeter (person: Person) {
    return 'Hello,' + person.firstName + '' + person.lastName 
}

let user = {firstName: 'Jane', lastName: 'User'};

console.log(greeter(user))