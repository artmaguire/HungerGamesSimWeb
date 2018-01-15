function District(number) {
    this.number = number;
    this.female = new Person(number, Person.Gender.Female);
    this.male = new Person(number, Person.Gender.Male);
}

District.prototype.getNumber = function() {
    return this.number;
};

District.prototype.getPerson = function(gender) {
    switch(gender) {
        case Person.Gender.Female: return this.female;
        case Person.Gender.Male: return this.male;
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
            age: this.female.getAge(),
            gender: this.female.getGender()
        },
        male: {
            firstName: this.male.getFirstName(),
            lastName: this.male.getLastName(),
            age: this.male.getAge(),
            gender: this.male.getGender()
        }
    }
};