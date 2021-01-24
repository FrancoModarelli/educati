//Refrescar la pagina cuando se confirma el modal
$('#myModal').on('hidden.bs.modal', function () { location.reload(); })


//Mostrar el textArea cuando se checkea "Comentario" form de Observaciones.
function showContent() {
    element = document.getElementById("content-text");
    check = document.getElementById("defaultCheck2");
    if (check.checked) {
          element.style.display='block';
    }
    else {
          element.style.display='none';
    }
}
