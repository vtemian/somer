$('document').ready(function(){
   $('#adauga').click(function(){
      $('#add_job').toggleClass('active');
   });
   $('#add').submit(function(){
       $form = $(this);
       $.post('/api/job/adauga',$form.serializeArray(),function(response){
              if(response.trim()==''){
                $('#wait').append("Slujba a fost inregistrata").delay();
                $('#wait').empty();
                   $.post('/api/job/scoaterss',function(response){
                       window.location=response[0].id;
                   });
              }
       });
       return false;
   });
});