const $form = $('#checkout-form');
$form.submit(function (status, response) {
    $('#charge-error').addClass('hidden');
    $form.find('button').prop('disabled', true);

    if (response.error) {
        $('#charge-error').text(response.error.message);
        $('#charge-error').removeClass('hidden');
        $form.find('button').prop('disabled', false);
    } else {
        $form.get(0).submit();
    }

    return false;
});
