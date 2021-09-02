const firstHour = 9;
const lastHour = 23;
const dailyHours = ["12AM", "1AM", "2AM", "3AM", "4AM", "5AM", "6AM", "7AM", "8AM", "9AM", "10AM", "11AM", "12PM",
    "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM", "9PM", "10PM", "11PM"];

const weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


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
    displayCalendar(dailyHours, currentHour)
}

function displayDate(currentDay, currentMonth, currentDate, currentYear, currentHour)
{
    var dateEnding = "th";
    var calendarDay = $("#currentDay")


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

    fullDate = weekDays[currentDay] + ", " + months[currentMonth] + " " + currentDate + dateEnding + ", " + currentYear

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
            eventEntrey = eventEntrey + `<textarea class="col-10 description past" ></textarea>`
        }
        else if (timeBlock === currentHour)
        {
            eventEntrey = eventEntrey + `<textarea class="col-10 description present"></textarea>`
        }
        else
        {
            eventEntrey = eventEntrey + `<textarea class="col-10 description future"></textarea>`
        };

        // add last column and close the row div
        eventEntrey = eventEntrey + '<button class="btn saveBtn col-1" ><i class="fa fa-save"></i></button></div>';

        // add new elements to container
        containerDiv.append(eventEntrey);
    }
}
