sap.ui.define([
	"sap/support/sccd/controller/BaseController",
	"sap/ui/model/json/JSONModel",	
    "sap/viz/ui5/format/ChartFormatter",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/m/Label",
	"sap/m/ColumnListItem", 
	"sap/m/Column",
	"sap/m/library",
	"sap/ui/model/Sorter",
	"sap/ui/core/routing/History"
], function(BaseController, JSONModel, ChartFormatter, FlattenedDataset, FeedItem, Label, ColumnListItem, Column, MobileLibrary, Sorter, History){
	
	"use strict";

	return BaseController.extend("sap.support.sccd.controller.ITProjectDetail", {

		_constants: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "itDetailVizFrame",
				modulePath: "/itprojectdetail.json",
				dataset: {
					dimensions: [{
						name: 'Date',
						value: "{= ${timestamp}.substring(0, 4) + '-' + ${timestamp}.substring(4, 6) + '-' + ${timestamp}.substring(6, 8)}"
					}],
					measures: [{
						name: 'All Test Cases',
						value: '{allTestCases}'
					},{
						name: 'Assertion',
						value: '{assertion}'
					}],
					data: {
						path: "/itDetailData",
						sorter: new Sorter("timestamp", false)
					}
				},
				type: "stacked_combination",
				properties: {
					plotArea: {
						colorPalette: [
							"#828af7",
							"sapUiChartPaletteSemanticGoodLight1"
						],
                        dataLabel: {
                            visible: true,
                            showTotal: true
                        },
                        dataShape:{
                        	primaryAxis: ["line", "bar"]
                        },
                        window: {
                        	start: "firstDataPoint",
                        	end: "lastDataPoint"
                        }
					},
					title: {
						visible: false
					},
					interaction: {
						selectability: {
							mode: "single"
						}
					},
					categoryAxis: {
						title: {
							visible: false
						}
					},
					valueAxis: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Assertion", "All Test Cases"]
				},{
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Date"]
				}]
			}
		},

		onInit: function() {
			var oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			this._updateVizFrame(this.byId("itDetailVizFrame"), []);
			this.getOwnerComponent().getRouter().getRoute("itProjectDetail").attachPatternMatched(this._onProjectMatched, this);
			//this._updateVizFrame(oVizFrame);

			var oPopOver = this.getView().byId("itDetailPopOver");
			oPopOver.connect(oVizFrame.getVizUid());
		},
		
		_onProjectMatched: function(oEvent){
			var sArg = oEvent.getParameter("arguments");

			this.getModel().read("/ITSet", {
				urlParameters: {
					pid: sArg.projectid
				},
				success: function(oData, oResponse){
					var oVizModel = this.byId("itDetailVizFrame").getModel();
					oVizModel.setData({"itDetailData": JSON.parse(oData)});
					var aBindData = oVizModel.getData().itDetailData;
					var that = this;
					if(aBindData){
						aBindData.forEach(function(item){
							if(item.projectId === sArg.projectid){
								that.byId("sITProjectName").setText("Integration Test History of " + item.projectName);
								return false;
							}
						});
					}
				}.bind(this),
				error: function(oError){
					console.log(oError);
				}
			});
		},

		onBackPress: function(){
			if(History.getInstance().getPreviousHash() !== undefined){
				window.history.go(-1);
			}else{
				this.getOwnerComponent().getRouter().navTo("it");
			}
		}
	});
});