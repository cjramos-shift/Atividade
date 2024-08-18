function showModal(id) {
    $.ajax({
        url: urlModal,
        type: 'GET',
        data: { id: id },
        success: function (result) {
            var modalId = 'modal-' + Math.random().toString().replace('.', '');
            var modalHtml = `
                        <div id="${modalId}" class="modal fade" tabindex="-1" role="dialog">
                            <div class="modal-dialog" role="document">
                                <div class="modal-content">
                                    <div class="modal-header">
                                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                                        <h4 class="modal-title">Detalhes</h4>
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
        },
        error: function () {
            alert('Erro ao carregar o modal.');
        }
    });
}