$('document').ready(function(){
    $('#modifica').click(function(){
        $('#mod_bar').toggleClass("activ");
    });
    $('#parola').click(function(){
        $('#div-mod-parola').toggleClass("activ");
    });
    $('#email').click(function(){
        $('#div-mod-email').toggleClass("activ");
    });
    $('#judet').click(function(){
        $('#div-mod-judet').toggleClass("activ");
    });

    $('#mod-email').submit(function(){
        $form = $(this);
        $.post('/api/modifica/email',$form.serializeArray(),function(response){
            if(response=="ok"){
                alert("Email-ul a fost modificat cu succes");
                $('#email_txt').val("");
            }
            else
                if(response=="bad")
                    alert("Eroare la modificarea email-ului");

        });
        return false;
    })
    $('#mod-parola').submit(function(){
        $form = $(this);
        $.post('/api/modifica/parola',$form.serializeArray(),function(response){
            if(response=="ok"){
                alert("Parola a fost modificata cu succes");
                $('#parola_txt').val("");
            }
            else
                if(response=="bad")
                    alert("Eroare la modificarea parole");
                else
                    if(response=="parole")
                        alert("Cele doua parole nu corespund");
        });
        return false;
    })
    $('#mod-judet').submit(function(){
        $form = $(this);
        $.post('/api/modifica/judet',$form.serializeArray(),function(response){
            if(response=="ok"){
                alert("Judetul a fost modificata cu succes");
                $('#parola_txt').val("");
            }
            else
                if(response=="bad")
                    alert("Eroare la modificarea judetului");
                
        });
        return false;
    })
});