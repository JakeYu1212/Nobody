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
        canvas: cc.Node,
        touchLocationDisplay: {
            default: null,
            type: cc.Label
        },
        follower: {
            default: null,
            type: cc.Node
        },
        followSpeed: 200,
        destination: cc.v2
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        var self = this;
        self.moveToPos = cc.v2(0, 0);
        self.isMoving = false;
        self.destination = cc.v2(0, 0);
        self.canvas.on(cc.Node.EventType.TOUCH_START, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.isMoving = true;
            // cc.log(touchLoc);
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            self.destination = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            // cc.log(touchLoc);
            // self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            self.moveToPos = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            self.destination = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            // self.touchLocationDisplay.textKey = i18n.t("cases/03_gameplay/01_player_control/On/OnTouchCtrl.js.1") + Math.floor(touchLoc.x) + ', ' + Math.floor(touchLoc.y) + ')';
        }, self.node);
        self.canvas.on(cc.Node.EventType.TOUCH_END, function (event) {
            // self.isMoving = false; // when touch ended, stop moving
            var touches = event.getTouches();
            var touchLoc = touches[0].getLocation();
            touchLoc = touches[0].getLocation();
            self.destination = self.follower.parent.convertToNodeSpaceAR(touchLoc);
            // cc.log('destination', self.destination);
            // cc.log(self.follower.position);
            // cc.log(self.destination.x, self.destination.y);           
        }, self.node);
    },

    isArrived: function () {
        var pos = this.follower.position;
        var destination = this.destination;
        var dis = destination.sub(pos);
        // cc.log(dis.mag());
        if(dis.mag() < 5){
            return true
        }
        else{
            return false
        }
        
    }, 

    // start () {

    // },

    update (dt) {
        if (!this.isMoving) return;
        var oldPos = this.follower.position;
        // cc.log('oldPos', oldPos);
        // get move direction
        var direction = this.moveToPos.sub(oldPos).normalize();
        // cc.log('moveToPos', this.moveToPos)
        // multiply direction with distance to get new position
        var newPos = oldPos.add(direction.mul(this.followSpeed * dt));
        // set new position
        this.follower.setPosition(newPos);
        // cc.log(this.follower.parent.position);
        // cc.log(newPos)
        // cc.log(this.isArrived());
        if (this.isArrived()){
            this.isMoving = false;
        }
        // cc.log(this.follower.position)
        // dis = this.follower.new.sub(this.destination)
        // if(dis.mag()<0.5){
        //     this.isMoving = false
        // }
    },
});
