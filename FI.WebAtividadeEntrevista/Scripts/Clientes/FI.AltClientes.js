
$(document).ready(function () {
    if (obj) {
        $('#formCadastro #Nome').val(obj.Nome);
        $('#formCadastro #CEP').val(obj.CEP).mask('99999-999');
        $('#formCadastro #Email').val(obj.Email);
        
        $('#formCadastro #Sobrenome').val(obj.Sobrenome);
        $('#formCadastro #CPF').val(obj.CPF).mask('999.999.999-99');
        $('#formCadastro #Nacionalidade').val(obj.Nacionalidade);
        $('#formCadastro #Estado').val(obj.Estado);
        $('#formCadastro #Cidade').val(obj.Cidade);
        $('#formCadastro #Logradouro').val(obj.Logradouro);
        $('#formCadastro #Telefone').val(obj.Telefone).mask('(99) 9999-9999');

        $('#formCadastro #btnModalBenef').on('click', function () {
            showModal(obj.Id);
        });
    }

    $('#formCadastro').submit(function (e) {
        e.preventDefault();

        const cpf = $(this).find("#CPF").val();
        if (!validarCPF(cpf)) {
            ModalDialog("Ocorreu um erro", "O CPF Informado é inválido.");
            return;
        }
        
        $.ajax({
            url: urlPost,
            method: "POST",
            data: {
                "NOME": $(this).find("#Nome").val(),
                "CEP": $(this).find("#CEP").val().replace(/\D/g, ''),
                "Email": $(this).find("#Email").val(),
                "Sobrenome": $(this).find("#Sobrenome").val(),
                "Nacionalidade": $(this).find("#Nacionalidade").val(),
                "Estado": $(this).find("#Estado").val(),
                "Cidade": $(this).find("#Cidade").val(),
                "CPF": $(this).find("#CPF").val().replace(/\D/g, ''),
                "Logradouro": $(this).find("#Logradouro").val(),
                "Telefone": $(this).find("#Telefone").val()
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
                ModalDialog("Sucesso!", r)
                $("#formCadastro")[0].reset();                                
                window.location.href = urlRetorno;
            }
        });
    })
    
})

function ModalDialog(titulo, texto) {
    var random = Math.random().toString().replace('.', '');
    var texto = '<div id="' + random + '" class="modal fade">                                                               ' +
        '        <div class="modal-dialog">                                                                                 ' +
        '            <div class="modal-content">                                                                            ' +
        '                <div class="modal-header">                                                                         ' +
        '                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>         ' +
        '                    <h4 class="modal-title">' + titulo + '</h4>                                                    ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-body">                                                                           ' +
        '                    <p>' + texto + '</p>                                                                           ' +
        '                </div>                                                                                             ' +
        '                <div class="modal-footer">                                                                         ' +
        '                    <button type="button" class="btn btn-default" data-dismiss="modal">Fechar</button>             ' +
        '                                                                                                                   ' +
        '                </div>                                                                                             ' +
        '            </div><!-- /.modal-content -->                                                                         ' +
        '  </div><!-- /.modal-dialog -->                                                                                    ' +
        '</div> <!-- /.modal -->                                                                                        ';

    $('body').append(texto);
    $('#' + random).modal('show');
}

function validarCPF(cpf) {
    cpf = cpf.replace(/[^\d]+/g, ''); // Remove caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) {
        return false; // Verifica se o CPF tem 11 dígitos e não é uma sequência repetida
    }

    let soma = 0;
    let resto;

    // Valida o primeiro dígito verificador
    for (let i = 1; i <= 9; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (11 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;

    // Valida o segundo dígito verificador
    soma = 0;
    for (let i = 1; i <= 10; i++) {
        soma += parseInt(cpf.charAt(i - 1)) * (12 - i);
    }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(10))) return false;

    return true;
}

function showModal(id) {
    $.ajax({
        url: urlModal,
        type: 'GET',
        data: { id: id },
        success: function (result) {
            //var modalId = 'modal-' + Math.random().toString().replace('.', '');
            var modalId = 'modalBenef';
            var modalHtml = `
                        <div id="${modalId}" class="modal fade modal-lg">
                            <div class="modal-dialog">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h4 class="modal-title">Beneficiários</h4>
                                    </div>
                                    <div class="modal-body">
                                        ${result}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;

            $('body').append(modalHtml);
            $('#' + modalId).modal('show');
            $('#' + modalId + ' #hdIDCLIENTE').val(id);
            $('#' + modalId + ' #CPF').mask('999.999.999-99');
            carregaGridBenef(modalId, id);
        },
        error: function () {
            alert('Erro ao carregar o modal.');
        }
    });

    
}