$(document).ready(function(){
    
    console.log("jquery working..");
    var startDate;
    var endDate;
   

    function request(url, system1, startDate1, endDate1)
    {
        startDate = startDate1;
        endDate =endDate1;
        $.get( url, {system: system1, start:startDate1,end:endDate1}, 
        function( data ) 
        {
           // console.log(data);
      
            if(system1 == "ATMSS")
            {
                ATMTable(data);
                ATMGraphs(data);
            }
            if(system1 == "AUTH")
            {
                authTable(data);
                authGraphs(data);
            }
            if(system1 == "FRS")
            {
                console.log(data);
                FRSTable(data);
                FRSGraphs(data);
            }
            if(system1 == "CRDS")
            {
                CRDSTable(data);
                CRDSGraphs(data);
            }
            if(system1 == "OTPS")
            {
                OPTSTable(data);
                OTPSGraphs(data);
            }
            if(system1 == "CIS")
            {
                CISTable(data);
               CISGraphs(data);
            }
            if(system1 == "CAS")
            {
                CASTable(data);
                CASGraphs(data);
            }
            if(system1 == "NS")
            {
                console.log(data);
                nsTable(data);
                nsGraphs(data)
            }
            if(system1 == "REP")
            {
                REPTable(data);
                REPGraphs(data);
            }
        });
    }

 

      $('body').on('keyup', '.ch', function() {
         // Declare variables 
        // console.log("sort");
         var input, filter, table, tr, td, i, txtValue;
         input = $('body').find('#myInput1').val();
        // console.log(input);
         filter = input.toUpperCase();
         table = $('body').find("#myTable");
         tr = $('body').find("tr");
       
         // Loop through all table rows, and hide those who don't match the search query
         for (i = 0; i < tr.length; i++) 
         {
           td = tr[i].getElementsByTagName("td");
           for(j = 0; j<td.length; j++)
           {
            if (td[j]) 
            {
                txtValue = td[j].textContent || td[j].innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) 
                {
                    tr[i].style.display = "";
                    break;
                } 
                else 
                {
                    tr[i].style.display = "none";
                }
            }
            } 
         }
      });

      

    var grow = true;
      $('body').on('click', '.hideBut', function() {
         // console.log("hide");
          if(grow)
          {
            var table = $('body').find('#myTable').toggle();
            $('body').find('#myInput1').toggle();
            $('body').find('.hideBut').html("Show Table");
            $('body').find('.tables').css("height","200px");
            grow = false;
          }
          else
          {
            var table = $('body').find('#myTable').toggle("slow", "swing");
            $('body').find('#myInput1').toggle();
            $('body').find('.hideBut').html("Hide Table");
            $('body').find('.tables').css("height","100vh");
            $('body').find('#ch').toggle();
            grow = true;
          }
      });


      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////CHARTS///////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function chartOne(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;
  Data[4] = 0
  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['Authentication'] == 'Password')
      {
          Data[0]++;
      }
      if(obj[i]['Authentication'] == 'NFC')
      {
          Data[1]++;
      }
      if(obj[i]['Authentication'] == 'Facial Recognition')
      {
          Data[2]++;
      }
      if(obj[i]['Authentication'] == 'OTP')
      {
          Data[3]++;
      }
      if(obj[i]['Authentication'] == 'Card_Num')
      {
          Data[3]++;
      }
  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Password', 'NFC', 'Facial Recognition', 'OTP','Card Number',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                   'rgba(255, 99, 132, 0.2)',
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',

                  'rgba(255, 99, 132, 1)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}








