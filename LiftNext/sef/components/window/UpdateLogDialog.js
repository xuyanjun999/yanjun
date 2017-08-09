//ExportDialog

Ext.define('sef.core.components.window.UpdateLogDialog', {
    extend: 'sef.core.components.window.BaseDialog',

    xtype: 'sef-updatedialog',
    //ui:'sefu-lockingwindow',

    title: _('更新日志'),
    closable: false,
    width: 400,
    height: 400,
    iconCls: 'x-fa fa-tag',
    dynamicContent: true,

    config: {
        url: '',
        cancelText: '',
        okText: _('关闭')
    },


    loadLog: function() {
        var me = this;
        sef.utils.ajax({
            url: this.url,
            method: 'POST',

            scope: me,
            success: function(result) {
                //console.log(result);
                if(Ext.isArray(result)){
                    result.forEach(function(r){
                        if(r.Date){
                            var d=Ext.Date.parse(r.Date,'c');
                            r.Date=Ext.Date.format(d,'m/d/Y');
                        }
                        if(r.Desc){
                            //debugger;
                            //r.Desc=/\<br />/.replace()
                            var ds=r.Desc.split('<br/>');
                            var dds=[];
                            
                            ds.forEach(function(d){
                                dds.push('<li>'+d+'</li>');
                            });
                            r.Desc='<ul>'+dds.join('')+'</ul>';
                            dds=null;
                            ds=null;
                            //r.Desc='<li>'
                        }
                    });
                }
                this.down('#logBox').setData(result);
                this.unmask();
                //me.view.store.reload();
            },
            failure: function(err, resp) {
                this.unmask();
                //sef.dialog.error(err.message);

            }
        });

        return;


    },

    initComponent: function() {

        Ext.apply(this, {
            items: {
                xtype: 'box',
                layout: 'fit',
                itemId:'logBox',
                scrollable:'y',
                //html: 'loading...',
                data: {},
                cls:'sef-updatelog',
                tpl: ['<tpl for=".">',
                '<div class="line-item">',
                '<div class="ver">{Ver}</div>',
                '<div class="date">{Date}</div>',
                '<div class="desc">{Desc}</div>',
                '</div>',
                
                 '</tpl>']
            }
        });

        this.callParent(arguments);
        //this.initDialog();
    },

    afterRender: function() {
        this.callParent(arguments);
        this.mask();
        this.loadLog();
    }
});