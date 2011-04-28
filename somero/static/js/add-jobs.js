$('document').ready(function(){
   $('#adauga').click(function(){
      $('#add_job').toggleClass('active');
   });
   $('#add').submit(function(){
       $form = $(this);
       alert('ad');
       $.post('/api/job/adauga',$form.serializeArray(),function(response){
              if(response.trim()==''){
                $('#mesaj_add').animate(
                                            {display:"inline"},
                                            500,
                                            function(){
                                                $('#mesaj_add').animate({display:"none"},500);
                                            }
                                       );
              }
       });
       return false;
   });
});