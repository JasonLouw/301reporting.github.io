$(document).ready(function(){

    console.log("jquery working..");

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

    function convert(uni)
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
        var convdataTime = month+' '+day+' '+year;//+' '+hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        
        return convdataTime;
       }


    //slider bar

    var start = 1546300800000;
    var end = Date.now();
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
       //todo: make ATM simulation table
    }
    if(module == "Authenticaion")
    {
       //todo: make Authenticaion simulation table
    }
    if(module == "Facial Recognition")
    {
        //todo: make Facial Recognition simulation table
    }
    if(module == "NFC")
    {
    
        $("<button value='submit' class='downloadPDF' type='button'>Download PDF</button>" ).insertBefore( ".info" );
        NFC();
        $(".downloadPDF").click(function(){
            // console.log("print pdf");
            // table.find('tr').each(function (i, el) {
            //     var $tds = $(this).find('td');
            //         var x1 = $tds.eq(0).text();
            //         var x2 = $tds.eq(1).text();
            //         var x3 = $tds.eq(2).text();
            //         console.log(x1+x2+x3);
            //     // do something with productId, product, Quantity
            // });
            var placement = 80;
            var one = false;
            var doc = new jsPDF();
            var imgData = '';
            doc.addImage(imgData, 'JPEG', 15, 15, 90, 38); doc.text("NFC Report",15,70); $("table tr").each(function(index) { //makes pdf for NFC 
                var $tds = $(this).find('td'); 
                var x1 = $tds.eq(0).text(); 
                var x2 = $tds.eq(1).text(); 
                var x3 = $tds.eq(2).text(); 
                var x4 = $tds.eq(3).text(); 
                var x5 = $tds.eq(4).text(); 
                var x6 = $tds.eq(5).text(); 
                console.log(x1+" "+x2+" "+x3+" "+x4+" "+x5+" "+x6); 
                if(one)
                        {
                            if(x1 != "")
                            {
                                var date = "Date: "+x1;
                                var status = " Status Code: "+x2;
                                var method = " Method: "+x3;
                                var url = " url: "+x4;
                                var card = " Card ID: "+x5;
                                var ip = " IP: "+x6;
                                doc.setFontSize(8);
                                doc.text(date+status+method+url+card+ip,15,placement);
                                placement = placement + 5;
                            }
                        // doc.text(status,20,placement);
                        // placement = placement + 10;
                        // doc.text(method,20,placement);
                        // placement = placement + 10;
                        // doc.text(url,20,placement);
                        // placement = placement + 10;
                        // doc.text(card,20,placement);
                        // placement = placement + 10;
                        // doc.text(ip,20,placement);
                        // placement = placement + 10;
                        // doc.text(" ",20,placement);
                        }
                        one = true;

                    
            });
            doc.save('nfcReport.pdf')
        });
    }
    if(module == "OTP")
    {
        OTP()
    }
    if(module == "Client Information System")
    {
        //TODO: make client information table
    }
    if(module == "Client Accounts System")
    {
         //TODO: Client Accounts System
    }
    if(module == "Client Notification")
    {
        ClientInformation();
    }
}


    $(".moduleName").change(function(){
        changing();
    } );


  
});