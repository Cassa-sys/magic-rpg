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
            if(this.tickCount==tickSpeed) {
                if(player.action!="") {
                    player.actionProgress++;
                    if(player.exp>=player.maxXP) player.levelUp();
                    if(player.actionResource.includes("Health")) {
                        player.health-=player.actionCost;
                    }
                    if(player.actionResource.includes("Mana")) {
                        player.mana-=player.actionCost;
                    }
                    if(player.actionResource.includes("Stamina")) {
                        player.stamina-=player.actionCost
                    }

                    if(player.actionProgress>=player.actionMax) {
                        player.actionResult();
                        player.actionProgress=0;
                    }
                }

                this.tickCount=0;
                this.tickCount++;
            } else {
                this.tickCount++
            }
        }
    }
})