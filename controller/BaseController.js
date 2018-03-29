sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/routing/History","sap/ui/model/json/JSONModel","sap/viz/ui5/data/FlattenedDataset","sap/viz/ui5/controls/common/feeds/FeedItem","sap/m/Label","sap/m/ColumnListItem","sap/m/Column","sap/m/library","sap/ui/model/Sorter"],function(e,t,u,i,s,a,c,r,d,m){"use strict";return e.extend("sap.support.sccd.controller.BaseController",{getModel:function(e){return this.getOwnerComponent().getModel(e)},_updateVizFrame:function(e,t,a){var s=this._constants.vizFrame,r={};r[a]=t;var n=new u(r);e.setModel(n);var o=new i(s.dataset);e.setVizProperties(s.properties),e.setDataset(o),this._addFeedItems(e,s.feedItems),e.setVizType(s.type)},_addFeedItems:function(e,t){for(var a=0;a<t.length;a++)e.addFeed(new s(t[a]))},_updateTable:function(e,t,a){var s=this._constants.table,r={};r[a]=t;for(var n=new u(r),o=this._createTableColumns(s.columnLabelTexts),i=0;i<o.length;i++)e.addColumn(o[i]);var l=new c({type:d.ListType.Navigation,cells:this._createLabels(s.templateCellLabelTexts)});l.attachPress(this._listItemPress,this),e.bindItems(s.itemBindingPath,l,[new m("teamName",!0,!0)]),e.setModel(n)},_createTableColumns:function(e){var t=this._createLabels(e);return this._createControls(r,"header",t)},_createLabels:function(e){return this._createControls(a,"text",e)},_createControls:function(e,t,a){for(var s=[],r={},n=0;n<a.length;n++)r[t]=a[n],s.push(new e(r));return s},getProjectData:function(e,a){var s=this;this.getModel().read(e,{success:function(e,t){s._updateVizFrame(s.oVizFrame,JSON.parse(e),a),s._updateTable(s.oTable,JSON.parse(e),a)},error:function(e){console.log(e)}})}})});