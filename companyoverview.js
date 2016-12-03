$(document).ready(function(){

    $('#example').DataTable( {
        ajax: {
        	url: 'http://192.168.8.101:8888/employer-stats/1',
        	data: "",
        	dataSrc: 'jobs'
    	},
    	paging: false,
        columns: [
            { "data": "id" },
            { "data": "title" },
            { "data": "like" },
            { "data": "dislikes" },
            { "data": "like"},

        ],  
        columnDefs: [ {
            targets: 4,
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
});