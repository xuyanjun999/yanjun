//BaseModel

Ext.define('sef.core.model.BaseModel', {
    extend: 'Ext.data.Model',
    idProperty: 'ID'

    /*
    fields: [
        {
            name: 'name',  
            type: 'string',
            stype:'enum',//服务器数据类型，enum为枚举,asso为关联实体
            stypename:'Sef.core.TestEnum,Sef.core',//服务器类型完整名
            assomodel:'',关联实体类型

        }
        
    ],
    */
});