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

	return BaseController.extend("sap.support.sccd.controller.Home", {

		_constants: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "homeVizFrame",
				dataset: {
					dimensions: [{
						name: "Project",
						value: "{projectName}"
					},{
						name: "Team",
						value: "{teamName}"
					}],
					measures: [{
						group: 1,
						name: 'Unit Test Assertion',
						value: '{UTAssertion}'
					},{
						group: 1,
						name: 'Integration Test Assertion',
						value: '{ITAssertion}'
					}],
					data: {
						path: "/homeData"
					}
				},
				type: "stacked_bar",
				properties: {
					plotArea: {
						colorPalette: [
							"sapUiChartPaletteSemanticGoodLight1",
							"#b6d957"
						],
                        dataLabel: {
                            visible: true,
                            showTotal: false
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
					'values': ["Integration Test Assertion", "Unit Test Assertion"]
				},{
					'uid': "axisLabels",
					'type': "Dimension",
					'values': ["Team", "Project"]
				}]
			}
		},

		_constants_goodCover: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "homeGoodVizFrame",
				dataset: {
					dimensions: [{
						name: "Project",
						value: "{projectName}"
					},{
						name: "Team",
						value: "{teamName}"
					}],
					measures: [{
						name: 'Code Line',
						value: '{includedLine}'
					},{
						name: 'Coverage',
						value: '{includedCoverLine}'
					}],
					data: {
						path: "/utData"
					}
				},
				type: "bullet", //"vertical_bullet",
				properties: {
					plotArea: {
						actualColor: ["#b6d957"],
						forecastColor: ["sapUiChartPaletteSequentialNeutralLight3"],
						defaultOthersStyle: {color: "sapUiChartPaletteSequentialHue1Light1"},
                        dataLabel: {
                            visible: true,
                            showTotal: true
                        },
                        window: {
                        	start: "firstDataPoint",
                        	end: "lastDataPoint"
                        },
                        gap: {negativeColor: "#e34352", positiveColor: "#87c27e", type: "both", visible: false}
					},
					target: {shadowColor: "#ffffff", valueColor: "sapUiChartPaletteSequentialNeutralLight3"},
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
						},
						label: {
							visible: true
						}
					},
					valueAxis: {
						title: {
							visible: false
						}
					}
				},
				feedItems: [{
					'uid': "actualValues",
					'type': "Measure",
					'values': ["Code Line"]
				},{
					'uid': "targetValues",
					'type': "Measure",
					'values': ["Coverage"]
				},{
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Team", "Project"]
				}]
			}
		},

		_constants_Cover: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "homeBadVizFrame",
				dataset: {
					dimensions: [{
						name: "Project",
						value: "{projectName}"
					},{
						name: "Team",
						value: "{teamName}"
					}],
					measures: [{
						name: 'Code Line - Included',
						value: '{includedLine}'
					},{
						name: 'Coverage - All',
						value: '{allCover}'
					},{
						name: 'Code Line - Not Included',
						value: '{notIncludedLine}'
					},{
						name: 'Coverage - Included',
						value: '{includedCover}'
					}],
					data: {
						path: "/utData"
					}
				},
				type: "dual_stacked_combination",
				properties: {
					plotArea: {
						primaryValuesColorPalette: ["sapUiChartPaletteSequentialHue1", "#b6d957"],
						secondaryValuesColorPalette: ["sapUiChartPaletteSemanticGoodLight1", "sapUiChartPaletteQualitativeHue2"],
                        dataLabel: {
                            visible: true,
                            showTotal: true
                        },
                        window: {
                        	start: "firstDataPoint",
                        	end: "lastDataPoint"
                        },
                        dataShape:{
							primaryAxis: ["bar","bar"],
							secondaryAxis: ["line", "line"]
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
					'values': ["Code Line - Not Included", "Code Line - Included"]
				},{
					'uid': "valueAxis2",
					'type': "Measure",
					'values': ["Coverage - Included", "Coverage - All"]
				},{
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Team", "Project"]
				}]
			}
		},

		_constants_allCover: {
			packageName: "sap.support.sccd.model",
			vizFrame: {
				id: "homeAllCoverVizFrame",
				dataset: {
					dimensions: [{
						name: "Project",
						value: "{projectName}"
					},{
						name: "Team",
						value: "{teamName}"
					}],
					measures: [{
						name: 'Code Line - Not Covered',
						value: '{notIncludedCoverLine}'
					},{
						name: 'Code Line - Covered',
						value: '{includedCoverLine}'
					},{
						name: 'Coverage',
						value: '{includedCover}'
					}],
					data: {
						path: "/utData"
					}
				},
				type: "dual_stacked_combination",
				properties: {
					plotArea: {
						primaryValuesColorPalette: [
							"sapUiChartPaletteQualitativeHue2",
							"#b6d957"
						],
						secondaryValuesColorPalette: ["sapUiChartPaletteSemanticGoodLight1"],
                        dataLabel: {
                            visible: true,
                            showTotal: true
                        },
                        dataShape:{
                        	primaryAxis: ["bar", "bar"],
							secondaryAxis: ["line"]
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
					'values': ["Code Line - Not Covered", "Code Line - Covered"]
				},{
					'uid': "valueAxis2",
					'type': "Measure",
					'values': ["Coverage"]
				},{
					'uid': "categoryAxis",
					'type': "Dimension",
					'values': ["Team", "Project"]
				}]
			}
		},

		onInit: function() {
			this.oVizFrame1 = this.getView().byId(this._constants.vizFrame.id);
			this.oVizFrame2 = this.getView().byId(this._constants_goodCover.vizFrame.id);
			this.oVizFrame3 = this.getView().byId(this._constants_Cover.vizFrame.id);
			this.oVizFrame4 = this.getView().byId(this._constants_allCover.vizFrame.id);
			this.getHeaderData();
			this.getProjectData1("/HomeSet", "homeData");
			this.getProjectData2("/UTSet", "utData");

			var oPopOver1 = this.getView().byId("homePopOver");
			var oPopOver2 = this.getView().byId("homeGoodPopOver");
			var oPopOver3 = this.getView().byId("homeBadPopOver");
			var oPopOver4 = this.getView().byId("homeAllPopOver");

			var that = this;
			oPopOver1.setActionItems([{
				type: "action",
				text: "Show Detail",
				press: function(oEvent) {
					var aHomeVizFrameData = that.oVizFrame1.vizSelection()[0].data;
					var sPname = aHomeVizFrameData.Project;
					var sUT = aHomeVizFrameData["Unit Test Assertion"];
					var sIT = aHomeVizFrameData["Integration Test Assertion"];
					var aHomeData = that.oVizFrame1.getModel().getData().homeData;
					var sPid;
					if(aHomeData){
						aHomeData.forEach(function(item){
							if(item.projectName === sPname){
								sPid = item.projectId;
								if(sUT){
									that.getOwnerComponent().getRouter().navTo("utProjectDetail", {projectid : sPid});
								}else if(sIT){
									that.getOwnerComponent().getRouter().navTo("itProjectDetail", {projectid : sPid});
								}
							}
						});
					}
                }
			}]);
			oPopOver1.connect(this.oVizFrame1.getVizUid());
			/*
			oPopOver2.setCustomDataControl(function(oEvent){
				var aValue = oEvent.data.val;
				var sTeam = aValue[0].value;
				var sProject = aValue[1].value;
				var iCodeLine = aValue[2].value;
				var iCoverageLine = aValue[3].value;
				var sCoverage = (iCoverageLine/iCodeLine * 100).toFixed(0) + "%";
				return new sap.ui.core.HTML({content:"<div class='sccd-customPopover'><div class='customPopover-header'><span>"+ sTeam +" - "+ sProject +"</span></div><div class='customPopover-body'><div class='customPopover-body-codeline'><div class='float-left'><label>Code Line</label></div><div class='text-align'><span>"+ iCodeLine +"</span></div></div><div class='customPopover-body-coverage'><div class='float-left'><label>Coverage</label></div><div class='text-align'><span>"+ sCoverage +"</span></div></div></div></div>"});
			});
			oPopOver2.connect(this.oVizFrame2.getVizUid());
			oPopOver3.connect(this.oVizFrame3.getVizUid());*/
			oPopOver4.connect(this.oVizFrame4.getVizUid());
		},

		onContentChange: function(oEvent){
			var sSelectedId = oEvent.getParameters().selectedItemId;
			if(sSelectedId.match("homeGoodVizFrame") || sSelectedId.match("homeBadVizFrame") || sSelectedId.match("homeAllCoverVizFrame")){
				this.byId("vizTypeSelect").setVisible(false);
			} else {
				this.byId("vizTypeSelect").setVisible(true);
			}
		},

		onVizTypeChange: function(oEvent){
			var sVizSelectType = oEvent.getSource().getSelectedItem().getKey();
			this.oVizFrame1.setVizType(sVizSelectType);
			if(sVizSelectType === "100_stacked_bar"){
                this.oVizFrame1.setVizProperties({
                    plotArea: {
                        mode: "percentage",
                        dataLabel: {
                            type: "percentage"
                        }
                    }
                });
			}
		},

		getHeaderData: function(){
			this.getModel().read("/KpiSet", {
				success: function(oData, oResponse){
					var oData = JSON.parse(oData);
					var sTotalProject = oData.totalProjects;
					var oTop3Active = oData.topActive;
					var oHealthyUT = oData.UTStatus;
					var oHealthyIT = oData.ITStatus;

					this.getModel("projectModel").setData({totalProject: sTotalProject});
					this.getModel("topActive").setData(oTop3Active);
					this.getModel("healthyUT").setData(oHealthyUT);
					this.getModel("healthyIT").setData(oHealthyIT);
				}.bind(this),
				error: function(oError){
					console.log(oError);
				}
			});
		},

		_updateVizFrame1: function(vizFrame, oData, sData) {
			var oVizFrame = this._constants.vizFrame;
			var oResult = {};
			oResult[sData] = oData;
			var oModel = new JSONModel(oResult);
			vizFrame.setModel(oModel);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},

		_updateVizFrame2: function(vizFrame, oData, sData) {
			var oVizFrame = this._constants_goodCover.vizFrame;
			var oResult = {};
			oResult[sData] = oData;
			var oModel = new JSONModel(oResult);
			vizFrame.setModel(oModel);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},

		_updateVizFrame3: function(vizFrame, oData, sData) {
			var oVizFrame = this._constants_Cover.vizFrame;
			var oResult = {};
			oResult[sData] = oData;
			var oModel = new JSONModel(oResult);
			vizFrame.setModel(oModel);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},

		_updateVizFrame4: function(vizFrame, oData, sData) {
			var oVizFrame = this._constants_allCover.vizFrame;
			var oResult = {};
			oResult[sData] = oData;
			var oModel = new JSONModel(oResult);
			vizFrame.setModel(oModel);
			var oDataset = new FlattenedDataset(oVizFrame.dataset);
			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},

		getProjectData1: function(sPath, sData){
			var that = this;
			var sData = sData;
			this.getModel().read(sPath, {
				success: function(oData, oResponse){
					that._updateVizFrame1(that.oVizFrame1, JSON.parse(oData), sData);
				},
				error: function(oError){
					console.log(oError);
				}
			});
		},

		getProjectData2: function(sPath, sData){
			var that = this;
			var sData = sData;
			this.getModel().read(sPath, {
				success: function(oData, oResponse){
					//that._updateVizFrame2(that.oVizFrame2, JSON.parse(oData), sData);
					//that._updateVizFrame3(that.oVizFrame3, JSON.parse(oData), sData);
					that._updateVizFrame4(that.oVizFrame4, JSON.parse(oData), sData);
				},
				error: function(oError){
					console.log(oError);
				}
			});
		}
	});
});