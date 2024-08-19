function carregaGridBenef(modalId, id) {
    var idCliente = id;

    $.getJSON('/Beneficiario/CarregaGrid/' + id, function (data) {
        var tbody = $('#' + modalId + ' #beneficiariosTable tbody');
        tbody.empty();
        data.forEach(function (item) {
            tbody.append(`
                        <tr>
                            <td>${item.Nome}</td>
                            <td>${item.CPF}</td>
                            <td class="actions">
                                <button class="btn btn-primary btn-sm edit-btn" data-id="${item.Id}">Editar</button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${item.Id}">Excluir</button>
                            </td>
                        </tr>
                    `);
        });
    });

    $('#' + modalId + ' #beneficiariosTable').on('click', '.edit-btn', function () {
        var id = $(this).data('id');
        var nome = $(this).closest('tr').find('td').eq(0).text();
        var cpf = $(this).closest('tr').find('td').eq(1).text();
        $('#' + modalId + ' #editNome').val(nome);
        $('#' + modalId + ' #editCPF').val(cpf);
        $('#' + modalId + ' #editId').val(id);
        $('#' + modalId + ' #editModal').modal('show');
    });

    $('#' + modalId + ' #beneficiariosTable').on('click', '.delete-btn', function () {
        var id = $(this).data('id');
        $('#' + modalId + ' #confirmDelete').data('id', id);
        $('#' + modalId + ' #deleteModal').modal('show');
    });

    $('#' + modalId + ' #saveChanges').click(function () {
        //var idCliente = ('#' + modalId + ' #hdIDCLIENTE').val();
        var id = $('#' + modalId + ' #editId').val();
        var nome = $('#' + modalId + ' #editNome').val();
        var cpf = $('#' + modalId + ' #editCPF').val();
        $.ajax({
            url: '/Beneficiario/Alterar/' + id,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Id: id,
                Nome: nome,
                CPF: cpf
            }),
            success: function (result) {
                alert(result);
                $('#' + modalId + ' #editModal').modal('hide');
                // Recarregue os dados da tabela
                $.getJSON('/Beneficiario/Alterar/' + id, function (data) {
                    var tbody = $('#' + modalId + ' #beneficiariosTable tbody');
                    tbody.empty();
                    data.forEach(function (item) {
                        tbody.append(`
                                    <tr>
                                        <td>${item.Nome}</td>
                                        <td>${item.CPF}</td>
                                        <td class="actions">
                                            <button class="btn btn-primary btn-sm edit-btn" data-id="${item.Id}">Editar</button>
                                            <button class="btn btn-danger btn-sm delete-btn" data-id="${item.Id}">Excluir</button>
                                        </td>
                                    </tr>
                                `);
                    });
                });

                carregaGridBenef(modalId, idCliente);
            }
        });
    });

    $('#' + modalId + ' #confirmDelete').click(function () {
        var id = $(this).data('id');
        $.ajax({
            url: '/Beneficiario/Excluir/' + id,
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                Id: id
            }),
            error:
                function (r) {
                    if (r.status == 400)
                        ModalDialog("Ocorreu um erro", r.responseJSON);
                    else if (r.status == 500)
                        ModalDialog("Ocorreu um erro", "Ocorreu um erro interno no servidor.");
                },
            success: function (result) {
                alert(result);
                $('#' + modalId + ' #deleteModal').modal('hide');
                // Recarregue os dados da tabela
                $.getJSON('/Beneficiario/Excluir/' + id, function (data) {
                    var tbody = $('#' + modalId + ' #beneficiariosTable tbody');
                    tbody.empty();
                    data.forEach(function (item) {
                        tbody.append(`
                                    <tr>
                                        <td>${item.Nome}</td>
                                        <td>${item.CPF}</td>
                                        <td class="actions">
                                            <button class="btn btn-primary btn-sm edit-btn" data-id="${item.Id}">Editar</button>
                                            <button class="btn btn-danger btn-sm delete-btn" data-id="${item.Id}">Excluir</button>
                                        </td>
                                    </tr>
                                `);
                    });
                });

                carregaGridBenef(modalId, idCliente);
            }
        });
    });
}

