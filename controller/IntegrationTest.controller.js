sap.ui.define([
	"sap/support/sccd/controller/BaseController",
    "sap/viz/ui5/format/ChartFormatter",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/m/Label",
	"sap/m/ColumnListItem", 
	"sap/m/Column",
	"sap/m/library"
], function(BaseController, ChartFormatter, JSONModel, FlattenedDataset, FeedItem, Label, ColumnListItem, Column, MobileLibrary){

	"use strict";

	return BaseController.extend("sap.support.sccd.controller.IntegrationTest", {
		_constants: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "itVizFrame",
				modulePath: "/integrationtest.json",
				dataset: {
					dimensions: [{
						name: 'Project',
						value: "{projectName}"
					},{
						name: "Team",
						value: "{teamName}"
					}],
					measures: [{
						group: 1,
						name: 'Failed',
						value: '{failed}'
					},{
						group: 1,
						name: 'Passed',
						value: '{passed}'
					}],
					data: {
						path: "/itData"
					}
				},
				type: "stacked_bar",
				properties: {
					plotArea: {
						colorPalette: [
							"sapUiChartPaletteQualitativeHue2",
							"sapUiChartPaletteSemanticGoodLight1"
						],
                        dataLabel: {
                            visible: true,
                            showTotal: true
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
					'uid': "primaryValues",
					'type': "Measure",
					'values': ["Failed", "Passed"]
				},{
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Team", "Project"]
				}]
			},
			table: {
				id: "itTable",
				modulePath: "/integrationtest.json",
				itemBindingPath: "/itData",
				columnLabelTexts: ["Project", "Passed", "Failed", "Skipped", "Assertion"],
				templateCellLabelTexts: ["{projectName}", "{passed}", "{failed}", "{skipped}", "{assertion}"],
			}
		},

		onInit: function() {
			this.oVizFrame = this.getView().byId(this._constants.vizFrame.id);
			this.oTable = this.getView().byId(this._constants.table.id);
			this.getProjectData("/ITSet", "itData");
			//this._updateTable(oTable);

			var formatPattern = ChartFormatter.DefaultPattern;
			var oPopOver = this.getView().byId("itPopOver");
			var that = this;
			oPopOver.setActionItems([{
				type: "action",
				text: "Show Integration Test History",
				press: function() {
					var sPname = that.oVizFrame.vizSelection()[0].data.Project;
					var aBindData = that.oVizFrame.getModel().getData().itData;

					aBindData.forEach(function(item){
						if (item.projectName === sPname) {
							that.getOwnerComponent().getRouter().navTo("itProjectDetail", {projectid : item.projectId});
							return false;
						}
					});
                }
			}]);
			oPopOver.connect(this.oVizFrame.getVizUid());
		},
		
		_listItemPress: function(oEvent){
			var obj = oEvent.getSource().getBindingContext().getObject();
			this.getOwnerComponent().getRouter().navTo("itProjectDetail", {projectid : obj.projectId});
		}
	});
});