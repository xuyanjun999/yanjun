//JsonWriter.js

Ext.define('sef.core.data.JsonWriter',{
    extend:'Ext.data.writer.Json',
    alias:'writer.sef-jsonwriter',
    
    rootProperty:'Entity',

   

    writeRecords: function(request, data){
        //debugger;
        //data=this._transform(data,request);
        
        var req=  this.callParent(arguments);
        //debugger;
        var json=req.getJsonData()||{};
        var recs=request.getRecords();
        if(recs){
            var mo=recs[0].modified;
            var ms=[];
            for(var m in mo){
                ms.push(m);
            }
            json['Modified']=ms;//recs[0].modified;
        }
        req.setJsonData(json);
        return req;
    }
});