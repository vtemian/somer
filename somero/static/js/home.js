$('document').ready(function(){
    $("a","#judet").click(function(){
        $.post('/api/job/scoate',{'Judet':$(this).text()},function(response){
            $('#pagini').append('<a class="paginare">1</a> ');
            $.each(response,function(i){
                $('#jobs').append('<div id="job" tip="'+(i+1)+'"><h2>'+response[i].Titlu+'</h2>'+'<h3>'+response[i].Descriere+'</h3></div>');
                if(i%3==0&&i!=0)
                    $('#pagini').append('<a class="paginare">'+(i/3+1)+'</a> ');
            });
            $("a","#pagini").click(function(){
               $val= $(this).text();
               $div1='div#job, .'+(3*($val-1)+1);
               $width="-420px";
               $marime=$("div#job[tip='"+(3*($val-1)+1)+"']").css("margin-top");
               if($marime=="-420px"){
                   $('div#job').filter(function(index){
                        if($(this).attr("tip")>=3*($val-1)+1){return true;}
                   }).animate({marginTop:"0px"});
               }else
                    {
                       $('div#job').filter(function(index){
                            if($(this).attr("tip")<=3*($val-1)){return true;}
                       }).animate({marginTop:$width});
                    }

            });
             $('#judet').animate( {marginTop: "-800px"},
                            {
                                step: function(){$('#jobs').css("display","block");},
                                complete: function(){
                                                        $('#judet').css("display","none");
                                                    }
                            }
                          );
        });
        return false;
    });
    $("#filtre_a").click(function(){
        $('#filtre').toggleClass('active');
    });
    $("#filtre-check").click(function(){
        if($(this).is(':checked')){
            //activez filtrele
            $form=$('#filtre-form');
            $('#pagini').empty();
            $('#jobs').empty();
            $.post('/api/filtre/activ',$form.serializeArray(),function(response){
               $('#pagini').append('<a class="paginare">1</a> ');
               $.each(response,function(i){
                    $('#jobs').append('<div id="job" tip="'+(i+1)+'"><h2>'+response[i].Titlu+'</h2>'+'<h3>'+response[i].Descriere+'</h3></div>');
                    if(i%3==0&&i!=0)
                        $('#pagini').append('<a class="paginare">'+(i/3+1)+'</a> ');
               });
            });
        }else{
            //dezactivez filtrele
        }
    });

})