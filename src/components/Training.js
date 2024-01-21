import {reactive} from "vue";
import {player} from "@/components/player";
export const training = reactive([
    {
        name: "Growing Pain",
        description: "Use the fact that muscles get stronger when they grow to your advantage. +1 Max HP per completion.",
        unlocked: false, //need Healthy Body Perk
        actionColor: "Red",
        progressCost: 1,
        resource:"Health",
        progressMax: 1000,
        effect: () => {
            player.healthMax+=1
        }
    },
    {
        name: "Reading",
        description: "Enhance your Knowledge. +1 Max MP per completion.",
        unlocked: false, //need Keen Mind Perk
        progressMax: 1000,
        effect: () => {
            player.manaMax+=1;
        }
    },

])