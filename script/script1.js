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