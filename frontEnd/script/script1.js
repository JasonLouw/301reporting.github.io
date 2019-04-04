$(document).ready(function(){

    console.log("jquery working..");
    var startDate;
    var endDate;


    function request(url, system1, startDate1, endDate1)
    {
        startDate = startDate1;
        endDate =endDate1;

        if (system1 == "NFC")
          system1 = "CRDS";

        if (system1 == "OTP")
          system1 = "OTPS";

        $.get( url, {system: system1, start:startDate1,end:endDate1},
        function( data )
        {
            console.log(data);
            console.log('\n' + system1);

            if(system1 == "ATMSS"){
              atmssTable(data);
            }

            if(system1 == "AUTH"){
                authTable(data);
                authGraphs(data);
            }

            if(system1 == "FRS"){
              frsTable(data);
              frsGraphs(data);
            }

            if(system1 == "CRDS"){
              crdsGraphs(data);
              crdsTable(data);
            }

            if(system1 == "OTPS"){
              otpsGraphs(data);
              otpsTable(data);
            }

            if(system1 == "CIS"){
              cisGraphs(data);
              cisTable(data);
            }

            if(system1 == "CAS"){
              casGraphs(data);
              casTable(data);
            }

            if(system1 == "NS"){
              nsGraphs(data);
              nsTable(data);
            }

            if(system1 == "REP")
            {
              repGraphs(data);
              repTable(data);
            }
        });
    }



      $('body').on('keyup', '.ch', function() {
         // Declare variables
         console.log("sort");
         var input, filter, table, tr, td, i, txtValue;
         input = $('body').find('#myInput1').val();
         console.log(input);
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
          console.log("hide");
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
                    label: '# of Records',
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


      //ATMSS
      function atmssGraphs(data)
      {}
      function atmssTable(data)
      {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">ATM Simulation REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header table"><th>Timestamp</th><th>URL</th><th>Response Code</th><th>Sent</th></tr><tbody>';

        console.log(JSON.stringify(data[60], null, 2));

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                table += '<td><a href="'+data[i]['url']+'">' + data[i]['url'] + '</a></td>';

                table += '<td>' + data[i]['response_code'] + '</td>';
                table += '<td>' + data[i]['sent'] + '</td>';
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

      //AUTH
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
                  table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                  table += '<td>' + data[i]['ClientID'] + '</td>';
                  table += '<td>' + data[i]['Authentication'] + '</td>';
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

      //FRS
      function frsSuccessChart(obj)
      {
        var Data =[];
        Data[0] = 0;
        Data[1] = 0;

        for(var i = 0; i < obj.length; i++){
            if(obj[i]['Success'])
              Data[0]++;
            else
              Data[1]++;
        }

        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Success', 'Failiure'],
                datasets: [{
                    label: '# of Records',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
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
      function frsGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Facial Recognition Success Rate</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Facial Recognition Usage per Day</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        frsSuccessChart(data);
        chartTwo(data);
      }
      function frsTable(data)
      {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">AUTHENTICATION REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>Time</th><th>Client ID</th><th>Success</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
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

      //NFC / CRDS
      function crdsGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Activity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart+ end);//dont change

        chartTwo(data);
      }
      function crdsTable(data)
      {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">NFC REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>ip</th><th>Card Number</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                table += '<td>' + data[i]['ip'] + '</td>';

                var query = JSON.parse(data[i]['query']);

                if (query['rfid'])
                  table += '<td><b>RFID:</b> ' + query['rfid'] + '</td>';
                else
                  if (query['cardNumber'])
                    table += '<td><b>Card Number</b> ' + query['cardNumber'] + '</td>';
                  else
                    table += '<td>none'+ '</td>';

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

      //OTPS
      function otpsSuccessChart(obj)
      {
        var Data =[];
        Data[0] = 0;
        Data[1] = 0;

        for(var i = 0; i < obj.length; i++){
            if(obj[i]['success'])
              Data[0]++;
            else
              Data[1]++;
        }

        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Success', 'Failiure'],
                datasets: [{
                    label: '# of Records',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                    ],
                    borderColor: [
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
      function otpsGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >OTP Success Rate</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >OTP Usage per Day</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        otpsSuccessChart(data);
        chartTwo(data);
      }
      function otpsTable(data)
      {
        $(".tables").html("");//dont change
        var heading = '<h1 class="tableHeading">OTP REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>clientID</th><th>success</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                table += '<td>' + data[i]['clientID'] + '</td>';
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

      //CIS
      function cisChart(obj)
      {
        var Data =[];
        Data[0] = 0;
        Data[1] = 0;
        Data[2] = 0;
        Data[3] = 0;
        Data[4] = 0;
        for(var i = 0; i < obj.length; i++)
        {
            if(obj[i]['transaction_type'] == 'INSERT')
            {
                Data[0]++;
            }
            if(obj[i]['transaction_type'] == 'UPDATED')
            {
                Data[1]++;
            }
            if(obj[i]['transaction_type'].match(/DELETE/g))
            {
                Data[2]++;
            }
            if(obj[i]['transaction_type'] == 'REACTIVATED')
            {
                Data[3]++;
            }
            if(obj[i]['transaction_type'].match(/RETRIEVE/g))
            {
                Data[4]++;
            }
        }
        // 1420070400
        // 1420156800
        // 1420243200//86400
        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Insertions', 'Updates', 'Deletions', 'Reactivations','Retrievals'],
                datasets: [{
                    label: '# of Records',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(192, 75, 192, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(192, 75, 192, 0.2)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {

            }
        });
      }
      function cisGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Transacton Types</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Activity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        cisChart(data);
        chartTwo(data);
      }
      function cisTable(data)
      {

        $(".tables").html("");//dont change

        var heading = '<h1 class="tableHeading">Client Information System REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>clientID</th><th>Transaction ID</th><th>Transaction Type</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + data[i]['timestamp'] + '</td>';
                table += '<td>' + data[i]['client_id'] + '</td>';
                table += '<td>' + data[i]['transaction_id'] + '</td>';
                table += '<td>' + data[i]['transaction_type'] + '</td>';
            table += '</tr>';
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


      //CAS
      function casChart(obj)
      {
        var Data =[];
        Data[0] = 0;
        Data[1] = 0;
        Data[2] = 0;
        Data[3] = 0;
        Data[4] = 0;
        for(var i = 0; i < obj.length; i++)
        {
            if(obj[i]['event'] == 'Client Account Created')
            {
                Data[0]++;
            }
            if(obj[i]['event'] == 'Client Accounts Requested')
            {
                Data[1]++;
            }
            if(obj[i]['event'] == 'Added Client')
            {
                Data[2]++;
            }
            if(obj[i]['event'] == 'Deposit')
            {
                Data[3]++;
            }
            if(obj[i]['event']== "Client Deactivation Requested by CIS")
            {
                Data[4]++;
            }
        }
        // 1420070400
        // 1420156800
        // 1420243200//86400
        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Created', 'Requested', 'Added', 'Deposit','Deactivation'],
                datasets: [{
                    label: '# of Records',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(192, 75, 192, 0.2)',

                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(192, 75, 192, 0.2)',

                    ],
                    borderWidth: 1
                }]
            },
            options: {

            }
        });
      }
      function casGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Transacton Types</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Activity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        casChart(data);
        chartTwo(data);
      }
      function casTable(data)
      {
        $(".tables").html("");//dont change

        var heading = '<h1 class="tableHeading">Client Accounts System REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>Event</th><th>ClientID</th><th>Amount</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                table += '<td>' + data[i]['event'] + '</td>';
                table += '<td>' + data[i]['clientID'] + '</td>';
                table += '<td>' + data[i]['amount'] + '</td>';
            table += '</tr>';
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

      //NS
      function nsChart(obj)
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
            if(obj[i]['code'] == '550')
            {
                Data[1]++;
            }
            if(obj[i]['code'] == '421')
            {
                Data[2]++;
            }
            if(obj[i]['code'] == '422')
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
                labels: ['EmailSuccess', 'EmailNotExist', 'ServerError', 'StorageFull',],
                datasets: [{
                    label: '# of Records',
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
      function nsGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Notification Types</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Activity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        nsChart(data);
        chartTwo(data);
      }
      function nsTable(data)
      {
        $(".tables").html("");//dont change

        var heading = '<h1 class="tableHeading">Notification System REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>ClientID</th><th>Code</th><th>Description</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + convert(data[i]['timestamp']) + '</td>';
                table += '<td>' + data[i]['clientID'] + '</td>';
                table += '<td>' + data[i]['code'] + '</td>';
                table += '<td>' + data[i]['description'] + '</td>';
            table += '</tr>';
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

      //REP
      function repChart(obj)
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
            if(obj[i]['system'] == 'REP')
            {
                Data[8]++;
            }
        }
        // 1420070400
        // 1420156800
        // 1420243200//86400
        var ctx = $('body').find('#myChart');
        var myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['ATMSS', 'AUTH', 'CAS', 'CIS','CRDS', 'FRS', 'NS', 'OTPS','REP',],
                datasets: [{
                    label: '# of Records',
                    data: Data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',

                        'rgba(99,255, 132, 0.2)',
                        'rgba(54, 235, 162, 0.2)',
                        'rgba(86, 255, 206,  0.2)',
                        'rgba(192, 75, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(99,255, 132, 0.2)',
                        'rgba(54, 235, 162, 0.2)',
                        'rgba(86, 255, 206,  0.2)',
                        'rgba(192, 75, 192, 0.2)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {

            }
        });
      }
      function repGraphs(data)
      {
        $(".graphs").html("");
        var start ='<div class="container graphCont">';

        var results = '<div class="row Rows"><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 numResults" >Number of Results</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 Results" >'+data.length+'</div></div>';
        var chart1 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Subsystems</div><div class="col-md-6 col-lg-6 col-sm-6 col-xs-6 chart1" ><canvas id="myChart" width="200" height="200"></canvas></div></div>';
        var chart2 = '<div class="row Rows"><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12" >Daily Activity</div><div class="col-md-12 col-lg-12 col-sm-12 col-xs-12 chart1" ><canvas id="myChart2" width="400" height="200"></canvas></div></div>';


        var end = '</div>';

        $(".graphs").html(start + results +chart1+ chart2+ end);//dont change


        repChart(data);
        chartTwo(data);
      }
      function repTable(data)
      {
        $(".tables").html("");//dont change

        var heading = '<h1 class="tableHeading">Notification System REPORT</h1>';// change heading
        heading +='<button class="hideBut" type="button">Hide Table</button>';//dont change
        // heading +='<button class="pdf" type="button">Export to PDF</button>';//dont change
        // heading +='<button class="excel" type="button">Export to Excel</button>';//dont change
        heading += '<input class="ch" type="text" id="myInput1" placeholder="Search Table">';//dont change

        //dont change above


        var table = '<table id="myTable" string="what"><tr class="header"><th>timestamp</th><th>Subsystem</th></tr><tbody>';

        for(i in data)
        {
            table+= '<tr>';
                table += '<td>' + data[i]['timestamp'] + '</td>';
                table += '<td>' + data[i]['system'] + '</td>';
            table += '</tr>';
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

    function ClientInformation()
    {
        //Client information table generator inserts the html table in the div with the class name info.
        var tableDat = '<table class="table"><thead><th>timestamp</th><th>clientID</th><th>code</th><th>description</th></thead><tbody>';
        var obj;

        $.getJSON("tempJson/ClientNotification_data.json", function(data){
            for(i in data)
            {
                tableDat+= '<tr>';
                tableDat += '<td>' + data[i]['timestamp'] + '</td>';
                tableDat += '<td>' + data[i]['clientID'] + '</td>';
                tableDat += '<td>' + data[i]['code'] + '</td>';
                tableDat += '<td>' + data[i]['description'] + '</td>';
                tableDat += '</tr>'
            }
            tableDat += "</tbody></table>";
            $(".info").html(tableDat);
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
    console.log("module: "+module);
    console.log("start date: "+startDate);
    console.log("end date: "+endDate);
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
    if(module == "NFC")
    {
        var json = request("https://fnbreports-6455.nodechef.com/db","NFC", startDate, endDate);
        //console.log(json);
        // $("<button value='submit' class='downloadPDF' type='button'>Download PDF</button>" ).insertBefore( ".info" );
        // NFC();
        // $(".downloadPDF").click(function(){
        //     // console.log("print pdf");
        //     // table.find('tr').each(function (i, el) {
        //     //     var $tds = $(this).find('td');
        //     //         var x1 = $tds.eq(0).text();
        //     //         var x2 = $tds.eq(1).text();
        //     //         var x3 = $tds.eq(2).text();
        //     //         console.log(x1+x2+x3);
        //     //     // do something with productId, product, Quantity
        //     // });
        //     var placement = 80;
        //     var one = false;
        //     var doc = new jsPDF();
        //     var imgData = '';
        //     doc.addImage(imgData, 'JPEG', 15, 15, 90, 38); doc.text("NFC Report",15,70); $("table tr").each(function(index) { //makes pdf for NFC
        //         var $tds = $(this).find('td');
        //         var x1 = $tds.eq(0).text();
        //         var x2 = $tds.eq(1).text();
        //         var x3 = $tds.eq(2).text();
        //         var x4 = $tds.eq(3).text();
        //         var x5 = $tds.eq(4).text();
        //         var x6 = $tds.eq(5).text();
        //         console.log(x1+" "+x2+" "+x3+" "+x4+" "+x5+" "+x6);
        //         if(one)
        //                 {
        //                     if(x1 != "")
        //                     {
        //                         var date = "Date: "+x1;
        //                         var status = " Status Code: "+x2;
        //                         var method = " Method: "+x3;
        //                         var url = " url: "+x4;
        //                         var card = " Card ID: "+x5;
        //                         var ip = " IP: "+x6;
        //                         doc.setFontSize(8);
        //                         doc.text(date+status+method+url+card+ip,15,placement);
        //                         placement = placement + 5;
        //                     }
        //                 // doc.text(status,20,placement);
        //                 // placement = placement + 10;
        //                 // doc.text(method,20,placement);
        //                 // placement = placement + 10;
        //                 // doc.text(url,20,placement);
        //                 // placement = placement + 10;
        //                 // doc.text(card,20,placement);
        //                 // placement = placement + 10;
        //                 // doc.text(ip,20,placement);
        //                 // placement = placement + 10;
        //                 // doc.text(" ",20,placement);
        //                 }
        //                 one = true;


        //     });
        //     doc.save('nfcReport.pdf')
        // });
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
