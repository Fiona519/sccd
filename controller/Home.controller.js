sap.ui.define(["sap/support/sccd/controller/BaseController","sap/viz/ui5/format/ChartFormatter","sap/ui/model/json/JSONModel","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/controls/common/feeds/FeedItem","sap/m/Label","sap/m/ColumnListItem","sap/m/Column","sap/m/library"],function(e,t,l,n,a,i,s,o,r){"use strict";return e.extend("sap.support.sccd.controller.Home",{_constants:{packageName:"sap.support.sccd.model",vizFrame:{id:"homeVizFrame",dataset:{dimensions:[{name:"Project",value:"{projectName}"},{name:"Team",value:"{teamName}"}],measures:[{group:1,name:"Unit Test Assertion",value:"{UTAssertion}"},{group:1,name:"Integration Test Assertion",value:"{ITAssertion}"}],data:{path:"/homeData"}},type:"stacked_bar",properties:{plotArea:{colorPalette:["sapUiChartPaletteSemanticGoodLight1","#b6d957"],dataLabel:{visible:!0,showTotal:!1},window:{start:"firstDataPoint",end:"lastDataPoint"}},title:{visible:!1},interaction:{selectability:{mode:"single"}},categoryAxis:{title:{visible:!1}},valueAxis:{title:{visible:!1}}},feedItems:[{uid:"primaryValues",type:"Measure",values:["Integration Test Assertion","Unit Test Assertion"]},{uid:"axisLabels",type:"Dimension",values:["Team","Project"]}]}},_constants_goodCover:{packageName:"sap.support.sccd.model",vizFrame:{id:"homeGoodVizFrame",dataset:{dimensions:[{name:"Project",value:"{projectName}"},{name:"Team",value:"{teamName}"}],measures:[{name:"Code Line",value:"{includedLine}"},{name:"Coverage",value:"{includedCoverLine}"}],data:{path:"/utData"}},type:"bullet",properties:{plotArea:{actualColor:["#b6d957"],forecastColor:["sapUiChartPaletteSequentialNeutralLight3"],defaultOthersStyle:{color:"sapUiChartPaletteSequentialHue1Light1"},dataLabel:{visible:!0,showTotal:!0},window:{start:"firstDataPoint",end:"lastDataPoint"},gap:{negativeColor:"#e34352",positiveColor:"#87c27e",type:"both",visible:!1}},target:{shadowColor:"#ffffff",valueColor:"sapUiChartPaletteSequentialNeutralLight3"},title:{visible:!1},interaction:{selectability:{mode:"single"}},categoryAxis:{title:{visible:!1},label:{visible:!0}},valueAxis:{title:{visible:!1}}},feedItems:[{uid:"actualValues",type:"Measure",values:["Code Line"]},{uid:"targetValues",type:"Measure",values:["Coverage"]},{uid:"categoryAxis",type:"Dimension",values:["Team","Project"]}]}},_constants_Cover:{packageName:"sap.support.sccd.model",vizFrame:{id:"homeBadVizFrame",dataset:{dimensions:[{name:"Project",value:"{projectName}"},{name:"Team",value:"{teamName}"}],measures:[{name:"Code Line - Included",value:"{includedLine}"},{name:"Coverage - All",value:"{allCover}"},{name:"Code Line - Not Included",value:"{notIncludedLine}"},{name:"Coverage - Included",value:"{includedCover}"}],data:{path:"/utData"}},type:"dual_stacked_combination",properties:{plotArea:{primaryValuesColorPalette:["sapUiChartPaletteSequentialHue1","#b6d957"],secondaryValuesColorPalette:["sapUiChartPaletteSemanticGoodLight1","sapUiChartPaletteQualitativeHue2"],dataLabel:{visible:!0,showTotal:!0},window:{start:"firstDataPoint",end:"lastDataPoint"},dataShape:{primaryAxis:["bar","bar"],secondaryAxis:["line","line"]}},title:{visible:!1},interaction:{selectability:{mode:"single"}},categoryAxis:{title:{visible:!1}},valueAxis:{title:{visible:!1}},valueAxis2:{title:{visible:!1}}},feedItems:[{uid:"valueAxis",type:"Measure",values:["Code Line - Not Included","Code Line - Included"]},{uid:"valueAxis2",type:"Measure",values:["Coverage - Included","Coverage - All"]},{uid:"categoryAxis",type:"Dimension",values:["Team","Project"]}]}},_constants_allCover:{packageName:"sap.support.sccd.model",vizFrame:{id:"homeAllCoverVizFrame",dataset:{dimensions:[{name:"Project",value:"{projectName}"},{name:"Team",value:"{teamName}"}],measures:[{name:"Code Line - Not Covered",value:"{notIncludedCoverLine}"},{name:"Code Line - Covered",value:"{includedCoverLine}"},{name:"Coverage",value:"{includedCover}"}],data:{path:"/utData"}},type:"dual_stacked_combination",properties:{plotArea:{primaryValuesColorPalette:["sapUiChartPaletteQualitativeHue2","#b6d957"],secondaryValuesColorPalette:["sapUiChartPaletteSemanticGoodLight1"],dataLabel:{visible:!0,showTotal:!0},dataShape:{primaryAxis:["bar","bar"],secondaryAxis:["line"]},window:{start:"firstDataPoint",end:"lastDataPoint"}},title:{visible:!1},interaction:{selectability:{mode:"single"}},categoryAxis:{title:{visible:!1}},valueAxis:{title:{visible:!1}},valueAxis2:{title:{visible:!1}}},feedItems:[{uid:"valueAxis",type:"Measure",values:["Code Line - Not Covered","Code Line - Covered"]},{uid:"valueAxis2",type:"Measure",values:["Coverage"]},{uid:"categoryAxis",type:"Dimension",values:["Team","Project"]}]}},onInit:function(){this.oVizFrame1=this.getView().byId(this._constants.vizFrame.id),this.oVizFrame2=this.getView().byId(this._constants_goodCover.vizFrame.id),this.oVizFrame3=this.getView().byId(this._constants_Cover.vizFrame.id),this.oVizFrame4=this.getView().byId(this._constants_allCover.vizFrame.id),this.getHeaderData(),this.getProjectData1("/HomeSet","homeData"),this.getProjectData2("/UTSet","utData");var e=this.getView().byId("homePopOver"),t=this.getView().byId("homeGoodPopOver"),a=this.getView().byId("homeBadPopOver"),i=this.getView().byId("homeAllPopOver"),l=this;e.setActionItems([{type:"action",text:"Show Detail",press:function(e){var t,a=l.oVizFrame1.vizSelection()[0].data,i=a.Project,s=a["Unit Test Assertion"],o=a["Integration Test Assertion"],r=l.oVizFrame1.getModel().getData().homeData;r&&r.forEach(function(e){e.projectName===i&&(t=e.projectId,s?l.getOwnerComponent().getRouter().navTo("utProjectDetail",{projectid:t}):o&&l.getOwnerComponent().getRouter().navTo("itProjectDetail",{projectid:t}))})}}]),e.connect(this.oVizFrame1.getVizUid()),t.setCustomDataControl(function(e){var t=e.data.val,a=t[0].value,i=t[1].value,s=t[2].value,o=(t[3].value/s*100).toFixed(0)+"%";return new sap.ui.core.HTML({content:"<div class='sccd-customPopover'><div class='customPopover-header'><span>"+a+" - "+i+"</span></div><div class='customPopover-body'><div class='customPopover-body-codeline'><div class='float-left'><label>Code Line</label></div><div class='text-align'><span>"+s+"</span></div></div><div class='customPopover-body-coverage'><div class='float-left'><label>Coverage</label></div><div class='text-align'><span>"+o+"</span></div></div></div></div>"})}),t.connect(this.oVizFrame2.getVizUid()),a.connect(this.oVizFrame3.getVizUid()),i.connect(this.oVizFrame4.getVizUid())},onContentChange:function(e){var t=e.getParameters().selectedItemId;t.match("homeGoodVizFrame")||t.match("homeBadVizFrame")||t.match("homeAllCoverVizFrame")?this.byId("vizTypeSelect").setVisible(!1):this.byId("vizTypeSelect").setVisible(!0)},onVizTypeChange:function(e){var t=e.getSource().getSelectedItem().getKey();this.oVizFrame1.setVizType(t),"100_stacked_bar"===t&&this.oVizFrame1.setVizProperties({plotArea:{mode:"percentage",dataLabel:{type:"percentage"}}})},getHeaderData:function(){this.getModel().read("/KpiSet",{success:function(e,t){var a=(e=JSON.parse(e)).totalProjects,i=e.topActive,s=e.UTStatus,o=e.ITStatus;this.getModel("projectModel").setData({totalProject:a}),this.getModel("topActive").setData(i),this.getModel("healthyUT").setData(s),this.getModel("healthyIT").setData(o)}.bind(this),error:function(e){console.log(e)}})},_updateVizFrame1:function(e,t,a){var i=this._constants.vizFrame,s={};s[a]=t;var o=new l(s);e.setModel(o);var r=new n(i.dataset);e.setVizProperties(i.properties),e.setDataset(r),this._addFeedItems(e,i.feedItems),e.setVizType(i.type)},_updateVizFrame2:function(e,t,a){var i=this._constants_goodCover.vizFrame,s={};s[a]=t;var o=new l(s);e.setModel(o);var r=new n(i.dataset);e.setVizProperties(i.properties),e.setDataset(r),this._addFeedItems(e,i.feedItems),e.setVizType(i.type)},_updateVizFrame3:function(e,t,a){var i=this._constants_Cover.vizFrame,s={};s[a]=t;var o=new l(s);e.setModel(o);var r=new n(i.dataset);e.setVizProperties(i.properties),e.setDataset(r),this._addFeedItems(e,i.feedItems),e.setVizType(i.type)},_updateVizFrame4:function(e,t,a){var i=this._constants_allCover.vizFrame,s={};s[a]=t;var o=new l(s);e.setModel(o);var r=new n(i.dataset);e.setVizProperties(i.properties),e.setDataset(r),this._addFeedItems(e,i.feedItems),e.setVizType(i.type)},getProjectData1:function(e,a){var i=this;a=a;this.getModel().read(e,{success:function(e,t){i._updateVizFrame1(i.oVizFrame1,JSON.parse(e),a)},error:function(e){console.log(e)}})},getProjectData2:function(e,a){var i=this;a=a;this.getModel().read(e,{success:function(e,t){i._updateVizFrame2(i.oVizFrame2,JSON.parse(e),a),i._updateVizFrame3(i.oVizFrame3,JSON.parse(e),a),i._updateVizFrame4(i.oVizFrame4,JSON.parse(e),a)},error:function(e){console.log(e)}})}})});