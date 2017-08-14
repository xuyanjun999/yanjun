/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting automatically applies the "viewport"
 * plugin causing this view to become the body element (i.e., the viewport).
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('sef.core.view.main.Main', {
    extend: 'Ext.panel.Panel',
    xtype: 'app-main',

    title: 'SEF',
    layout: {
        type: 'vbox'
    },
    items: [{
            html: '中文字体'
        }, {
            flex: 1,
            html: '<div class="cctv">here is cctv</div>'
        }]
        //html: 'here is sef content中文字体'
});