function chartTwo(obj)
{

  var timeDiff = Math.abs(endDate - startDate);
  var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
  console.log(dayDifference);
  var Data =[];
  var Label =[];
  var currenttime = startDate;
  for(var i = 0; i<dayDifference; i++)
  {

       Data[i] = 0;
  }
  for(var i = 0; i<dayDifference; i++)
  {

      // Data[i] = 0;
      Label[i] = convert(currenttime);
      for(var j = 0; j < obj.length; j++)
      {
         
          if(obj[j]['timestamp'] >= currenttime &&  obj[j]['timestamp'] <= currenttime+86400000)
          {

              console.log("+"+obj[j]['timestamp']);
              Data[i]++;
          }
         
      }
      currenttime = currenttime+86400000;
  }


  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart2');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: Label,
          datasets: [{
              label: 'Daily users',
              data: Data,
              backgroundColor: 
                  'rgba(255, 99, 132, 0.2)'
                 
              ,
              borderColor: 
                  'rgba(255, 99, 132, 1)'
                  
              ,
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////ATM SIMULATION//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function ATMTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">ATM SIMULATION REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above
  //console.log(data);

  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>URL</th><th>Response Code</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['url'] + '</td>';
          table += '<td>' + data[i]['response_code'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}




function ATMGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
    var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>URL Requests</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  

  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneATM(data);
  chartTwo(data);
  
}


//Still waiting for Response Codes so I can create the chart


//client accounts, client info, and authentication
 function chartOneATM(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  
  






  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['url'].includes('https://mini-project-authentication') )
      {
          Data[0]++;
      }
      if(obj[i]['url'].includes('https://clientaccounts.herokuapp.com'))
      {
          Data[1]++;
      }
      
  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Authentication', 'Cleint Accounts',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                 
                 'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                   'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}









////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////AUTHENTICATION//////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function authTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">AUTHENTICATION REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above
  //console.log(data);

  var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>Client ID</th><th>Authentication</th><th>state</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['ClientID'] + '</td>';
          table += '<td>' + data[i]['authentication'] + '</td>';
          table += '<td>' + data[i]['State'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}




function authGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
   var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Authentication</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  
  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOne(data);
  chartTwo(data);
  
}







////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////CLIENT INFORMATION//////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function CISTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">CLIENT INFORMATION REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  heading += '<a href="https://pdf-ace.com/pdfme/" target= "_blank">Save as PDF</a>';

  heading += '<a href="https://google.com/saveaspdf">Save this page as PDF</a>';
  //dont change above


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>Transaction ID</th><th>Transaction Type</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['client_id'] + '</td>';
          table += '<td>' + data[i]['transaction_id'] + '</td>';
          table += '<td>' + data[i]['transaction_type'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  

  });


  
 
}



function CISGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
  var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Transactions</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  

  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneCIS(data);
  chartTwo(data);
  
}







