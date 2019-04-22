// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        
        // normal moving speed of the player
        speed: 0,
        collider: cc.PolygonCollider
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function () {
        cc.director.getCollisionManager().enabled = true;
        cc.director.getCollisionManager().enabledDebugDraw = true;

        this.node.on(cc.Node.EventType.TOUCH_START, function (event) {
            // 返回世界坐标
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            cc.log(touchLoc);
            // https://docs.cocos.com/creator/api/zh/classes/Intersection.html 检测辅助类
            if (cc.Intersection.pointInPolygon(touchLoc, this.collider.world.points)) {
                cc.log("Hit!");
            }
            else {
                cc.log("No hit");
            }
        }, this);
    },

    // start () {},

    // update (dt) {},
});
