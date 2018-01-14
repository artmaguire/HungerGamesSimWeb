function District(number) {
    this.number = number;
    this.female = new Person(number, "Female");
    this.male = new Person(number, "Male");
}

District.prototype.getNumber = function() {
    return this.number;
};

District.prototype.getPerson = function(gender) {
    switch(gender) {
        case 'female': return this.female;
        case 'male': return this.male;
        default: return null;
    }
};

District.prototype.getDetails = function() {
    return {
        name: 'District ' + this.number,
        number: this.number,
        female: {
            firstName: this.female.getFirstName(),
            lastName: this.female.getLastName(),
            age: this.female.getAge()
        },
        male: {
            firstName: this.male.getFirstName(),
            lastName: this.male.getLastName(),
            age: this.male.getAge()
        }
    }
};