function chartOneCIS(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;
  Data[4] = 0;
  Data[5] = 0;
  Data[6] = 0;
  Data[7] = 0;
  Data[8] = 0;
  Data[9] = 0;
  Data[10] = 0;
  Data[11] = 0;


  /*
Transactions can be INSERT, DELETE, DELETE_AUTH, 
RETRIEVE_EMAIL_NS, REACTIVATED, UPDATED,  RETRIEVE_ID_CAS,
RETRIEVE_ID_AUTH, RETRIEVE_ID_FRS, RETRIEVE_ID_CRDS, RETRIEVE_ID_NS
11
*/



  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['transaction_type'] == 'INSERT')
      {
          Data[0]++;
      }
      if(obj[i]['transaction_type'] == 'DELETE')
      {
          Data[1]++;
      }
      if(obj[i]['transaction_type'] == 'DELETE_AUTH')
      {
          Data[2]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_EMAIL_NS')
      {
          Data[3]++;
      }
       if(obj[i]['transaction_type'] == 'REACTIVATED')
      {
          Data[4]++;
      }
      if(obj[i]['transaction_type'] == 'UPDATED')
      {
          Data[5]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_CAS')
      {
          Data[6]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_AUTH')
      {
          Data[7]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_FRS')
      {
          Data[8]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_CRDS')
      {
          Data[9]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_NS')
      {
          Data[10]++;
      }
      if(obj[i]['transaction_type'] == 'RETRIEVE_ID_CIS')
      {
          Data[11]++;
      }
  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Insert', 'Delete', 'Delete Authentication', 'Retrieve Email','Updated', 'Retrive ID CAS', 'Retrieve ID Auth', 'Retrieve ID FRS','Retrive ID CRDS','Retrive ID NS','RETRIEVE ID CIS',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                 
                 'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                   'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(75, 192, 192, 1)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////CLIENT ACCOUNT//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CASTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">ClIENT ACCOUNTS REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above
  console.log(data);


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>Event</th><th>Account ID</th><th>Amount</th><th>Type</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['ClientID'] + '</td>';
          table += '<td>' + data[i]['event'] + '</td>';
          table += '<td>' + data[i]['accountID'] + '</td>';
          table += '<td>' + data[i]['amount'] + '</td>';
          table += '<td>' + data[i]['type'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}

function CASGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
   var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Events</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  


  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneCAS(data);
  chartTwo(data);
  
}


 function chartOneCAS(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;
  Data[4] = 0;
  Data[5] = 0;
  Data[6] = 0;
  Data[7] = 0;
  Data[8] = 0;

  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['event'] == 'Added Client')
      {
          Data[0]++;
      }
      if(obj[i]['event'] == 'Client Accounts Requested')
      {
          Data[1]++;
      }
      if(obj[i]['event'] == 'Account Balance Requested')
      {
          Data[2]++;
      }
      if(obj[i]['event'] == 'Mini Statement Requested')
      {
          Data[3]++;
      }
       if(obj[i]['event'] == 'Withdrawal')
      {
          Data[4]++;
      }
      if(obj[i]['event'] == 'Deposit')
      {
          Data[5]++;
      }
      if(obj[i]['event'] == 'Client Account Created')
      {
          Data[6]++;
      }
      if(obj[i]['event'] == 'Client Deactivation Requested by CIS')
      {
          Data[7]++;
      }
       if(obj[i]['event'] == 'Client Reactivation Requested by CIS')
      {
          Data[8]++;
      }

  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Clients Added', 'Account Requests', 'Balance Requests', 'Statement Requests','Withdrawals', 'Deposits', 'Accounts Created', 'Accounts Deactivated','Accounts Reactivated',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',


                  'rgba(54, 162, 235, 1)',
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                  'rgba(75, 192, 192, 1)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}






////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////ONE TIME PIN//////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



function OPTSTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">OTPS REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>OTP</th><th>Success</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['clientID'] + '</td>';
          table += '<td>' + data[i]['OTP'] + '</td>';
          table += '<td>' + data[i]['success'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}


function OTPSGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
 var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Success Status</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  


  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneOTPS(data);
  chartTwo(data);
  
}


 function chartOneOTPS(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
 
  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['success'] == '1')
      {
          Data[0]++;
      }
      if(obj[i]['success'] == '0')
      {
          Data[1]++;
      }
  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['True', 'False',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                 
                 
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////CLIENT NOTIFICATION///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function NSTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">CLIENT NOTIFICATION REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>Code</th><th>Description</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['clientID'] + '</td>';
          table += '<td>' + data[i]['code'] + '</td>';
          table += '<td>' + data[i]['description'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}


function NSGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
  var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Responses</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  

  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneNS(data);
  chartTwo(data);
  
}



/*250 - Email sent successfully
421 - Destination server unavailable or does not exist
422 - storage limit exceeded
550 - email address does not exist*/

 function chartOneNS(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;

 
  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['code'] == '250')
      {
          Data[0]++;
      }
      if(obj[i]['code'] == '421')
      {
          Data[1]++;
      }
       if(obj[i]['code'] == '422')
      {
          Data[2]++;
      }
      if(obj[i]['code'] == '550')
      {
          Data[3]++;
      }
  }

  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Email sent successfully', 'Destination server error', 'Storage limit exceeded','Email address does not exist',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                 
                 
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}








////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////NFC CARDS///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function CRDSTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">CARDS SYSTEM REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Status Code</th><th>Method</th><th>URL</th><th>IP Address</th></tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['date'] + '</td>';
          table += '<td>' + data[i]['statusCode'] + '</td>';
          table += '<td>' + data[i]['method'] + '</td>';
          table += '<td>' + data[i]['url'] + '</td>';
          table += '<td>' + data[i]['ip'] + '</td>';

      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}


function CRDSGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
   var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Responses</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
 
  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneCRDS(data);
  chartTwo(data);
  
}


/*250 - Email sent successfully
421 - Destination server unavailable or does not exist
422 - storage limit exceeded
550 - email address does not exist*/

 function chartOneCRDS(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;
  Data[4] = 0;
  Data[5] = 0;

 
  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['statusCode'] == '200')
      {
          Data[0]++;
      }
      if(obj[i]['statusCode'] == '304')
      {
          Data[1]++;
      }
      if(obj[i]['statusCode'] == '400')
      {
          Data[2]++;
      }
      if(obj[i]['statusCode'] == '401')
      {
          Data[3]++;
      }
       if(obj[i]['statusCode'] == '404')
      {
          Data[4]++;
      }
      if(obj[i]['statusCode'] == '500')
      {
          Data[5]++;
      }
     
  }

  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['Success', 'No response', 'Bad Request','Authentication Error','Request Not Found','Unknown Error'],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                 
                 
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}












