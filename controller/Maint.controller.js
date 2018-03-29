sap.ui.define(["sap/support/sccd/controller/BaseController","sap/viz/ui5/format/ChartFormatter","sap/ui/model/json/JSONModel","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/controls/common/feeds/FeedItem","sap/m/Label","sap/m/ColumnListItem","sap/m/Column","sap/m/library","sap/ui/base/Event","sap/ui/core/Item"],function(e,t,d,i,s,a,n,r,o,l,m){"use strict";return e.extend("sap.support.sccd.controller.Maint",{_constants:{packageName:"sap.support.sccd.model",vizFrame:{id:"maintVizFrame",modulePath:"/maint-test.json",dataset:{dimensions:[{name:"Quater",value:"{quater}"}],measures:[{name:"Customer Incident",value:"{customerTicket}"},{name:"IT Direct",value:"{itTicket}"}],data:{path:"/maintData"}},type:"line",properties:{plotArea:{colorPalette:["#b6d957","sapUiChartPaletteSequentialHue1"],dataLabel:{visible:!0,showTotal:!0},window:{start:"firstDataPoint",end:"lastDataPoint"}},title:{visible:!1},interaction:{selectability:{mode:"single"}},categoryAxis:{title:{visible:!1}},valueAxis:{title:{visible:!1}}},feedItems:[{uid:"primaryValues",type:"Measure",values:["Customer Incident","IT Direct"]},{uid:"axisLabels",type:"Dimension",values:["Quater"]}]}},onInit:function(){this.oVizFrame=this.getView().byId(this._constants.vizFrame.id),this._updateVizFrame(this.oVizFrame),this.getModel().read("/TeamSet",{success:function(e,t){var a=JSON.parse(e);a.unshift({tid:"all",name:"All Projects"}),this.getModel("team").setData(a),this.onTeamSelect(new l(null,this.byId("teamMaintSelect").setSelectedItem(new m({key:"all",text:"All Projects"})))),this.byId("teamMaintSelect").setSelectedKey("all")}.bind(this)}),this.getView().byId("miantPopOver").connect(this.oVizFrame.getVizUid())},onAfterRendering:function(){this.byId("teamMaintSelect").setSelectedKey("all")},_updateVizFrame:function(e){var t=this._constants.vizFrame,a=new i(t.dataset);e.setVizProperties(t.properties),e.setDataset(a),this._addFeedItems(e,t.feedItems),e.setVizType(t.type)},_addFeedItems:function(e,t){for(var a=0;a<t.length;a++)e.addFeed(new s(t[a]))},onTeamSelect:function(e){var t,a,i=e.getSource().getSelectedItem().getKey(),s=this.getModel("maint").getData().maintData,n=[],r={};if(s&&"all"!==i)s.forEach(function(e){e.tid===i&&n.push(e)});else for(var o=0;o<8;o++){t=s[o].itTicket,a=s[o].customerTicket;for(var l=0;l<s.length;l++)s[o].quater===s[l].quater&&s[o].tid!==s[l].tid&&(t+=s[l].itTicket,a+=s[l].customerTicket);r={quater:s[o].quater,itTicket:t,customerTicket:a},n.push(r)}this.oVizFrame.setModel(new d({maintData:n}))}})});