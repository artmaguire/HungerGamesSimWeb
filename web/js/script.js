var districtCount = 0;
var districts = [];
var dayLog = [];
var dayNum = 0;
var dayTotalNum = 0;

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
            createPersonStatus(districts[i], 'female');
            createPersonStatus(districts[i], 'male');
        }

        var person = districts[5].getPerson('female');
        person.addKill();
        person.addKill();
        person.kill();
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
            validatePerson(districts[i], 'female');
            validatePerson(districts[i], 'male');
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
            /*var alivePeople = '';

            for (var i = 0; i < districts.length; i++) {
                var person = districts[i].getPerson('female');
                alivePeople += female.getFirstName() + ' ' + districts
            }*/

            setPeopleStatus();

            $( '#peopleForm' ).hide();
            $( '#fightScreen' ).show();
        });
    });

    $( '#editPeople' ).click(function() {
        $( '#peopleForm' ).show();
        $( '#fightScreen' ).hide();
    });

    $( '#beginFight' ).click(function() {
        $.get('./BeginFight', function( data ) {
            data = "Day " + dayNum + "\n------------------------------\n" + data;
            console.log(data);
            /*dayNum++;
            dayTotalNum++;*/
            dayLog.push(data);
            $( '#fightLog' ).text(dayLog[dayNum]);
            $( '#beginFightButtons' ).hide();
            $( '#nextDayButtons' ).show();
        });
    });

    $( '#prevDay' ).click(function() {
        dayNum--;
        $( '#fightLog' ).text(dayLog[dayNum]);

        if(dayNum === 0) $( '#prevDay' ).attr("disabled", "disabled");
    });

    $( '#nextDay' ).click(function() {
        if (dayNum < dayTotalNum) {
            dayNum++;
            $( '#fightLog' ).text(dayLog[dayNum]);
            if (dayNum === 1) $( '#prevDay' ).removeAttr("disabled");
        } else {
            $.get('./NextDay', function (data) {
                $( '#prevDay' ).removeAttr("disabled");
                dayNum++;
                dayTotalNum++;
                data = "Day " + dayNum + "\n------------------------------\n" + data;
                console.log(data);
                dayLog.push(data);
                $( '#fightLog' ).text(dayLog[dayNum]);
                $('#fightLog').text(data);
            });
        }
    });
});

var firstNamesFemale = ["Emily", "Madison", "Emma", "Hannah", "Olivia", "Abigail", "Isabella", "Ashley", "Samantha", "Elizabeth", "Alexis", "Sarah", "Alyssa", "Grace", "Sophia", "Taylor", "Brianna", "Lauren", "Ava", "Kayla", "Jessica", "Natalie", "Chloe", "Anna", "Victoria", "Hailey", "Mia", "Sydney", "Jasmine", "Morgan", "Julia", "Destiny", "Rachel", "Megan", "Kaitlyn", "Katherine", "Jennifer", "Savannah", "Ella", "Alexandra", "Haley", "Allison", "Maria", "Nicole", "Mackenzie", "Brooke", "Makayla", "Kaylee", "Lily", "Stephanie"];

var firstNamesMale = ["Jacob", "Michael", "Joshua", "Matthew", "Christopher", "Andrew", "Daniel", "Ethan", "Joseph", "William", "Anthony", "Nicholas", "David", "Alexander", "Ryan", "Tyler", "James", "John", "Jonathan", "Brandon", "Christian", "Dylan", "Zachary", "Noah", "Samuel", "Benjamin", "Nathan", "Logan", "Justin", "Jose", "Gabriel", "Austin", "Kevin", "Caleb", "Robert", "Elijah", "Thomas", "Jordan", "Cameron", "Hunter", "Jack", "Angel", "Isaiah", "Jackson", "Evan", "Luke", "Jason", "Isaac", "Mason", "Aaron"];

var lastNames = ["Ruth", "Jackson", "Debra", "Allen", "Gerald", "Harris", "Raymond", "Carter", "Jacqueline", "Torres", "Joseph", "Nelson", "Carlos", "Sanchez", "Ralph", "Clark", "Jean", "Alexander", "Stephen", "Roberts", "Eric", "Long", "Amanda", "Scott", "Teresa", "Diaz", "Wanda", "Thomas", "Murphy"];

function randomFirstName(gender) {
    switch(gender) {
        case 'female': return randValue(firstNamesFemale);
        case 'male': return randValue(firstNamesMale);
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