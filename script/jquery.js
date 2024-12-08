$(document).ready(function () {
    $("tr:odd").css("font-style", "italic")
    
    $('#product-table').css({
        border: '3px solid #4682B4',     
        'margin-top': '50px'        
    });
    $('#title').click(function () {
        $('h1').prepend(" Измененный заголовок"); 
    });
    $('#product-table tbody').on('click', 'tr', function () {
        $(this).toggleClass('selected');
    });


    // Удаление выделенного товара
    $('#delete-product').click(function () {
        $('#product-table tbody tr.selected').remove();
    });

    $('#toggle-table').click(function () {
        $('#product-table').slideToggle(500);
    });

        $('#date').datepicker(); // Применение виджета Datepicker
        $('#date').css({
            width: '150px',
            padding: '5px',
            fontSize: '14px'
        });
});
