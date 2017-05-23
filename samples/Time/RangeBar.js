import * as RODIN from 'rodin/core';

export class RangeBar extends RODIN.Sculpt {
    constructor() {
        super();

        /**
         * Create sceneTimeValue given parameters
         * Add to RangeBar
         */
        const rangeLenght = 1.05;
        let sceneTimeValueParam = {name: "sceneTimeValueParam", width: rangeLenght, height: 0.025};
        sceneTimeValueParam.background = {
            color: 0x0d253e,
            opacity: 0.8
        };
        sceneTimeValueParam.border = {
            radius: 0.015,
        };
        let sceneTimeValue = new RODIN.Element(sceneTimeValueParam);
        sceneTimeValue.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
        });

        /**
         * On sceneTimeValue hover it will be scale set 1.2
         * On hover out scale set 1
         */
        sceneTimeValue.on(RODIN.CONST.GAMEPAD_HOVER, (evt) => {
            evt.target.scale.set(1, 1.2, 1);
        });
        sceneTimeValue.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            evt.target.scale.set(1, 1, 1);
        });


        /**
         * Set change active scene time text styling
         * Add to RangeBar
         * Set local position
         */
        const sceneTimeValueText = new RODIN.Text({
            text: 'Change active scene time value',
            color: 0xffffff,
            fontSize: 0.045
        });
        sceneTimeValueText.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
            evt.target.position.z = 0.005;
            evt.target.position.y = 0.06;
        });

        /**
         * Set start value text styling
         * Add to RangeBar
         * Set local position
         */
        const startValueText = new RODIN.Text({
            text: '0',
            color: 0xffffff,
            fontSize: 0.035
        });
        startValueText.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
            evt.target.position.set(-0.5, -0.04, 0.005);
        });

        /**
         * Set final value text styling
         * Add to RangeBar
         * Set local position
         */
        const finalValueText = new RODIN.Text({
            text: '100',
            color: 0xffffff,
            fontSize: 0.035
        });
        finalValueText.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
            evt.target.position.set(0.5, -0.04, 0.005);
        });

        /**
         * Create rangeBtn given parameters
         * Add to RangeBar
         */
        let rangeBtnParam = {name: "rangeBtn", width: 0.03, height: 0.03};
        rangeBtnParam.background = {
            color: 0xffffff,
            opacity: 1
        };
        rangeBtnParam.border = {
            radius: 0.015,
        };
        let rangeBtn = new RODIN.Element(rangeBtnParam);
        rangeBtn.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
            evt.target.position.z = 0.005;
        });

        /**
         * Add sceneTimeValue and rangeBtn to RangeBar class
         */
        this.sceneTimeValue = sceneTimeValue;
        this.sceneTimeValue.length = rangeLenght;
        this.sceneTimeValue.finalValue = 100;
        this.rangeBtn = rangeBtn;
    }

}