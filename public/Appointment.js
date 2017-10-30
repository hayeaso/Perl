function isFutureDate(idate) {
   var today = new Date().getTime(),
      idate = idate.split("/");
   idate = new Date(idate[2], idate[0] - 1, idate[1]).getTime();
   return (today - idate) < 0 ? true : false;
}

function validateTimeHhMm() {
   var timeInput = $('#time').val();
   var isValid = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/.test(timeInput);

   $("#error").empty();

   if (isValid) {

      $('#time').css("background-color", "green");
      return true;

   } else {
      $('#time').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Time!</p>");
      return false;
   }

}
function validateDesc() {
   var descInput = $('#desc').val();
   $("#error").empty();

   if (descInput!="") {

      $('#desc').css("background-color", "green");
      return true;

   } else {
      $('#desc').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Description!</p>");
      return false;
   }

}



function validateDate() {
   var dateInput = $('#date').val();

   isValidDt = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/.test(dateInput);
   $("#error").empty();
   if (isValidDt && isFutureDate(dateInput)) {

      $('#date').css("background-color", "green");
      return true;

   } else {
      $('#date').css("background-color", "red");
      $("#error").append("<p>Please enter a valid Date in the future!</p>");
      return false;
   }

}

$('#frm').css("display", "none");

function showForm() {

   $('#new').val("ADD");
   $('#frm').css("display", "block");
   $("#new").click(function() {
      var callTimeValidator = validateTimeHhMm();
      var callDateValidator = validateDate();
	  var callDescValidator=validateDesc();

      if (callTimeValidator == true && callDateValidator == true && callDescValidator == true) {
         $("#frm").submit();

      }
   });
}

function hideForm() {

   $('#new').val("NEW");
   $('#frm').css("display", "none");

}
$(function() {
   $("#date").datepicker();

});

$('.clockpicker').clockpicker({

   donetext: 'Done'
});

$(document).ready(

   getAppointments()
);

function getDate(date) {
   var d = new Date(date);
   var day = d.getDate();
   var month = d.getMonth() + 1;
   var year = d.getFullYear();
   var result = year + "-" + day + "-" + month;
   return result;
}

function getTime(date) {
   var d = new Date(date);
   var hours = d.getHours();
   var minutes = d.getMinutes();
   var seconds = d.getSeconds();
   var time = hours + ":" + minutes + ":" + seconds;
   return time;
}

function formatTimeAMPM(date) {

   date = date.split(":");
   var hours = parseInt(date[0]);
   var minutes = parseInt(date[1]);
   var ampm = hours >= 12 ? 'pm' : 'am';
   hours = hours % 12;
   hours = hours ? hours : 12;
   minutes = minutes < 10 ? '0' + minutes : minutes;
   var strTime = hours + ':' + minutes + ' ' + ampm;
   return strTime;
}

function FormatDate(date) {
   date = date.split("-");
   var month = parseInt(date[2]);

   var day = parseInt(date[1]);
   var monthNames = ["January ", "February ", "March ", "April ", "May ", "June ",
      "July ", "August ", "September ", "October ", "November ", "December "
   ];
   var result = monthNames[month - 1].concat(day.toString());
   return result;
}

function getAppointments() {
	$("#error").empty();
   var toSelect = $('#toSelect').val();
   $('#mytbl').empty();
   $.ajax({
      type: "GET",
      url: "http://localhost/perl/SelectData.cgi",
      data: {
         "toSelect": toSelect

      },
      async: false,
      contentType: "application/json; charset=utf-8",
      dataType: "json",

      success: function(jsonData) {

         if (Object.keys(jsonData).length == 0) {

            $("#error").append("<p>No result !</p>");
         } else {
            var tr;
            tr = $("#mytbl");
          //  tr.append('<table class="table table-bordered"> ');
            tr.append(" <tr> ");
            tr.append(" <th>Date </th>");
            tr.append(" <th> Time </th>");
            tr.append("<th> Description </th>  ");
            tr.append(" </tr>");

            for (var i = 0; i < jsonData.length; i++) {

               tr.append("<tr>"+
               "<td>" + FormatDate(getDate(jsonData[i].Date)) + "</td>"+
                    +"<td>" + FormatDate(getDate(jsonData[i].Date)) + "</td>"
                  +"  <td>" + formatTimeAMPM(getTime(jsonData[i].Date)) + "</td>"
                  +"  <td>" + jsonData[i].Description + "</td>"
                  +"   </tr> ");
              //   tr.append();
                 tr.append();
                 tr.append();
               tr.append("</tr>");

            }
    tr.append("</table>");

         }
      },
      error: function(request, status, error) {
         alert(request.responseText);
      }
   });
}
