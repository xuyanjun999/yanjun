//LookupDataGrid

Ext.define('sef.core.components.grid.DataGridField', {
    extend: 'sef.core.components.grid.DataGrid',
    mixins: ['Ext.form.field.Field'],
    xtype: 'sef-datagridfield',
    ui:'sefu-dgfield',
    controller:'sefc-dgctrl',
    iconCls:'x-fa fa-list',
    quickSearchInPaging:true,
    showPageSizeSwitcher:false,
    border:true,
    minHeight:300,
    dataExist:'name',
    
    config:{
        assoField:null,
        bars:null,
        editor:null
        /*,{
            title:null,
            width:400,
            height:400,
            formType:null,
            clsName:null
        }*/
    },
    viewModel:{
        data:{}
    },
    hidden:true,
    


    privates:{
        _title:null,
        _iconCls:null,
        _rawValue:0,
        DEFAULT_BUTTONS:{
            'ADD':{
                iconCls:'x-fa fa-plus',
                actionName:'create',
                tooltip:_('添加')
            },
            'DELETE':{
                iconCls:'x-fa fa-minus',
                actionName:'delete',
                dataAction:true,
                //dataActionName:'roles'
                tooltip:_('删除')
            },
            'EDIT':{
                iconCls:'x-fa fa-pencil',
                actionName:'edit',
                dataAction:true,
                tooltip:_('修改')
            }
        }
    },
    //bindStoreAtInit:true,

    setValue:function(v){
        var lv=this._rawValue;
        if(Ext.isNumber(v) && v>0){
            this._rawValue=v;
        }else{
            this._rawValue=0;
        }
        if(lv!=this._rawValue){
            this.setHidden(this._rawValue<1);
            this.updateLayout();
            if(this._rawValue>0){
                this.store.load();
            }
        }

        

        //console.log('df.setValue#',v,this._rawValue);
    },

    getValue:function(){
        return this._rawValue;
    },
    
    makeTBar:function(){
        var me=this,_bars=[];
        if(this._title){
            //bars.push(this._title);
            _bars.push({
                xtype:'tbtext',
                cls:'sef-grid-title',
                html:'<span class="'+this._iconCls+'"></span>'+this._title
            });
            _bars.push('->');
        }
        if(this.bars){
            var abars=['-'];
            //var me=this;
            this.bars.forEach(function(b){
                var newB={};
                if(Ext.isString(b)){
                    newB=me.DEFAULT_BUTTONS[b];
                }else{
                    newB=Ext.merge({},b);
                }
                if(newB.actionName){
                    newB.actionName=me.name+'_'+newB.actionName;
                }

                Ext.applyIf(newB,{
                    xtype:'sef-actionbutton',
                    dataAction:false,
                    btnType:'link',
                    dataActionName:me.name
                });
                newB['isChild']=true;
                abars.push(newB);
            });
            _bars=_bars.concat(abars);

            //console.log(abars);
        }
        

        return _bars;

        
    },

    initComponent: function() {
        if(this.title || this.config.title){
            this._title=this.title||this.config.title;
            delete this.title;
            delete this.config.title;
        }
        if(this.iconCls || this.config.iconCls){
            this._iconCls=this.config.iconCls||this.iconCls;
            delete this.iconCls;
            delete this.config.iconCls;
        }
        this.callParent(arguments);
        var me=this;
        this.getStore().additionFilterFn=function(){
            var q={};
            q[me.assoField]=me.getValue();
            return q;
        }

        //this.initDialog();

       
    }
});