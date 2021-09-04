const firstHour = 9;
const lastHour = 17;
const dailyHours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM",
    "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

const TEXT_ID_NAME = "text"

main()

function main()
{

    var todayDate = new Date();
    var currentYear = todayDate.getFullYear();
    var currentMonth = todayDate.getMonth();
    var currentDay = todayDate.getDay();
    var currentDate = todayDate.getDate();
    var currentHour = todayDate.getHours();

    displayDate(currentDay, currentMonth, currentDate, currentYear, currentHour);
    displayCalendar(dailyHours, currentHour);
    loadValues()

    $(".saveBtn").click(saveEvent)
}

function displayDate(currentDay, currentMonth, currentDate, currentYear, currentHour)
{
    var dateEnding = "th";
    var calendarDay = $("#currentDay");


    if (currentDate === 1 || currentDate === 21 || currentDate === 31)
    {
        dateEnding = "st";
    }
    else if (currentDate === 2 || currentDate === 22)
    {
        dateEnding = "nd";
    }

    else if (currentDate === 3 || currentDate === 23)
    {
        dateEnding = "rd";
    }

    fullDate = weekDays[currentDay] + ", " + months[currentMonth] + " " + currentDate + dateEnding + ", " + currentYear;

    calendarDay.text(fullDate);
    console.log(fullDate);
};

function displayCalendar(dailyHours, currentHour)
{
    var containerDiv = $(".container");

    for (let timeBlock = firstHour; timeBlock <= lastHour; timeBlock++)
    {
        // var eventEntrey = '<div class="row time-block"> ' +
        //     '<div class="col-1 hour">' + dailyHours[timeBlock] + '</div> ' + `<textarea class="col-10 description past" ></textarea>` + '<button class="btn saveBtn col-1">' +
        //     '<i class="fa fa-save"></i></button> ' +
        //     '</div>';

        var eventEntrey = '<div class="row time-block"> ' +
            '<div class="col-1 hour">' + dailyHours[timeBlock] + '</div> ';


        if (timeBlock < currentHour)
        {
            eventEntrey = eventEntrey + '<textarea class="col-10 description past" name="text' + dailyHours[timeBlock] + '" id="' + TEXT_ID_NAME + dailyHours[timeBlock] + '"></textarea>';
        }
        else if (timeBlock === currentHour)
        {
            eventEntrey = eventEntrey + '<textarea class="col-10 description present" name="text' + dailyHours[timeBlock] + '" id="' + TEXT_ID_NAME + dailyHours[timeBlock] + '"></textarea>';
        }
        else
        {
            eventEntrey = eventEntrey + '<textarea class="col-10 description future" name="text' + dailyHours[timeBlock] + '" id="' + TEXT_ID_NAME + dailyHours[timeBlock] + '"></textarea>';
        };

        // add last column and close the row div
        eventEntrey = eventEntrey + '<button class="saveBtn col-md-1" ' + 'id="hi"+ value=' + dailyHours[timeBlock] + '><i class="fas fa-save"></i></button></div>';

        // add new elements to container
        containerDiv.append(eventEntrey);

    }
};

function saveEvent(eventData)
{
    console.log(eventData)
    console.log("Target:", this.value)
    var inputText = $("#" + TEXT_ID_NAME + this.value).val()
    console.log("IT:", inputText)
    var record = { value: inputText, datestamp: new Date().getDate(), month: new Date().getMonth(), year: new Date().getFullYear() }

    // var stringified_InputText = JSON.stringify(inputText)
    var stringified_object = JSON.stringify(record)

    // localStorage.setItem("#" + TEXT_ID_NAME + eventData.currentTarget.value, stringified_InputText)
    localStorage.setItem("#" + TEXT_ID_NAME + this.value, stringified_object)
};

function loadValues()
{
    var parsedObject = null
    var returnedObject = null
    var keyName = ""
    var datenum = new Date().getDate();
    var monthnum = new Date().getMonth();
    var yearnum = new Date().getFullYear();

    console.log(datenum, monthnum, yearnum)

    for (let timeBlock = firstHour; timeBlock <= lastHour; timeBlock++)
    {
        keyName = "#" + TEXT_ID_NAME + dailyHours[timeBlock]
        returnedObject = localStorage.getItem(keyName)

        // console.log(keyName, returnedObject)
        if (returnedObject != null)
        {
            parsedObject = JSON.parse(returnedObject)
            console.log(keyName, parsedObject, parsedObject.datestamp, parsedObject["datestamp"], parsedObject.value, parsedObject.month, parsedObject.year)
            if (parsedObject.datestamp === datenum && parsedObject.month === monthnum && parsedObject.year === yearnum)
            {
                console.log(keyName, parsedObject.value, typeof (parsedObject.value))
                $(keyName).val(parsedObject.value)
            }
        }
    }
};

