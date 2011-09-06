$('document').ready(function(){
    $('#imgh').maphilight();
    var $filtre=1;
    //rss
    $.post('/api/job/scoaterss',function(response){

           $.each(response,function(i){
                $('#ultimele ul').append('<li><a href="'+response[i].id+'">Anunt: '+response[i].Titlu+' - '+response[i].Recompensa+' - '+response[i].Localitate+'</a></li>');
           });
           
    });
    $("area","#judet").click(function(){
       $('#statistici').css('display','none');
       $('#wait').append('Se cauta slujbe...');
        $.post('/api/job/scoate',{'Judet':$(this).attr('id')},function(response){
            $('#wait').empty();
            $('#pagini').append('<a class="paginare">1</a> ');
            pune_joburi(response);
            $("a","#pagini").click(function(){
                paginare($(this));
            });
            $('#joburi').css({display:"block"});
            $('#judet').animate( {marginTop: "-800px"},
                            {
                                step: function(){$('#jobs').css("display","block");},
                                complete: function(){
                                                        $('#judet').css("display","none");
                                                    }
                            }
                          );
           /* $('#filtre_a').toggleClass('active');
            $('#fjudet-a').toggleClass('active');
            $('#judet-h').val($('#fjudet-a').attr('class'));*/
        });
        return false;
    });
    $("#filtreimg").click(function(){
        $('#filtre').toggleClass('active');
    });
    $("#judet-img").click(function(){
        $('#judet-card').toggleClass('active');
    });

    $("#localitate-img").click(function(){
        $('#localitate-card').toggleClass('active');
    });

    $("#varsta-img").click(function(){
        $('#varsta-card').toggleClass('active');
    });

    $("#recompensa-img").click(function(){
        $('#recompensa-card').toggleClass('active');
        
    });


    $("#fjudet-a").click(function(){
        $(this).toggleClass('active');
        $('#judet-h').val($('#fjudet-a').attr('class'));
        if($(this).attr('class')=="active"){
            $filtre++;
        }else{
            $filtre--;
        }
        if(!$filtre){
            $('#filtre_a').toggleClass('active');
            dezactiveaza_filtre();
        }else
        if($("#filtre_a").attr('class')=="active")
            activare_filtre();

    });

    $("#flocalitate-a").click(function(){
        $(this).toggleClass('active');
        $('#localitate-h').val($('#flocalitate-a').attr('class'));
        if($(this).attr('class')=="active"){
            $filtre++;
        }else{
            $filtre--;
        }
        if(!$filtre){
             $('#filtre_a').toggleClass('active');
            dezactiveaza_filtre();
        }else
        if($("#filtre_a").attr('class')=="active")
            activare_filtre();

    });

    $("#fvarsta-a").click(function(){
        $(this).toggleClass('active');
        $('#varsta-h').val($('#fvarsta-a').attr('class'));
        if($(this).attr('class')=="active"){
            $filtre++;
        }else{
            $filtre--;
        }
        if(!$filtre){
             $('#filtre_a').toggleClass('active');
            dezactiveaza_filtre();
        }else
        if($("#filtre_a").attr('class')=="active")
            activare_filtre();

    });

    $("#frecompensa-a").click(function(){
        $(this).toggleClass('active');
        $('#recompensa-h').val($('#frecompensa-a').attr('class'));
        if($(this).attr('class')=="active"){
            $filtre++;
        }else{
            $filtre--;
        }
        if(!$filtre){
             $('#filtre_a').toggleClass('active');
            dezactiveaza_filtre();
        }else
        if($("#filtre_a").attr('class')=="active")
            activare_filtre();

    });


    $("#filtre_a").click(function(){
        $(this).toggleClass('active');
        if($(this).attr('class')=="active")
            activare_filtre();
        else
            dezactiveaza_filtre();
    });
    

})
function dezactiveaza_filtre(){
            $('#wait').append('Se cauta slujbe...');
            $.post('/api/filtre/inactiv',"",function(response){
               $('#wait').empty();
               $('#pagini').empty();
               $('#jobs').empty();
               $('#pagini').append('<a class="paginare">1</a> ');
                pune_joburi(response);
                $("a","#pagini").click(function(){
                    paginare($(this));
                });
            });
}
function activare_filtre(){
            $form=$('#filtre-form');
            $('#wait').append('Se cauta slujbe...');
            $.post('/api/filtre/activ',$form.serializeArray(),function(response){
               $('#wait').empty();
               $('#pagini').empty();
               $('#jobs').empty();
               $('#pagini').append('<a class="paginare">1</a> ');
                pune_joburi(response);
                $("a","#pagini").click(function(){
                    paginare($(this));
                });
            });
}
function pune_joburi(response){
     $.each(response,function(i){
               $('#jobs').append('<div id="job" tip="'+(i+1)+'"><h2><a id="'+response[i].id+'" href="'+response[i].id+'">'+response[i].Titlu+'</a></h2>'+'<h3>'+response[i].Descriere+'</h3></div>');
                    if(i%3==0&&i!=0)
                        $('#pagini').append('<a class="paginare">'+(i/3+1)+'</a> ');
               });
     $('a','#jobs').click(function(){
        deschide_chat($(this));
     });
}

function paginare($link){
      $val= $link.text();
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
}
