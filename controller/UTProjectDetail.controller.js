sap.ui.define([
	"sap/support/sccd/controller/BaseController",
	"sap/support/sccd/util/Formatter",
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
], function(BaseController, Formatter, JSONModel, ChartFormatter, FlattenedDataset, FeedItem, Label, ColumnListItem, Column, MobileLibrary, Sorter, History){
	
	"use strict";

	return BaseController.extend("sap.support.sccd.controller.UTProjectDetail", {
		Formatter: Formatter,

		_constants: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "utDetailVizFrame",
				modulePath: "/utprojectdetail.json",
				dataset: {
					dimensions: [{
						name: 'Date',
						value: "{= ${timestamp}.substring(0, 4) + '-' + ${timestamp}.substring(4, 6) + '-' + ${timestamp}.substring(6, 8)}"
					}],
					measures: [{
						name: 'Passed',
						value: '{passed}'
					},{
						name: 'Failed',
						value: '{failed}'
					},{
						name: 'Coverage',
						value: '{includedCover}'
					},{
						name: 'Coverage - All',
						value: '{allCover}'
					},{
						name: 'Assertion',
						value: '{assertion}'
					}],
					data: {
						path: "/utDetailData",
						sorter: new Sorter("timestamp", false)
					}
				},
				type: "dual_stacked_combination",
				properties: {
					plotArea: {
						primaryValuesColorPalette: [
							"#5cbae6",
							"#bb0000",
							"#b6d957"
						],
						secondaryValuesColorPalette: ["sapUiChartPaletteSemanticGoodLight1", "sapUiChartPaletteQualitativeHue2"],
                        dataLabel: {
                            visible: true,
                            showTotal: true
                        },
                        dataShape:{
                        	primaryAxis: ["line", "bar", "bar"],
							secondaryAxis: ["line", "line"]
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
					},
					valueAxis2: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "valueAxis",
					'type': "Measure",
					'values': ["Assertion", "Failed", "Passed"]
				},{
					'uid': "valueAxis2",
					'type': "Measure",
					'values': ["Coverage"]					
				},{
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Date"]
				}]
			}
		},


		onInit: function() {
			this.oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			this._updateVizFrame(this.byId("utDetailVizFrame"), []);
			this.getOwnerComponent().getRouter().getRoute("utProjectDetail").attachPatternMatched(this._onProjectMatched, this);
			
			var oPopOver = this.getView().byId("utDetailPopOver");
			oPopOver.connect(this.oVizFrame.getVizUid());
		},
		
		_onProjectMatched: function(oEvent){
			var sArg = oEvent.getParameter("arguments");

			this.getModel().read("/UTSet", {
				urlParameters: {
					pid: sArg.projectid
				},
				success: function(oData, oResponse){
					var oVizModel = this.byId("utDetailVizFrame").getModel();
					oVizModel.setData({"utDetailData": JSON.parse(oData)});
					var aBindData = oVizModel.getData().utDetailData;
					var that = this;
					if(aBindData){
						aBindData.forEach(function(item){
							if(item.projectId === sArg.projectid){
								that.byId("sProjectName").setText("Unit Test History of " +item.projectName);
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
				this.getOwnerComponent().getRouter().navTo("ut");
			}
		}
	});
});