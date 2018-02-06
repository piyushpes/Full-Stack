     $(document).ready(function(){

            $("#reservetablebutton").click(function(){
                $("#reserveTableModal").modal('toggle');
            });

            $("#loginModalButton").click(function(){
                $("#loginModal").modal('toggle');
            });



            $("#mycarousel").carousel({interval : 2000});
            
            $("#carousel-button").click(function(){
                if ($("#carousel-button span").hasClass("fa-pause")) {
                    $("#carousel-button span").removeClass("fa-pause");
                    $("#carousel-button span").attr("class","fa fa-play");
                    $("#mycarousel").carousel('pause');
                }
                else{
                    $("#carousel-button span").removeClass("fa-play");
                    $("#carousel-button span").attr("class","fa fa-pause"); 
                    $("#mycarousel").carousel('cycle');
                }
                
                

            });

        });