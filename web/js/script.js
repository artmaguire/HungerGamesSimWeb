var districtCount = 0;
var districts = [];
var dayLog = [];
var dayNum = -1;
var dayTotalNum = -1;
var gameOver = false;

$( document ).ready(function() {
    var districtTpl = $('script[data-template="districtTemplate"]').text();
    var statusTpl = $('script[data-template="statusTemplate"]').text();

    function createPersonStatus(district, gender) {
        var person = district.getPerson(gender);
        var statusID = 'status' + district.getNumber() + gender;
        person.setStatusID(statusID);
        status = statusTpl.replace(/\${id}/g, statusID)
            .replace('${name}', person.getName())
            .replace('${kills}', person.getKills().toString() + ((person.getKills() === 1) ? ' Kill' : ' Kills'));
        /*if(person.isAlive()) $( '#alivePeople' ).append(status);
        else $( '#deadPeople' ).append(status);*/
        $( '#alivePeople' ).append(status);
    }

    function setPeopleStatus() {
        $( '#alivePeople' ).empty();
        $( '#deadPeople' ).empty();
        for(var i = 0; i < districts.length; i++) {
            createPersonStatus(districts[i], Person.Gender.Female);
            createPersonStatus(districts[i], Person.Gender.Male);
        }
    }

    function createNewDistrict() {
        districtCount++;
        if (districtCount === 12) {
            $( '#addAnother' ).attr("disabled", "disabled");
            $( '#submitPeople' ).removeAttr("disabled");
        } else if (districtCount > 12) return;

        districts.push(new District(districtCount));

        var newDistrict = districtTpl.split('${dNum}').join(districtCount.toString());
        $('#districtsContainer').append(newDistrict);
    }

    function validatePerson(district, gender) {
        var person = district.getPerson(gender);
        if (!person.getFirstName()) person.setFirstName(randomFirstName(gender));
        if (!person.getLastName()) person.setLastName(randomLastName());
        if (!person.getAge()) person.setAge(randomAge());
    }

    function autocompleteDistricts() {
        while (districtCount < 12) createNewDistrict();

        for (var i = 0; i < districts.length; i++) {
            validatePerson(districts[i], Person.Gender.Female);
            validatePerson(districts[i], Person.Gender.Male);
        }
    }

    $( '#addAnother' ).click(function() {
        createNewDistrict();
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 500);
    });

    createNewDistrict();

    $( '#autocomplete' ).click(function() {
        autocompleteDistricts();
    });

    $( '#submitPeople' ).click(function() {
        autocompleteDistricts();

        var sendData = {districts: []};
        for (var i = 0; i < districts.length; i++) sendData.districts.push(districts[i].getDetails());

        console.dir(sendData);

        $.post('./AddPeople', { districtData : JSON.stringify(sendData)}, function( data ) {
            setPeopleStatus();

            $( '#peopleForm' ).hide();
            $( '#fightScreen' ).show();
        });
    });

    $( '#editPeople' ).click(function() {
        $( '#peopleForm' ).show();
        $( '#fightScreen' ).hide();
    });

    function processFightEvents(data) {
        dayNum++;
        dayTotalNum++;
        data = JSON.parse(data);
        console.dir(data);

        var log = "Day " + (dayNum + 1) + "\n------------------------------\n";
        $( '#fightLog' ).text(log);

        for(var i = 0; i < data.length; i++) {
            log += data[i].eventString;
            (function (i) {
                setTimeout(function () {
                    $( '#fightLog' ).append(data[i].eventString);
                    var actions = data[i].actions;
                    for(var j = 0; j < actions.length; j++) {
                        var a = actions[j];
                        if(a.action === "EndGame") {
                            gameOver = true;
                            $( '#prevDay' ).removeAttr("disabled");
                            $( '#restart' ).show();
                        }
                        else {
                            var person = districts[a.district-1].getPerson(a.gender);
                            person.act(a.action);
                        }
                    }
                    if (i === (data.length - 1) && !gameOver) {
                        $( '#prevDay' ).removeAttr("disabled");
                        $( '#nextDay' ).removeAttr("disabled");
                    }
                }, 10 * (i + 1));
            })(i);
        }

        dayLog.push(log);
    }

    $( '#beginFight' ).click(function() {
        $.get('./BeginFight', function( data ) {
            processFightEvents(data);
            $( '#beginFightButtons' ).hide();
            $( '#nextDayButtons' ).show();
        });
    });

    $( '#prevDay' ).click(function() {
        if(dayNum === dayTotalNum && gameOver) $( '#nextDay' ).removeAttr("disabled");

        dayNum--;
        $( '#fightLog' ).text(dayLog[dayNum]);

        if(dayNum === 0) $( '#prevDay' ).attr("disabled", "disabled");
    });

    $( '#nextDay' ).click(function() {
        if (dayNum < dayTotalNum) {
            dayNum++;
            $( '#fightLog' ).text(dayLog[dayNum]);
            $( '#prevDay' ).removeAttr("disabled");
            if(dayNum === dayTotalNum && gameOver) $( '#nextDay' ).attr("disabled", "disabled");
        } else {
            $( '#prevDay' ).attr("disabled", "disabled");
            $( '#nextDay' ).attr("disabled", "disabled");
            $.get('./NextDay', function (data) {
                processFightEvents(data);
            });
        }
    });

    $( '#restart' ).click(function() {
        window.location.replace("./");
    });
});

