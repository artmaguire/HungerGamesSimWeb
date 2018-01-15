function Person(districtNumber, gender) {
    this.dNum = districtNumber;
    this.gender = gender;
    this.alive = true;
    this.kills = 0;
    this.statusID = '';
}

Person.Gender = Object.freeze({Female: "Female", Male: "Male"}); //gender enum
Person.Action = Object.freeze({AddKill: "AddKill", Kill: "Kill"}); //gender enum

Person.prototype.isAlive = function() {
    return this.alive;
};

Person.prototype.act = function(action) {
    switch(action) {
        case Person.Action.AddKill: { this.addKill(); break; }
        case Person.Action.Kill: { this.kill(); break; }
    }
};

Person.prototype.getGender = function() {
    return this.gender;
};

Person.prototype.getKills = function() {
    return this.kills;
};

Person.prototype.addKill = function() {
    this.kills++;
    $( '#' + this.statusID + 'Kills' ).text(this.kills.toString() + ((this.kills === 1) ? ' Kill' : ' Kills'));
};

Person.prototype.setStatusID = function(statusID) {
    this.statusID = statusID;
};

Person.prototype.kill = function() {
    this.alive = false;
    $( '#' + this.statusID ).detach().appendTo( '#deadPeople' );
};

Person.prototype.getFirstName = function() {
    return $( '#firstName' + this.gender + this.dNum).val();
};

Person.prototype.setFirstName = function(firstName) {
    $( '#firstName' + this.gender + this.dNum).val(firstName);
};

Person.prototype.getLastName = function() {
    return $( '#lastName' + this.gender + this.dNum).val();
};

Person.prototype.setLastName = function(lastName) {
    $( '#lastName' + this.gender + this.dNum).val(lastName);
};

Person.prototype.getName = function() {
    return this.getFirstName() + ' ' + this.getLastName();
};

Person.prototype.getAge = function() {
    return $( '#age' + this.gender + this.dNum).val();
};

Person.prototype.setAge = function(age) {
    $( '#age' + this.gender + this.dNum).val(age);
};
