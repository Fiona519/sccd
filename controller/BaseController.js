sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History",
	"sap/ui/model/json/JSONModel",
	"sap/viz/ui5/data/FlattenedDataset",
	"sap/viz/ui5/controls/common/feeds/FeedItem",
	"sap/m/Label",
	"sap/m/ColumnListItem", 
	"sap/m/Column",
	"sap/m/library",
	"sap/ui/model/Sorter"
], function(Controller, History, JSONModel, FlattenedDataset, FeedItem, Label, ColumnListItem, Column, MobileLibrary, Sorter){

	"use strict";

	return Controller.extend("sap.support.sccd.controller.BaseController", {

		getModel: function(sName){
			return this.getOwnerComponent().getModel(sName);
		},
/*
		_updateVizFrame: function(vizFrame, oData) {
			var oVizFrame = this._constants.vizFrame;

			//var oVizFramePath = jQuery.sap.getModulePath(this._constants.packageName, oVizFrame.modulePath);
			var oModel = new JSONModel({"homeData": oData});
			vizFrame.setModel(oModel);

			var oDataset = new FlattenedDataset(oVizFrame.dataset);

			vizFrame.setVizProperties(oVizFrame.properties);
			vizFrame.setDataset(oDataset);
			this._addFeedItems(vizFrame, oVizFrame.feedItems);
			vizFrame.setVizType(oVizFrame.type);
		},		
*/		
		_updateVizFrame: function(vizFrame, oData, sData) {
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

		_addFeedItems: function(vizFrame, feedItems) {
			for (var i = 0; i < feedItems.length; i++) {
				vizFrame.addFeed(new FeedItem(feedItems[i]));
			}
		},

		_updateTable: function(table, oData, sData) {
			var oTable = this._constants.table;
			var oResult = {};
			oResult[sData] = oData;
			var oTableModel = new JSONModel(oResult);
			
			var aColumns = this._createTableColumns(oTable.columnLabelTexts);

			for (var i = 0; i < aColumns.length; i++) {
				table.addColumn(aColumns[i]);
			}

			var oTableTemplate = new ColumnListItem({
				type: MobileLibrary.ListType.Navigation,
				cells: this._createLabels(oTable.templateCellLabelTexts)
			});

			oTableTemplate.attachPress(this._listItemPress, this);
			table.bindItems(oTable.itemBindingPath, oTableTemplate, [
					new Sorter("teamName", true, true)
				]);
			table.setModel(oTableModel);
		},

		_createTableColumns: function(labels) {
			var aLabels = this._createLabels(labels);
			return this._createControls(Column, "header", aLabels);
		},
		
		_createLabels: function(labelTexts) {
			return this._createControls(Label, "text", labelTexts);
		},
		
		_createControls: function(Control, prop, propValues) {
			var aControls = [];
			var oProps = {};
			for (var i = 0; i < propValues.length; i++) {
				oProps[prop] = propValues[i];
				aControls.push(new Control(oProps));
			}
			return aControls;
		},
		
		getProjectData: function(sPath, sData){
			var that = this;
			this.getModel().read(sPath, {
				success: function(oData, oResponse){
					that._updateVizFrame(that.oVizFrame, JSON.parse(oData), sData);
					that._updateTable(that.oTable, JSON.parse(oData), sData);
				},
				error: function(oError){
					console.log(oError);
				}
			});
		}
	});
});