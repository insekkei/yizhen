var BASEURL = 'http://115.29.143.102:8080/YizhenServer';
function YZAPI_GETURL(url) {
	var uid = '18';
	var token = '9c6286f6155ba81948f0379ad3bb1257';
	return BASEURL + url + "&uid=" + uid + "&token=" + token + "&client=web";
}

function YZAPI_GETWeb(url) {
	var uid = '18';
	var token = '9c6286f6155ba81948f0379ad3bb1257';
	return BASEURL + url + "&uid=" + uid + "&token=" + token;
}
