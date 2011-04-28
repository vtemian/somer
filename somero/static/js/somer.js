function clearErrors($form) {
    $('input[type=text]', $form).removeClass('error');
    $('label.error', $form).remove();
}

function displayLoginErrors($form, errors) {
    $('input[type=text], input[type=password]', $form).each(function(i, el) {
        var $el = $(el);
        var fieldName = $el.attr('name');

        if (errors['__all__']) errors['email'] = errors['__all__'];

        if (errors[fieldName]) {
            $el.addClass('error');
            var pos = $el.position();
            $('<label class="error"/>').css({top: pos.top}).text(errors[fieldName][0]).insertAfter($el);
        }
    });
}