var firstNamesFemale = ["Emily", "Madison", "Emma", "Hannah", "Olivia", "Abigail", "Isabella", "Ashley", "Samantha", "Elizabeth", "Alexis", "Sarah", "Alyssa", "Grace", "Sophia", "Taylor", "Brianna", "Lauren", "Ava", "Kayla", "Jessica", "Natalie", "Chloe", "Anna", "Victoria", "Hailey", "Mia", "Sydney", "Jasmine", "Morgan", "Julia", "Destiny", "Rachel", "Megan", "Kaitlyn", "Katherine", "Jennifer", "Savannah", "Ella", "Alexandra", "Haley", "Allison", "Maria", "Nicole", "Mackenzie", "Brooke", "Makayla", "Kaylee", "Lily", "Stephanie"];

var firstNamesMale = ["Jacob", "Michael", "Joshua", "Matthew", "Christopher", "Andrew", "Daniel", "Ethan", "Joseph", "William", "Anthony", "Nicholas", "David", "Alexander", "Ryan", "Tyler", "James", "John", "Jonathan", "Brandon", "Christian", "Dylan", "Zachary", "Noah", "Samuel", "Benjamin", "Nathan", "Logan", "Justin", "Jose", "Gabriel", "Austin", "Kevin", "Caleb", "Robert", "Elijah", "Thomas", "Jordan", "Cameron", "Hunter", "Jack", "Angel", "Isaiah", "Jackson", "Evan", "Luke", "Jason", "Isaac", "Mason", "Aaron"];

var lastNames = ["Ruth", "Jackson", "Debra", "Allen", "Gerald", "Harris", "Raymond", "Carter", "Jacqueline", "Torres", "Joseph", "Nelson", "Carlos", "Sanchez", "Ralph", "Clark", "Jean", "Alexander", "Stephen", "Roberts", "Eric", "Long", "Amanda", "Scott", "Teresa", "Diaz", "Wanda", "Thomas", "Murphy"];

function randomFirstName(gender) {
    switch(gender) {
        case Person.Gender.Female: return randValue(firstNamesFemale);
        case Person.Gender.Male: return randValue(firstNamesMale);
        default: return null;
    }
}

function randomLastName() {
    return randValue(lastNames);
}

function randomAge() {
    var size = 47;
    var n = Math.random() * size + 13;
    var r = Math.floor(n);
    return r;
}

function randValue(array) {
    var size = array.length;
    var n = Math.random() * size;
    var r = Math.floor(n);
    return array[r];
}