/**
 * Created by King Lee on 2014/7/14.
 */
var handlerMgr = require("./../handlerMgr");
var consts = require("../../../util/consts");
var pomelo = require('pomelo');
var activity_templete = require('../../../../config/activity_templete');

handlerMgr.handler(consts.TYPE_MSG.TYPE_SIGN_IN, function(msg, session, next) {
    var channel = msg.channel;
    var version = msg.version;
    var desc = 'default_desc';
    var activity_wrapper = pomelo.app.get('activity_wrapper');
    activity_wrapper.get(channel,version,function(activity_json){
        for(var v in activity_json){
            if(consts.TYPE_ACTIVITY.TYPE_DAILY_SIGN == activity_json[v].type){
                desc = activity_json[v].desc;
            }
        }
        next(null, {
            code: 0,
            msg_id : msg.msg_id,
            time:Date.now()/1000,
            type:consts.TYPE_ACTIVITY.TYPE_DAILY_SIGN,
            desc:desc
        });
    });
});