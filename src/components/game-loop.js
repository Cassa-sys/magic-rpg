import {player} from "@/components/player";
import {camelize, reactive} from "vue";
function completeAction() {
    if(player.action.actionProgress>=player.action.actionMax) {
        player.action.actionResult()
        player.action.actionProgress=0;
    }
}
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
            localStorage.setItem("rpgSave",JSON.stringify(player)); //save game
            //every x ticks do action
            if(this.tickCount===tickSpeed) {
                player.action.actionProgress++; //increase the players current action
                if(player.action.actionName=="Attack") {
                    player.monsterProgress++;
                    if(player.monsterProgress==player.monsterProgressMax) {
                        player.health= player.defense-player.monsterAttack;
                        player.monsterProgress=0;
                    }
                }
                console.log("Temp Progress: " + player.tempAction.actionProgress);
                if(player.exp>=player.expMax) player.levelUp(); //check if player can level up




                //take the costs of the action
                if(player.action.actionResource.includes("Health")) {
                    player.health-=player.action.actionCost;
                    //go rest if not action takes health and below 0 health.
                }
                //we always want to cancel action if health ==0
                if(player.health<=0) {
                    completeAction() //only procs if done
                    player.tempAction = {...player.action};
                    player.rest();
                }
                if(player.action.actionResource.includes("Mana")) {
                    player.mana-=player.action.actionCost;
                    if(player.mana<=0) {
                        completeAction() //only procs if done
                        player.tempAction = {...player.action};
                        player.rest();
                    }
                }
                if(player.action.actionResource.includes("Stamina")) {
                    player.stamina-=player.action.actionCost;
                    if(player.stamina<player.action.actionCost) {
                        completeAction() //only procs if done
                        player.tempAction = {...player.action};
                        player.rest();
                    }
                }

                completeAction();

                //if resting and all bars at max, then go back to previous action
                if(player.action.actionName==='Resting' && (player.health===player.healthMax) && (player.mana===player.manaMax) && (player.stamina===player.staminaMax)) {
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