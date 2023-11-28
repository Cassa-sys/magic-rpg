import {reactive} from "vue";
import {player} from "@/components/player";
function removeSkill(skillName) {
    skills.splice(skills.findIndex((element) => element.name ==skillName),1);
}

export const skills = reactive([
    {
        name: "Healthy Body",
        description: "You have always been in good health. Multiply all health by 5.",
        cost: 0,
        conflicts: "Keen Mind, Unstoppable",
        effect: function () {
            player.health*=5;
            player.healthMax*=5;
            player.healthMulti+=4;
            removeSkill("Healthy Body");
            removeSkill("Keen Mind");
            removeSkill("Unstoppable");
        }
    },
    {
        name: "Keen Mind",
        description: "You've spent you childhood reading tomes. Multiply all mana by 5.",
        cost: 0,
        conflicts: "Healthy Body, Unstoppable",
        effect: function () {
            player.mana*=5;
            player.manaMax*=5;
            player.manaMulti+=4;
            removeSkill("Healthy Body");
            removeSkill("Keen Mind");
            removeSkill("Unstoppable");
        }
    },
    {
        name: "Unstoppable",
        description: "Everyday you were out swinging a sword. It paid off. Multiply all stamina by 5.",
        cost: 0,
        conflicts: "Healthy Body, Keen Mind",
        effect: function () {
            player.stamina*=5;
            player.staminaMax*=5;
            player.staminaMulti+=4;
            removeSkill("Healthy Body");
            removeSkill("Keen Mind");
            removeSkill("Unstoppable");
        }
    },
    {
        name: "Pack Mule",
        description: "You have grown stronger from carrying all this loot around. Gain 5 more inventory slots.",
        cost: 1,
        conflicts: "None",
        effect: function () {
            if(player.skillPoints>this.cost){
                player.skillPoints-=this.cost;
                player.inventoryMax +=5;
                removeSkill("Pack Mule");
            }
        }
    },

])