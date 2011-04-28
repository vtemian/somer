$(document).ready(function(){
    $('#login-form').submit(function(){
        $form = $(this);
        $.post('/api/login', $form.serializeArray(), function(response) {
           window.location.reload();
        })
        return false;
    })

})