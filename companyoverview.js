$(document).ready(function(){

    var table = $('#example').DataTable( {
        ajax: {
        	url: 'http://192.168.8.101:8888/employer-stats/1',
        	data: "",
        	dataSrc: 'jobs'
    	},
    	paging: false,
        columns: [
            {
                "className":      'details-control',
                "orderable":      false,
                "data":           null,
                "defaultContent": ''
            },
            { "data": "id" },
            { "data": "title" },
            { "data": "like" },
            { "data": "dislikes" },
            { "data": "like"},
        ],  
        columnDefs: [ {
            targets: 5,
            createdCell: function (td, cellData, rowData, row, col) {
                var value = rowData["like"]-rowData["dislikes"];
                if(value > 0){
                    $(td).html(value).css('color', 'green');
                }
                else{
                    $(td).html(value).css('color', 'red');   
                }
            }
        } ]           
    });

    $('#example tbody').on('click', 'td.details-control', function () {
        var tr = $(this).closest('tr');
        var row = table.row( tr );
 
        if ( row.child.isShown() ) {
            // This row is already open - close it
            row.child.hide();
            tr.removeClass('shown');
        }
        else {
            // Open this row
            row.child( format(row.data()) ).show();
            tr.addClass('shown');
        }
    } );

});

function format ( d ) {
    // `d` is the original data object for the row
    return '<table cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<td>Full name:</td>'+
            '<td></td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extension number:</td>'+
            '<td></td>'+
        '</tr>'+
        '<tr>'+
            '<td>Extra info:</td>'+
            '<td>And any further details here (images etc)...</td>'+
        '</tr>'+
    '</table>';
}
