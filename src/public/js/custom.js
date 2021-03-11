function readURL(input) {
    if (input.files && input.files[0]) {

        var reader = new FileReader();
        reader.onload = function(e) {

            $('label[for="' + $(input).attr('id') + '"] img')
                .attr('src', e.target.result);
            console.log('Ici')
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function editcoach(e, coach) {
    $('#ed_bash').attr('src', '/static/assets/profile/' + coach.image);
    $('#ed_id').val(coach.id);
    $('#ed_name').val(coach.name);
    $('#ed_lastname').val(coach.lastname);
    $('#ed_phone').val(coach.phone);
    $('#ed_email').val(coach.email);
    $('#ed_phone').val(coach.phone);
    $('#ed_matricule').val(coach.matricule);
    $('#ed_username').val(coach.username);
    $('#ed_password').val(coach.password);
    $('#ed_role').val(coach.role);
    $(`#ed_category option[value='${coach.category}]'`).attr('selected', 'selected');
    $('#modalEditCoach').modal();
}

function deletecoach(e, coach) {
    $('#de_id').val(coach.id);
    $('#de_title').text('Confirmez-vous la suppression de coach ' + coach.lastname + ' ?');
    $('#deleteCoach').modal();
}

function showcoach(e, coach) {
    $('#sh_id').val(coach.id);
    $('#sh_title').text('Confirmez-vous la suppression de coach ' + coach.lastname + ' ?');
    $('#showCoach').modal();
}
$(document).ready(function() {
    /* show file value after file select */


    $('.custom-file-input').on('change', function() {
        var fileName = document.getElementById("exampleInputFile").files[0].name;
        $(this).next('.form-control-file').addClass("selected").html(fileName);
    })

});
$(document).ready(function() {
    $(document).on('change', '.btn-file :file', function() {
        var input = $(this),
            numFiles = input.get(0).files ? input.get(0).files.length : 1,
            label = input.val().replace(/\\/g, '/').replace(/.*\//, '');
        input.trigger('fileselect', [numFiles, label]);
    });
    $('.btn-file :file').on('fileselect', function(event, numFiles, label) {
        var input = $(this).parents('.input-group').find(':text'),
            log = numFiles > 1 ? numFiles + ' files selected' : label;
        if (input.length) {
            input.val(log);
        } else {
            if (log) alert(log);
        }
    });
})