////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////FACIAL RECOGNITION////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////FACIAL RECOGNITION////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function FRSTable(data)
{
    $(".tables").html("");//dont change
    var heading = '<h1 class="tableHeading">FACIAL RECOGNITION REPORT</h1>';// change heading
    heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
    // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
    // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
    heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

    //dont change above
    // console.log("DATA COMING");

   console.log(data);

    var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>Success</th></tr><tbody>';

    for(i in data)
    {
        table+= '<tr>';
            table += '<td>' + data[i]['timestamp'] + '</td>';
            table += '<td>' + data[i]['ID'] + '</td>';
            table += '<td>' + data[i]['Success'] + '</td>';
        table += '</tr>'
    }
    table += "</tbody></table>";
    $(".tables").html(heading+table);//dont change


    //this allows for exports
    $('body').find('#myTable').tableExport({
        headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
        footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
        formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
        fileName: "report",                    // (id, String), filename for the downloaded file
        bootstrap: true,                   // (Boolean), style buttons using bootstrap
        position: "top" ,                // (top, bottom), position of the caption element relative to table
        ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
        ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
        ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
        emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
        trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
    });
  
   
}


function FRSGraphs(data)
  {
    $(".graphs").html("");
    var start ='<div class="container graphCont">';
    
     var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
    var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Success Status</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
    var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
    

    var end = '</div>';
  
    $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

    
    chartOneFRS(data);
    chartTwo(data);
    
  }

 
 function chartOneFRS(obj)
  {
    var Data =[];
    Data[0] = 0;
    Data[1] = 0;
   
    for(var i = 0; i < obj.length; i++)
    {
        if(obj[i]['Success'] == '1')
        {
            Data[0]++;
        }
        if(obj[i]['Success'] == '0')
        {
            Data[1]++;
        }
    }
    // 1420070400
    // 1420156800
    // 1420243200//86400
    var ctx = $('body').find('#myChart');
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['True', 'False',],
            datasets: [{
                label: '# of Votes',
                data: Data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                   
                   
                   
                ],
                borderColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    
                ],
                borderWidth: 1
            }]
        },
        options: {
            
        }
    });
  }



























////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////REPORTING NOTIFICATION///////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


function REPTable(data)
{
  $(".tables").html("");//dont change
  var heading = '<h1 class="tableHeading">REPORTING REPORT</h1>';// change heading
  heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
  // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
  // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
  heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

  //dont change above


  var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>System Name</th><</tr><tbody>';

  for(i in data)
  {
      table+= '<tr>';
          table += '<td>' + data[i]['timestamp'] + '</td>';
          table += '<td>' + data[i]['system'] + '</td>';
      table += '</tr>'
  }
  table += "</tbody></table>";
  $(".tables").html(heading+table);//dont change


  //this allows for exports
  $('body').find('#myTable').tableExport({
      headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
      footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
      formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
      fileName: "report",                    // (id, String), filename for the downloaded file
      bootstrap: true,                   // (Boolean), style buttons using bootstrap
      position: "top" ,                // (top, bottom), position of the caption element relative to table
      ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
      ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
      ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
      emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
      trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
  });

 
}


function REPGraphs(data)
{
  $(".graphs").html("");
  var start ='<div class="container graphCont">';
  
   var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
  var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Types of Systems</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart" width="400" height="400"></canvas></div></div>';
  var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" ><h2>Daily Acivity</h2></div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="300"></canvas></div></div>';
  

  var end = '</div>';

  $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

  
  chartOneREP(data);
  chartTwo(data);
  
}


