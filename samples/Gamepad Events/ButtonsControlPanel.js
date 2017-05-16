import * as RODIN from 'rodin/core';

export class ButtonsControlPanel extends RODIN.Sculpt {
    constructor() {
        super();

        /**
         * Create clickOnMe button given parameters
         * Add to control panel
         */
        let clickOnMeBtnParams = {name: "clickOnMeBtn", width: 0.35, height: 0.15};
        clickOnMeBtnParams.background = {
            color: 0x336699,
            opacity: 0.8
        };
        clickOnMeBtnParams.border = {
            radius: 0.075
        };
        let clickOnMeButton = new RODIN.Element(clickOnMeBtnParams);
        clickOnMeButton.on(RODIN.CONST.READY, (evt) => {
            this.add(evt.target);
        });

        /**
         * Set clickOnMe button text styling
         * Add to clickOnMeButton
         * Set local position z
         */
        const clickOnMeBtnText = new RODIN.Text({
            text: 'Click on me',
            color: 0xffffff,
            fontSize: 0.04
        });
        clickOnMeBtnText.on(RODIN.CONST.READY, (evt) => {
            clickOnMeButton.add(evt.target);
            evt.target.position.z = 0.005;
        });

        /**
         * On clickOnMeButton hover it will be scale set 1.1
         * On hover out scale set 1
         */
        clickOnMeButton.on(RODIN.CONST.GAMEPAD_HOVER, (evt) => {
            evt.target.scale.set(1.1, 1.1, 1.1);
        });
        clickOnMeButton.on(RODIN.CONST.GAMEPAD_HOVER_OUT, (evt) => {
            evt.target.scale.set(1, 1, 1);
        });

        /**
         * Create gamepadButtonNameField given parameters
         * Set local position y
         * Add to control panel
         */
        let gamepadButtonNameFieldParams = {name: "gamepadButtonNameField", width: 0.8, height: 0.15};
        gamepadButtonNameFieldParams.background = {
            color: 0x0d253e,
            opacity: 0.4
        };
        gamepadButtonNameFieldParams.border = {
            radius: 0.075,
        };
        let gamepadButtonNameField = new RODIN.Element(gamepadButtonNameFieldParams);
        gamepadButtonNameField.on(RODIN.CONST.READY, (evt) => {
            evt.target.position.y = 0.3;
            this.add(evt.target);
        });

        /**
         * Set gamepad button name styling
         * Add to gamepadButtonNameField
         * Set local position z
         */
        const gamepadButtonName = new RODIN.Text({
            text: 'Clicked gamepad button name',
            color: 0xffffff,
            fontSize: 0.04
        });
        gamepadButtonName.on(RODIN.CONST.READY, (evt) => {
            gamepadButtonNameField.add(evt.target);
            evt.target.position.z = 0.005;
        });

        /**
         * Add clickOnMeButton and gamepadButtonName to ButtonsControlPanel class
         */
        this.clickOnMeButton = clickOnMeButton;
        this.gamepadButtonName = gamepadButtonName;
    }

}