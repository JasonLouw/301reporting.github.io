$(document).ready(function(){

    /* $.post( "validate-signup.php", 
                { name: name, email:email, password:password1, cellphone:cellphone}, 
                function( data ) 
                {
                     var obj = JSON.parse(data);
                     console.log(obj["results"]);
                     console.log(obj["salt"]);
                     if(obj["results"] == "exists")
                     {
                         $("#emailWrong").text("");
                         $("#emailWrong").text("Email Already Exists");
                     }
                     else
                     {
                         $.post("validate-login.php", 
                        {email:email, password:password1}, 
                        function( data ) 
                        {
                             var obj = JSON.parse(data);
                             console.log(data);


                             if(obj["results"] == "loggedin")
                             {
                                 window.location.replace("../assignment3/practical3.php");
                             }
                         });
                     }
                 });*/

                 
 function request(url, startDate1, endDate1)
 {
     $.get( url, {startDate:startDate1,endDate:endDate1}, 
         function( data ) 
         {
             console.log(data[0]["timestamp"]);
             //  var obj = JSON.parse(data);
            // return obj;
         });
 }

 function OTP()
 {
     var table = '<table class="table"><thead><th>clientID</th><th>OTP</th><th>timeStamp</th><th>success</th></thead><tbody>';
     var obj;

     $.getJSON("tempJson/OTP_Data.json", function(data){
         for(i in data)
         {
             table+= '<tr>';
                 table += '<td>' + data[i]['clientID'] + '</td>';
                 table += '<td>' + data[i]['OTP'] + '</td>';
                 table += '<td>' + data[i]['timeStamp'] + '</td>';
                 table += '<td>' + data[i]['success'] + '</td>';
             table += '</tr>'
         }
         table += "</tbody></table>";
         $(".info").html(table);
     });

 }
 OTP();
 
 function ClientInformation()
 {
     var tableDat = '<table class="table"><thead><th>timestamp</th><th>clientID</th><th>code</th><th>description</th></thead><tbody>';
     var obj;
     

     $.getJSON("tempJson/ClientNotification.json", function(data){
         for(i in data)
         {
             tableDat+= '<tr>';
                 table += '<td>' + data[i]['timestamp'] + '</td>';
                 table += '<td>' + data[i]['clientID'] + '</td>';
                 table += '<td>' + data[i]['code'] + '</td>';
                 table += '<td>' + data[i]['description'] + '</td>';
             tableDat += '</tr>'
         }
         tableDat += "</tbody></table>";
         $(".info").html(tableDat);
     });
 }
 ClientInformation();

 function NFC(){
     var table = '<table class="table"><thead><th>Date</th><th>StatusCode</th><th>method</th><th>url</th><th>cardId</th><th>ip</th></thead><tbody>';
     var obj;

    $.getJSON("tempJson/NFC_data.json",function(data){
         for (i in data){
             table += '<tr>';
                 idate = new Date(data[i]['date']);
                 table += '<td>'+ idate.toLocaleString() +'</td>';
                 //table += '<td>'+ Date(data[i]['date']).toString() +'</td>';
                 table += '<td>'+ data[i]['statusCode'] +'</td>';
                 table += '<td>'+ data[i]['method'] +'</td>';
                 table += '<td>'+ data[i]['url'] +'</td>';
                 table += '<td>'+ data[i]['parameters']['cardId'] +'</td>';
                 table += '<td>'+ data[i]['ip'] +'</td>';
             table += '</tr>';
         }
         
         //console.log(table);
         table += "</tbody></table>";    
         $(".info").html(table);
     });        
 }
 
 NFC();

 $(".submitBut").click(function(){

     var module = $(".moduleName").val();
     var startDate = $(".startDate").val();
     var endDate = $(".endDate").val();

     console.log(" submit workking"+module+startDate+endDate);
     if(module == "ATM Simulation")
     {
         // 2019-01-13T12%3A49%3A37.0000&end=2019-03-13T12%3A49%3A37.0000
          request("https://atm.draper.net.za/api/logs","2019-01-13T00:00:00.0000","2019-03-14T00:00:00.0000")
         //console.log(jsonObj);


     }
     
 });
 
 

});