function carregaGridBenef_old() {
    debugger;
    if ($("#formCadastroBenef #gridBeneficiarios"))
        $("#formCadastroBenef #gridBeneficiarios").jtable({
            title: '',
            paging: false, //Enable paging
            pageSize: 10, //Set page size (default: 10)
            sorting: false, //Enable sorting
            defaultSorting: 'Nome ASC', //Set default sorting
            actions: {
                listAction: '/Beneficiario/BeneficiarioList/',
            },
            fields: {
                Nome: {
                    title: 'CPF',
                    width: '35%'
                },
                Email: {
                    title: 'Nome',
                    width: '50%'
                },
                Ações: {
                    title: '',
                    display: function (data) {
                        return '<button onclick="window.location.href=\'' + urlAlteracao + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Alterar</button> ' +
                            '<button onclick="window.location.href=\'' + urlExcluir + '/' + data.record.Id + '\'" class="btn btn-primary btn-sm">Excluir</button>';
                    }
                }
            }
        });

    //Load student list from server
    if ($("#formCadastroBenef #gridBeneficiarios"))
        $("#formCadastroBenef #gridBeneficiarios").jtable('load');
}

//$(document).ready(function () {
//    // Inicializa o jTable para gridBeneficiarios
//    if (document.getElementById("gridBeneficiarios")) {
//        $('#gridBeneficiarios').jtable({
//            title: 'Lista de Beneficiários',
//            actions: {
//                listAction: {
//                    url: '/Beneficiario/BeneficiarioList/',
//                    data: function () {
//                        return {
//                            id: $('#formCadastroBenef #hdIDCLIENTE').val() // Passa o ID para a URL de listagem
//                        };
//                    }
//                },
//                //createAction: {
//                //    url: '/Beneficiario/Create/',
//                //    type: 'POST',
//                //    data: function () {
//                //        return {
//                //            id: $('#formCadastroBenef #hdIDCLIENTE').val() // Passa o ID para a URL de criação
//                //        };
//                //    }
//                //},
//                updateAction: {
//                    url: '/Beneficiario/Alterar/',
//                    type: 'POST',
//                    data: function () {
//                        return {
//                            id: $('#formCadastroBenef #hdIDCLIENTE').val() // Passa o ID para a URL de atualização
//                        };
//                    }
//                },
//                deleteAction: {
//                    url: '/Beneficiario/Excluir/',
//                    type: 'POST',
//                    data: function () {
//                        return {
//                            id: $('#formCadastroBenef #hdIDCLIENTE').val() // Passa o ID para a URL de exclusão
//                        };
//                    }
//                }
//            },
//            fields: {
//                Id: {
//                    key: true,
//                    create: false,
//                    edit: false,
//                    list: false
//                },
//                Nome: {
//                    title: 'Nome',
//                    width: '35%',
//                    edit: true
//                },
//                Email: {
//                    title: 'CPF',
//                    width: '50%',
//                    edit: true
//                },
//                Ações: {
//                    title: 'Ações',
//                    width: '15%',
//                    sorting: false,
//                    edit: false,
//                    create: false,
//                    display: function (data) {
//                        var $editButton = $('<button class="btn btn-primary btn-sm">Alterar</button>')
//                            .click(function () {
//                                $('#gridBeneficiarios').jtable('editRecord', {
//                                    key: data.record.Id,
//                                    record: data.record
//                                });
//                            });

//                        var $deleteButton = $('<button class="btn btn-danger btn-sm">Excluir</button>')
//                            .click(function () {
//                                if (confirm('Tem certeza que deseja excluir este registro?')) {
//                                    $('#gridBeneficiarios').jtable('deleteRecord', {
//                                        key: data.record.Id,
//                                        clientOnly: false
//                                    });
//                                }
//                            });

//                        return $('<div></div>')
//                            .append($editButton)
//                            .append($deleteButton);
//                    }
//                }
//            }
//        });

//        // Carrega os dados na tabela
//        $('#gridBeneficiarios').jtable('load');
//    }
//});
