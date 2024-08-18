
$(document).ready(function () {
    if (obj) {
        //$('#formCadastroBenef #Nome').val(obj.Nome);
        //$('#formCadastroBenef #CPF').val(obj.CPF);
        //$('#formCadastroBenef #hdIDCLIENTE').val(obj.IDCLIENTE);
    }
})

function insereBeneficiario() {
    $.ajax({
        url: urlPost,
        method: "POST",
        data: {
            "NOME": $(this).find("#Nome").val(),
            "CPF": $(this).find("#CPF").val(),
            "IDCLIENTE": $(this).find("#hdIDCLIENTE").val()
        },
        error:
            function (r) {
                if (r.status == 400)
                    ModalDialog("Ocorreu um erro", r.responseJSON);
                else if (r.status == 500)
                    ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
            },
        success:
            function (r) {

            }
    });
}