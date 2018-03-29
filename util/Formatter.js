 sap.ui.define([
], function() {
	"use strict";

	return {

		//"timestamp": "20180103121627"
		timeStampFormat: function(timestamp){
			if(timestamp){
				return timestamp.substring(0, 4) + '-' + timestamp.substring(4, 6) + '-' + timestamp.substring(6, 8);
			}
		}
	};
});