
//$(document).ready(function () {
//    $('#formCadastroBenef #CPF').mask('999.999.999-99');
//})

function insereBeneficiario() {

    var cpf = $('#modalBenef #CPF').val();

    if (!validarCPF(cpf)) {
        ModalDialog("Ocorreu um erro", "O CPF Informado é inválido.");
        return;
    }

    cpf = cpf.replace(/[^\d]+/g, '');

    $.ajax({
        url: "/Beneficiario/Incluir/" + $('#formCadastroBenef #hdIDCLIENTE').val(),
        method: "POST",
        data: {
            "NOME": $('#modalBenef #Nome').val(),
            "CPF": cpf,
            "IDCLIENTE": $('#modalBenef #hdIDCLIENTE').val()
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