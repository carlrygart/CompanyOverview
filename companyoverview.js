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
            { "data": "dislikes" }
        ]
    });

});