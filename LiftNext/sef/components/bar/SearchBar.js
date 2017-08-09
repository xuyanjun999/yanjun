//Searchbar.js

Ext.define('sef.core.components.bar.SearchBar', {
    extend: 'Ext.container.Container',
    xtype: 'sef-searchbar',
    cls: 'sef-searchbar',
    layout: {
        type: 'vbox',
        align: 'stretch'
    },
    model:null,
    searchItems:null,
    //layout:'column',
    columnWidth:0,//.33333,
    labelWidth:80,
    padding: '5 10 5 10',

    viewModel: {
        data: {
            simple_search: true
        }
    },


    makeAdvSearchItems: function() {
        var me=this,items = [];

        if(!this.searchItems)this.searchItems=[];
        var modelMeta=sef.utils.getModelMeta(this.model);
        this.searchItems.forEach(function(f){
            var field=null,mf=null;
            if(Ext.isString(f)){
                mf=Ext.Array.findBy(modelMeta,function(mm){
                    return mm.name===f;
                });
                if(mf){
                    field={
                        //xtype:'textfield',
                        fieldLabel:mf.text
                    };
                }
            }else{
                mf=Ext.Array.findBy(modelMeta,function(mm){
                    return mm.name===f.name;
                });
                field=Ext.merge({},f);
                Ext.applyIf(field,{
                    fieldLabel:mf.text
                });
            }
            if(field){
                if(mf){
                    var type=mf.type.toLowerCase();
                    var fc={xtype:'textfield'};

                    switch(type){
                        case 'bool':
                        case 'boolean':
                            fc['xtype']='sef-boolcombo';
                            break;
                        case 'int':
                        case 'bigint':
                            fc['xtype']='sef-rangefield';
                            fc['rtype']='numberfield';
                            fc['fieldDefaults']={
                                allowDecimals:false
                            };
                            break;
                        case 'float':
                        case 'double':
                        case 'decimal':
                            fc['xtype']='sef-rangefield';
                            fc['rtype']='numberfield';
                            break;
                        case 'datetime':
                        case 'date':
                        case 'time':
                            fc['xtype']='datefield';
                            break;
                        case 'enum':
                            fc['xtype']='sef-enumcombo';
                            fc['enumType']=mf.sassb;
                            break;
                    }
                    Ext.apply(field,fc);
                    Ext.applyIf(field,{
                        name:mf.name
                    });
                }
                
                items.push(field);
            }
        });

        //console.log('items###',items);

        
        for (var i = 0; i < 0; i++) {
            items.push({
                xtype: 'textfield',
                fieldLabel: 'col#' + i
            });
        }

        items.push({
            columnWidth:1,
            xtype:'container',
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items:[{
                xtype:'button',
                btnType:'primary',
                text:_('搜  索'),
                handler:function(){
                    me.onAdvSearch();
                }
            },{
                xtype:'button',
                text:_('清  空'),
                btnType:'default',
                margin: '0 0 0 5px',
                handler:function(){
                    me.onClearSearch();
                }
            },{
                margin: '0 0 0 5px',
                xtype:'button',
                btnType:'link',
                text:_('简易搜索'),
                handler:function(){
                    me.switchSearchMode(true);
                }
            }]
        });

        //console.log(items);

        return items;


    },

    switchSearchMode: function(forSimple) {
        this.getViewModel().setData({
            simple_search:forSimple
        });
    },

    makeSimpleSearch: function() {
        var me=this;
        return {
            xtype: 'container',
            hidden: true,
            bind: {
                hidden: '{!simple_search}'
            },
            layout: {
                type: 'hbox',
                align: 'middle',
                pack: 'end'
            },
            items: [{
                xtype: 'sef-searchfield',
                emptyText:_('快速查询'),
                minWidth: 250,
                listeners:{
                    scope:me,
                    'quicksearch':me.onQuickSearch
                }
            }, {
                xtype: 'button',
                btnType: 'link',
                margin: '0 0 0 5px',
                text: _('高级查询'),
                hidden:!me.searchItems,
                handler:function(){
                    me.switchSearchMode(false);
                }
            }]
        }
    },

    makeAdvSearch: function() {
        return {
            xtype: 'form',
            itemId:'search_form',
            layout: 'column',
            hidden: true,
            bind: {
                hidden: '{simple_search}'
            },
            margin:'10 0 0 0',
            defaults: {
                columnWidth: this.columnWidth,
                margin: '0 10px 10px 0',
                labelSeparator: '  ',
                labelAlign:'right',
                labelWidth:this.labelWidth
            },
            items: this.makeAdvSearchItems()

        }
    },

    makeItems: function() {
        var items = [this.makeSimpleSearch(), this.makeAdvSearch()];
        return items;
    },

    onQuickSearch:function(v){
        //console.log('will be quicksearch#',v,this);
        this.fireEvent('search',v);
    },

    onClearSearch:function(){
        var form=this.down('#search_form');
        form.reset();
    },

    onAdvSearch:function(){
        //console.log('will do adv search#');
        var form=this.down('#search_form').getForm();
        //console.log('advSearch#',form.getFieldValues());//getValues());
        var searchValues=form.getFieldValues();
        var hasValue=false;
        for(var sv in searchValues){
            if(searchValues[sv]){
                hasValue=true;
                break;
            }
        }
        this.fireEvent('search',hasValue==true?searchValues:null);
    },


    initComponent: function() {
        if(this.searchItems && this.columnWidth<=0){
            if(this.searchItems.length<6){
                this.columnWidth=.5;
            }else{
                this.columnWidth=1/3;
            }
        }
        //console.log('cw#',this.columnWidth);
        Ext.apply(this, {
            items: this.makeItems()
        });
        this.callParent(arguments);
    }
});