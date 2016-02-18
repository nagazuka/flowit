//Load the request module
var request = require('request');
var prettyjson = require('prettyjson');

var crucial = function(page) {
	var FILTER = ['id',,'title','permalink'];
	var obj = {};
	FILTER.forEach(function (el) {
		obj[el] = page.data[el];	
	});
	return obj;
};

request('https://reddit.com/r/soccer/.json', function (error, response, body) {
    //Check for error
    if(error){
        return console.log('Error:', error);
    }

    //Check for right status code
    if(response.statusCode !== 200){
        return console.log('Invalid Status Code Returned:', response.statusCode);
    }

    //All is good. Print the body
    //console.log(body); 
	
	var obj = JSON.parse(body);
	
	//console.log(obj);
	//console.log(prettyjson.render(obj));

	var filtered = obj.data.children.map(crucial);
	console.log(prettyjson.render(filtered));
});