function chartOneREP(obj)
{
  var Data =[];
  Data[0] = 0;
  Data[1] = 0;
  Data[2] = 0;
  Data[3] = 0;
  Data[4] = 0;
  Data[5] = 0;
  Data[6] = 0;
  Data[7] = 0;

  for(var i = 0; i < obj.length; i++)
  {
      if(obj[i]['system'] == 'ATMSS')
      {
          Data[0]++;
      }
      if(obj[i]['system'] == 'AUTH')
      {
          Data[1]++;
      }
      if(obj[i]['system'] == 'CAS')
      {
          Data[2]++;
      }
      if(obj[i]['system'] == 'CIS')
      {
          Data[3]++;
      }
       if(obj[i]['system'] == 'CRDS')
      {
          Data[4]++;
      }
      if(obj[i]['system'] == 'FRS')
      {
          Data[5]++;
      }
      if(obj[i]['system'] == 'NS')
      {
          Data[6]++;
      }
      if(obj[i]['system'] == 'OTPS')
      {
          Data[7]++;
      }
  }
  // 1420070400
  // 1420156800
  // 1420243200//86400
  var ctx = $('body').find('#myChart');
  var myChart = new Chart(ctx, {
      type: 'pie',
      data: {
          labels: ['ATM Simulation', 'Authentication', 'Client Accounts', 'Cleint Information','NFC Cards', 'Facial Recognition', 'Client Notification', 'One Time Pin',],
          datasets: [{
              label: '# of Votes',
              data: Data,
              backgroundColor: [
                  'rgba(0, 0, 0, 0.2)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',

                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                 
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
              ],
              borderWidth: 1
          }]
      },
      options: {
          
      }
  });
}




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

      function chartOne(obj)
      {
        var Data =[];
        Data[0] = 0;
        Data[1] = 0;
        Data[2] = 0;
        Data[3] = 0;
        for(var i = 0; i < obj.length; i++)
        {
            if(obj[i]['Authentication'] == 'Password')
            {
                Data[0]++;
            }
            if(obj[i]['Authentication'] == 'NFC')
            {
                Data[1]++;
            }
            if(obj[i]['Authentication'] == 'Facial Recognition')
            {
                Data[2]++;
            }
            if(obj[i]['Authentication'] == 'OTP')
            {
                Data[3]++;
            }
        }
        // 1420070400
        // 1420156800
        // 1420243200//86400
        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Password', 'NFC', 'Facial Recognition', 'OTP',],
                datasets: [{
                    label: '# of Votes',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                       
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                
            }
        });
      }

      function chartTwo(obj)
      {

        var timeDiff = Math.abs(endDate - startDate);
        var dayDifference = Math.ceil(timeDiff / (1000 * 3600 * 24));
        console.log(dayDifference);
        var Data =[];
        var Label =[];
        var currenttime = startDate;
        for(var i = 0; i<dayDifference; i++)
        {

             Data[i] = 0;
        }
        for(var i = 0; i<dayDifference; i++)
        {

            // Data[i] = 0;
            Label[i] = convert(currenttime);
            for(var j = 0; j < obj.length; j++)
            {
               
                if(obj[j]['timestamp'] >= currenttime &&  obj[j]['timestamp'] <= currenttime+86400000)
                {

                    console.log("+"+obj[j]['timestamp']);
                    Data[i]++;
                }
               
            }
            currenttime = currenttime+86400000;
        }
     
      
        // 1420070400
        // 1420156800
        // 1420243200//86400
        var ctx = $('body').find('#myChart2');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: Label,
                datasets: [{
                    label: 'Daily users',
                    data: Data,
                    backgroundColor: 
                        'rgba(255, 99, 132, 0.2)'
                       
                    ,
                    borderColor: 
                        'rgba(255, 99, 132, 1)'
                        
                    ,
                    borderWidth: 1
                }]
            },
            options: {
                
            }
        });
      }

      function authGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';
        
        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Types of Authentication</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Acivity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';
        

        var end = '</div>';
      
        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change

        
        chartOne(data);
        chartTwo(data);
        
      }

      function nsGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';
        
        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1;// = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Types of Authentication</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Acivity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';
        

        var end = '</div>';
      
        $(".graphs").html(start + results + chart2+ end);//dont change

        
        //chartOne(data);
        chartTwo(data);
        
      }

    function authTable(data)
    {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">AUTHENTICATION REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>Client ID</th><th>Authentication</th><th>state</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + data[i]['timestamp'] + '</td>';
                table += '<td>' + data[i]['ClientID'] + '</td>';
                table += '<td>' + data[i]['authentication'] + '</td>';
                table += '<td>' + data[i]['State'] + '</td>';
            table += '</tr>'
        }
        table += "</tbody></table>";
        $(".tables").html(heading+table);//dont change


        //this allows for exports
        $('body').find('#myTable').tableExport({
            headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
            footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
            formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
            fileName: "report",                    // (id, String), filename for the downloaded file
            bootstrap: true,                   // (Boolean), style buttons using bootstrap
            position: "top" ,                // (top, bottom), position of the caption element relative to table
            ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
            ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
            ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
            emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
            trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
        });
      
       
    }

    function nsTable(data)
    {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">NOTIFICATION REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>Timestamp</th><th>Client ID</th><th>Authentication</th><th>State</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + data[i]['timestamp'] + '</td>';
                table += '<td>' + data[i]['state'] + '</td>';
                table += '<td>' + data[i]['ClientID'] + '</td>';
                table += '<td>' + data[i]['NotifType'] + '</td>';
            table += '</tr>'
        }
        table += "</tbody></table>";
        $(".tables").html(heading+table);//dont change


        //this allows for exports
        $('body').find('#myTable').tableExport({
            headings: true,                    // (Boolean), display table headings (th/td elements) in the <thead>
            footers: true,                     // (Boolean), display table footers (th/td elements) in the <tfoot>
            formats: ["xls", "csv", "txt"],    // (String[]), filetypes for the export
            fileName: "report",                    // (id, String), filename for the downloaded file
            bootstrap: true,                   // (Boolean), style buttons using bootstrap
            position: "top" ,                // (top, bottom), position of the caption element relative to table
            ignoreRows: null,                  // (Number, Number[]), row indices to exclude from the exported file(s)
            ignoreCols: null,                  // (Number, Number[]), column indices to exclude from the exported file(s)
            ignoreCSS: ".tableexport-ignore",  // (selector, selector[]), selector(s) to exclude from the exported file(s)
            emptyCSS: ".tableexport-empty",    // (selector, selector[]), selector(s) to replace cells with an empty string in the exported file(s)
            trimWhitespace: false              // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s)
        });
      
       
    }

    

    function convert(uni)//converts time stamp into readable date
    {
        var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var date = new Date(uni);
        var year = date.getFullYear();
        var month = months_arr[date.getMonth()];
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = "0" + date.getMinutes();
        var seconds = "0" + date.getSeconds();
        // Display date time in MM-dd-yyyy h:m:s format
        var convdataTime = month+' '+day+' '+year+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        
        return convdataTime;
    }


    //slider bar
    var start = 1546300800000;
    var end = Date.now();
    console.log(convert(end)+" = "+ end);
    $( "#slider-range" ).slider({

        range: true,
        min: 1546300800000,
        max: end,
        values: [ 1546300800000, end ],
        slide: function( event, ui ) {
          $( "#amount" ).val(  convert(ui.values[ 0 ])  );
          $( "#amount1" ).val( convert(ui.values[ 1 ]) );
          start = ui.values[ 0 ];
          end = ui.values[ 1 ];
        },
        stop: function(event, ui)
        {
            changing();
        }
      });    
        $( "#amount" ).val( convert(1546300800000));
        $( "#amount1" ).val( convert(end));
        //slider bar end
        

    function OTP()
    {
        //OTP table generator inserts the html table in the div with the class name info/
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

  

 function NFC()
 {
     //NFC table generator inserts the html table in the div with the class name info.
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

function changing(){
    $(".info").html("");
    var module = $(".moduleName").val();
    var startDate = start;
    var endDate = end;
   // console.log("module: "+module);
    //console.log("start date: "+startDate);
    //console.log("end date: "+endDate);
    if(module == null)
    {
        console.log("Please select a module: "+endDate);
        return;
    }

    $(".firstImage").hide();
    if(module == "ATM Simulation")
    {
       request("https://fnbreports-6455.nodechef.com/db","ATMSS", startDate, endDate);
    }
    if(module == "Authenticaion")
    {
       request("https://fnbreports-6455.nodechef.com/db","AUTH", startDate, endDate);
    }
    if(module == "Facial Recognition")
    {
        request("https://fnbreports-6455.nodechef.com/db","FRS", startDate, endDate);
    }
    if(module == "CRDS")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","CRDS", startDate, endDate);
    }
    if(module == "OTP")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","OTPS", startDate, endDate);
        //OTP()
    }
    if(module == "Client Information System")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","CIS", startDate, endDate);
    }
    if(module == "Client Accounts System")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","CAS", startDate, endDate);
    }
    if(module == "Client Notification")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","NS", startDate, endDate);
    }
    if(module == "REP")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","REP", startDate, endDate);
    }
}


    $(".moduleName").change(function(){
        changing();
    } );


  
});