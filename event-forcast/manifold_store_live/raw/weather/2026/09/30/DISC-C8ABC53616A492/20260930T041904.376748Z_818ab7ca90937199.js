/**
 * 
 */

function onBtnVariablesClick()
{
	var doc = document;

	doc.browserLogInt("onBtnVariablesClick()");
}

function createUI()
{
	var doc = document;

}

function loadUI()
{
	var doc = document;

	require([ "dojo", "dojo/has", "dojo/_base/sniff", "dojo/ready", "dojo/dom",
			"dojo/dom-style", "dojo/query", "dijit/registry", "dojo/on",
			"dojo/mouse", "dojo/NodeList-dom", "dojo/domReady!", "dojo/number",
			"dojo/data/ItemFileReadStore", "dojo/_base/array", "dojo/parser",
			"dojo/date/stamp", "dijit/dijit", "dijit/layout/ContentPane",
			"dijit/Tree", "dijit/layout/TabContainer", "dijit/MenuBar",
			"dijit/PopupMenuBarItem", "dijit/MenuItem", "dijit/Menu",
			"dijit/form/Button", "dijit/form/HorizontalSlider",
			"dijit/form/HorizontalRule", "dijit/form/HorizontalRuleLabels",
			"dojox/form/HorizontalRangeSlider", "dojox/widget/Standby",
			"dijit/TooltipDialog", "dijit/popup", "dojox/timing",
			"dojox/lang/functional/object", "dojo/request/script" ], function(
			dojo, has, sniff, ready, dm, domStyle, query, reg, on, mouse,
			NodeListDom, domReady, number, ItemFileReadStore, arrayUtils,
			parser, datestamp, dijit, ContentPane, Tree, TabContainer, MenuBar,
			PopupMenuBarItem, MenuItem, Menu, Button, HorizontalSlider,
			HorizontalRule, HorizontalRuleLabels, HorizontalRangeSlider,
			Standby, TooltipDialog, dijitPopup, dojoxTiming, dojoxObject,
			script)
	{
		doc.dojo = dojo;
		doc.has = has;
		doc.sniff = sniff;
		doc.dom = dm;
		doc.domStyle = domStyle;
		doc.query = query;
		doc.registry = reg;
		doc.dojoOn = on;
		doc.dojoMouse = mouse;
		doc.number = number;
		doc.ItemFileReadStore = ItemFileReadStore;
		doc.arrayUtils = arrayUtils;
		doc.parser = parser;
		doc.datestamp = datestamp;
		doc.dijit = dijit;
		doc.ContentPane = ContentPane;
		doc.Tree = Tree;
		doc.TabContainer = TabContainer;
		doc.MenuBar = MenuBar;
		doc.PopupMenuBarItem = PopupMenuBarItem;
		doc.MenuItem = MenuItem;
		doc.Menu = Menu;
		doc.Button = Button;
		doc.HorizontalSlider = HorizontalSlider;
		doc.HorizontalRule = HorizontalRule;
		doc.HorizontalRuleLabels = HorizontalRuleLabels;
		doc.HorizontalRangeSlider = HorizontalRangeSlider;
		doc.Standby = Standby;
		doc.TooltipDialog = TooltipDialog;
		doc.dijitPopup = dijitPopup;
		doc.timing = dojoxTiming;
		doc.dojoxObject = dojoxObject;
		doc.script = script;
		doc.parser.parse();
		doc.cb_UILoaded.set(true);
	});
}

