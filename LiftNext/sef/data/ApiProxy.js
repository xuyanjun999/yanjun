//ApiProxy.js

Ext.define('sef.core.data.ApiProxy', {
    extend: 'Ext.data.proxy.Rest',
    alias: 'proxy.sef-apiproxy',
    config: {
        actionMethods: {
            create: 'POST',
            read: 'POST',
            update: 'POST',
            destroy: 'POST'
        },
        paramsAsJson:true,
        filterParam: 'Filter',
        limitParam: 'Limit',
        pageParam: 'Page',
        startParam: 'Start',
        sortParam: 'Sort',
        directionParam: 'SortDir'
    },
    reader: {
        type: 'sef-jsonreader'
    },
    writer: {
        type: 'sef-jsonwriter'
    },


    buildUrl: function(request) {
        var me = this,
            operation = request.getOperation(),
            records = operation.getRecords(),
            //record    = records ? records[0] : null,
            format = me.getFormat(),
            url = me.getUrl(request),
            id, params;



        //console.log('url#',operation);
        var action = operation.action;
        if (/\.json$/.test(url)) {
            //hack
            url = url.replace(".json", "."+action + ".json");
        } else {
            if (!url.match(me.slashRe)) {
                url += '/';
            }
            url += action;
        }




        if (format) {
            if (!url.match(me.periodRe)) {
                url += '.';
            }

            url += format;
        }

        request.setUrl(url);
        return url;
        //return me.callParent([request]);

    }

});