import {player} from "@/components/player";
import {reactive} from "vue";
export const gameControl = reactive({
    paused: true,
    tickCount: 0,
    state: "Paused",
    pauseGame: function () {
        this.paused = !this.paused;
        this.state = (this.paused) ? "Paused": "Unpaused";
    },
    gameLoop: function (tickSpeed) {
        if(!this.paused) {
            //every x ticks do action
            if(this.tickCount===tickSpeed) {
                player.action.actionProgress++; //increase the players current action
                if(player.exp>=player.maxXP) player.levelUp(); //check if player can level up



                //take the costs of the action
                if(player.action.actionResource.includes("Health")) {
                    player.health-=player.action.actionCost;
                    if(player.health<=0) player.rest()
                }
                if(player.action.actionResource.includes("Mana")) {
                    player.mana-=player.action.actionCost;
                    if(player.mana<=0) player.rest()
                }
                if(player.action.actionResource.includes("Stamina")) {
                    player.stamina-=player.action.actionCost;
                    if(player.stamina<=0) player.rest()
                }

                //complete action
                if(player.action.actionProgress>=player.action.actionMax) {
                    player.action.actionResult();
                    player.action.actionProgress=0;
                }

                //if resting and all bars at max, then go back to previous action
                if(player.action.actionName==='Resting' && (player.health===player.maxHealth) && (player.mana===player.maxMana) && (player.stamina===player.maxStamina)) {
                    player.action=player.tempAction;
                }

                //tick progression
                this.tickCount=0;
                this.tickCount++;
            } else {
                this.tickCount++
            }
        }
    }
})