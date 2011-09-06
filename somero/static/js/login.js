$(document).ready(function(){
    var log=0;
    $('#login-btn-da').click(function(){
        $('#login_activ').slideDown(500);
    });
    $('#login-x').click(function(){
        $('#login_activ').fadeOut(300);
    });
    $('#login-btn').click(function(){
        $form = $('#login-form');
        $.post('/api/login', $form.serializeArray(), function(response) {
           window.location.reload();
        })
        return false;
    })
    $('#register-user').click(function(){
        $('#registration').modal({
                        opacity:80,
                        overlayCss: {backgroundColor:"#c6c6c6"}
                    });

    });
    $('#send-registration').click(function(){
    
       $form=$('#registration-form');
       $.post('/api/registration',$form.serializeArray(),function(response){
             if(response=="ok"){
                 $('#registration').empty();
                 $('#registration').append('<div id="anunt">Bine te-am gasit! De acum poti incepe sa iti cauti de munca!</div> <input type="button" value="Multumesc!" class="simplemodal-close">');
                 window.location.reload();
             }else{
                  $('#registration').append('<font color="red">Eroare la transmiterea datelor!Mai incearca mai tarziu!</font>');
             }
       });
       return false;
    });
})