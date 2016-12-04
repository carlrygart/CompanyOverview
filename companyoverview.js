$(document).ready(function(){

    var json_blob = null;

    var table = $('#example').DataTable( {
                ajax: {
                 url: 'http://192.168.8.101:8888/employer-stats/2',
                 data: "",
                 dataSrc: function ( json ) {
                        json_blob = json;

                        var dataTablesJson = [];

                        json['jobs'].forEach(function(currentValue, index, arr) {
                            var jsonObj = []

                            var platsannons = currentValue['platsannons'];
                            jsonObj['likes'] = platsannons['likes'];
                            jsonObj['dislikes'] = platsannons['dislikes'];
                            jsonObj['total'] = jsonObj['likes']-jsonObj['dislikes'];

                            var annons = platsannons['annons'];
                            jsonObj['annonsid'] = annons['annonsid'];
                            jsonObj['annonsrubrik'] = annons['annonsrubrik'];

                            jsonObj['jobseekers'] = currentValue['jobseekers'];
                            dataTablesJson.push(jsonObj);
                        });
                        // Things to do outside table..
                        var title = json['jobs'][0]['platsannons']['arbetsplats']['arbetsplatsnamn'];
                        if (title.length > 20) {
                            title = title.substring(0,20) + "...";
                        }
                        $('#maintitle').html(title);
                        $('#upvotes').html(json['overview']['likes']);
                        $('#downvotes').html(json['overview']['dislikes']);

                        return dataTablesJson;
                    }
             },
             paging: false,
                columns: [
                    {
                        "className":      'details-control',
                        "orderable":      false,
                        "data":           null,
                        "defaultContent": ''
                    },
                    { "data": "annonsid" },
                    { "data": "annonsrubrik" },
                    { "data": "likes" },
                    { "data": "dislikes" },
                    { "data": "total"},
                ],  
                columnDefs: [ {
                    targets: 5,
                    createdCell: function (td, cellData, rowData, row, col) {
                        if (cellData > 0) {
                            $(td).css('color', 'green');
                        } else {
                            $(td).css('color', 'red');   
                        }
                    }
                }]
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

    var popOverSettings = {
    placement: 'auto',
    container: 'body',
    trigger: 'hover',
    html: true,
    selector: '#hej', //Sepcify the selector here
    content: function () {
        return $('#popover-content').html();
        }
    }

    $('body').popover(popOverSettings);

    $('body').on()

});

function format ( d ) {
    // `d` is the original data object for the row
    var html = '<div class="col-xs-3"><table class="table" cellpadding="5" cellspacing="0" border="0" style="padding-left:50px;">'+
        '<tr>'+
            '<th>Users</th>' +
            '<th>Tags</th>' +
        '</tr>';

    console.log(d);
    d['jobseekers'].forEach(function(currentValue, index, arr) {
        var popoverText = "No tags";
        if (currentValue['tags'] != null) {
            popoverText = '<table>';
            currentValue['tags'].forEach(function(val) {
                popoverText += '<tr><td>'+val['name']+'</td><td>'+val['counter']+'</td></tr>';
            });
            popoverText += '</table>';
        }
        html += '<tr>'+
        '<td>'+ currentValue['name'] +'</td>'+
            '<td><a id="hej" href="#" data-toggle="popover" title="Tags" data-content="'+popoverText+'">View tags</a></td>'+
        '</tr>'
    });

    html += '</table></div>';
    return html;
}
