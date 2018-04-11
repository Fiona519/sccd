sap.ui.define([
	"sap/support/sccd/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel){
	
	"use strict";

	return BaseController.extend("sap.support.sccd.controller.Master", {

		onInit: function(){
		},

		onSelectionChange: function(oEvent){
			var sSelection = oEvent.getSource().getSelectedItem().getTitle();
			if(sSelection === "Unit Test"){
				this.getOwnerComponent().getRouter().navTo("ut");
			}else if (sSelection === "Integration Test"){
				this.getOwnerComponent().getRouter().navTo("int");
			}else if (sSelection === "Maintenance"){
				this.getOwnerComponent().getRouter().navTo("maint");
			}else {
				this.getOwnerComponent().getRouter().navTo("home");		
			}
		},

		onSearch: function(){
			var sTest = this.byId("searchField");
		}
	});
});