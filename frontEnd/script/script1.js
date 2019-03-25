$(document).ready(function(){

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

 function NFC()
 {
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

    $(".submitBut").click(function(){
        $(".info").html("");
        var module = $(".moduleName").val();
        var startDate = $(".startDate").val();
        var endDate = $(".endDate").val();

        console.log(" submit workking"+module+startDate+endDate);
      
        if(module == "ATM Simulation")
        {
           
        }
        if(module == "Authenticaion")
        {
           
        }
        if(module == "Facial Recognition")
        {
            
        }
        if(module == "NFC")
        {
            NFC();
        }
        if(module == "OTP")
        {
            OTP()
        }
        if(module == "Client Information System")
        {
            
        }
        if(module == "Client Accounts System")
        {
            
        }
        if(module == "Client Notification")
        {
            ClientInformation();
        }
    });
});