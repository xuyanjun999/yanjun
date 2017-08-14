//TreeModel.js


Ext.define('sef.core.model.CheckboxTreeModel', {
	extend: 'Ext.data.TreeModel',
	fields: [{
		name: 'checked',
		mapping: 'Checked'
	},{
		name: 'text',
		mapping: 'Text'
	}, {
		name: 'expanded',
		mapping: 'Expanded'
	},{
		name:'children',
		mapping:'Children'
	},{
		name: 'leaf',
		mapping: 'Leaf'
	}, {
		name: 'iconCls',
		mapping: 'IconCls'
	}, {
		name:'badge',
		mapping:'IsBadge'
	},{
		name:'path',
		mapping:'Path'
	},{
		name: 'nodeType',
		mapping: 'NodeType'
	}, {
		name: 'data',
		mapping: 'Data'
	},{
		name: 'DataID'
	}, {
		name: 'D1'
	}, {
		name: 'D2'
	}, {
		name: 'D3'
	}, {
		name: 'D4'
	},{
		name:'cls',
		mapping:'Cls'
	}]
});