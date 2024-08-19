
$(document).ready(function () {
    //$('#formCadastro #CPF').mask('000.000.000-00');

    debugger;
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable({
            id: $('#formCadastroBenef #hdIDCLIENTE').val(),
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
    if (document.getElementById("gridBeneficiarios"))
        $('#gridBeneficiarios').jtable('load');
})

function carregaGridBenef() {
    debugger;
    if ($("#formCadastroBenef #gridBeneficiarios"))
        $('#formCadastroBenef #gridBeneficiarios').jtable({
            id: $('#formCadastroBenef #hdIDCLIENTE').val(),
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
