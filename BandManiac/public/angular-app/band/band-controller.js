angular.module('bandmaniac').controller('BandController', BandController);

function BandController($scope, $routeParams, $location, userDataFactory, eventDataFactory) {
  var bandId = $routeParams.bandId;  
  var vm = this;
  vm.bandId = bandId;
    vm.pageTitle = 'Bandmembers List';
    var eventArray=[];
    var weekCounter = 0;
    var eventPtr = 0;
    var event = {};
    var eventType = '';
    var eventDate = '';
    var eventDesc1 = '';
    var eventDesc2 = '';
    var event_Id
    vm.weeks=[];
    var week = {
      mondayDate : '',
      mondayCompareDate : '',
      mondayDesc1 : '',
      mondayDesc2 : '',
      mondayEvent : '',
      monday_Id : '',
      tuesdayDate : '',
      tuesdayCompareDate : '',
      tuesdayDesc1 : '',
      tuesdayDesc2 : '',
      tuesdayEvent : '',
      tuesday_Id : '',
      wednesdayDate : '',
      wednesdayCompareDate : '',
      wednesdayDesc1 : '',
      wednesdayDesc2 : '',
      wednesdayEvent : '',
      wednesday_Id : '',
      thursdayDate : '',
      thursdayCompareDate : '',
      thursdayDesc1 : '',
      thursdayDesc2 : '',
      thursdayEvent : '',
      thursday_Id : '',
      fridayDate : '',
      fridayCompareDate : '',
      fridayDesc1 : '',
      fridayDesc2 : '',
      fridayEvent : '',
      friday_Id : '',
      saturdayDate : '',
      saturdayCompareDate : '',
      saturdayDesc1 : '',
      saturdayDesc2 : '',
      saturdayEvent : '',
      saturday_Id : '',
      sundayDate : '',
      sundayCompareDate : '',
      sundayDesc1 : '',
      sundayDesc2 : '',
      sundayEvent : '',
      sunday_Id : ''
    };

    vm.refreshList = function() {
      eventDataFactory.eventList().then(function(response) {
      vm.events = response.data;
      eventArray.length = 0;
      eventArray = vm.events;
      populateCalendar();
      });
    }

    vm.refreshList();
    
  function populateCalendar() {
    vm.weeksInYear = moment().weeksInYear();
    vm.weekYear = moment().isoWeek();
    while (weekCounter <= 53){
      event = eventArray[eventPtr];
      if (!event) {
        eventDate = '19850101';
      } else {
        eventDate = event.eventDate;
        eventType = event.eventType;
        eventDesc1 = event.eventDesc1;
        eventDesc2 = event.eventDesc2;
        event_Id = event._id;
      }
      var tempWeek = angular.copy(week);
      tempWeek.mondayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Monday').format('MMM DD');
      tempWeek.mondayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Monday').format('YYYYMMDD');
      if (compare(tempWeek.mondayCompareDate, eventDate))
        {  
           tempWeek.mondayEvent = eventType;
           tempWeek.mondayDesc1 = eventDesc1;
           tempWeek.mondayDesc2 = eventDesc2;
           tempWeek.monday_Id = event_Id;
           incrementEvent();          
        };
      tempWeek.tuesdayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Tuesday').format('MMM DD');
      tempWeek.tuesdayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Tuesday').format('YYYYMMDD');
      if (compare(tempWeek.tuesdayCompareDate, eventDate))
        {
          tempWeek.tuesdayEvent = eventType;
          tempWeek.tuesdayDesc1 = eventDesc1;
           tempWeek.tuesdayDesc2 = eventDesc2;
           tempWeek.tuesday_Id = event_Id;
          incrementEvent();
        };
      tempWeek.wednesdayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Wednesday').format('MMM DD');
      tempWeek.wednesdayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Wednesday').format('YYYYMMDD');
      if (compare(tempWeek.wednesdayCompareDate, eventDate))
        {
          tempWeek.wednesdayEvent = eventType;
          tempWeek.wednesdayDesc1 = eventDesc1;
           tempWeek.wednesdayDesc2 = eventDesc2;
           tempWeek.wednesday_Id = event_Id;
          incrementEvent();
        };
      tempWeek.thursdayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Thursday').format('MMM DD');
      tempWeek.thursdayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Thursday').format('YYYYMMDD');
      if (compare(tempWeek.thursdayCompareDate, eventDate))
        {
          tempWeek.thursdayEvent = eventType;
          tempWeek.thursdayDesc1 = eventDesc1;
           tempWeek.thursdayDesc2 = eventDesc2;
           tempWeek.thursday_Id = event_Id;
          incrementEvent();
        };
      tempWeek.fridayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Friday').format('MMM DD');
      tempWeek.fridayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Friday').format('YYYYMMDD');
      if (compare(tempWeek.fridayCompareDate, eventDate))
        {
          tempWeek.fridayEvent = eventType;
          tempWeek.fridayDesc1 = eventDesc1;
           tempWeek.fridayDesc2 = eventDesc2;
           tempWeek.friday_Id = event_Id;
          incrementEvent();
        };
      tempWeek.saturdayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Saturday').format('MMM DD');
      tempWeek.saturdayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Saturday').format('YYYYMMDD');
      if (compare(tempWeek.saturdayCompareDate, eventDate))
        {
          tempWeek.saturdayEvent = eventType;
          tempWeek.saturdayDesc1 = eventDesc1;
           tempWeek.saturdayDesc2 = eventDesc2;
           tempWeek.saturday_Id = event_Id;
          incrementEvent();
        };
      tempWeek.sundayDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Sunday').format('MMM DD');
      tempWeek.sundayCompareDate = moment().year(2019).week(vm.weekYear + weekCounter).isoWeekday('Sunday').format('YYYYMMDD');
      if (compare(tempWeek.sundayCompareDate, eventDate))
        {
          tempWeek.sundayEvent = eventType;
          tempWeek.sundayDesc1 = eventDesc1;
           tempWeek.sundayDesc2 = eventDesc2;
           tempWeek.sunday_Id = event_Id;
          incrementEvent();
        };
      vm.weeks.push(tempWeek);
      weekCounter++;
    }
  }

    function compare(dateTimeA, dateTimeB) {
      var momentA = moment(dateTimeA,"YYYYMMDD");
      var momentB = moment(dateTimeB,"YYYYMMDD");
      if ((momentA > momentB) || (momentA < momentB)) {
         return false;
      } else {
        return true;
      }
    }

    function incrementEvent() {
      if (eventPtr < (eventArray.length -1)) {
        eventPtr++;
        event = eventArray[eventPtr];
        eventDate = event.eventDate;
        eventType = event.eventType; 
        eventDesc1 = event.eventDesc1;
        eventDesc2 = event.eventDesc2;
        event_Id = event._id;
      }
    }

    vm.deleteEvent = function(passedEventId) {
      eventDataFactory.deleteEvent(passedEventId).then(function(response) {
        console.log(response);
        weekCounter = 0;
        eventPtr = 0;
        vm.weeks.length = 0;
        vm.event = {};

        vm.refreshList();
      });
    }

    vm.addEvent = function(vm){
        if (vm.event._id) {
          eventDataFactory.updateEvent(vm.event).then(function(response) {
            console.log(response);
            weekCounter = 0;
            eventPtr = 0;
            vm.weeks.length = 0;
            vm.event = {};

            vm.refreshList();
          }); 
        } else {
          eventDataFactory.addEvent(vm.event).then(function(response) {
            console.log(response);
            weekCounter = 0;
            eventPtr = 0;
            vm.weeks.length = 0;
            vm.event = {};

            vm.refreshList();
          });
        }
    }

    vm.showEvent = function(dateString,typeString,desc1String,desc2String,idString) {
        if (!vm.event){
          vm.event = {};
        }
        vm.event.eventDate = dateString;
        vm.event.eventType = typeString;
        vm.event.eventDesc1 = desc1String;
        vm.event.eventDesc2 = desc2String;
        vm.event._id = idString;
    }

    // vm.goBack = function(){
    //   $location.path('/events');
    // }
    
}