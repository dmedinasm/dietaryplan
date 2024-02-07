export const days =[1, 2, 3, 4, 5, 6 ,7]

export const dietType = [
    { id: "hProtein", data: "HIGH_PROTEIN", name:"high-protein" },
    { id: "balanced", data: "BALANCED", name:"balanced" },
    { id: "hFiber", data: "HIGH_FIBER", name:"high-fiber" },
    { id: "lFat", data: "LOW_FAT", name:"low-fat" },
    { id: "lCarb", data: "LOW_CARB", name:"low-carb" },
    { id: "lSodium", data: "LOW_SODIUM", name:"low-sodium" }
]

export const allergies = [
    {id:"lowSugar", data: ["LOW_SUGAR","SUGAR_CONSCIOUS","NO_SUGAR_ADDED"], name:"low-sugar"},
    {id:"sulfiteF", data:["SULFITE_FREE"],name:"low-sulfite"},
    {id:"fMap", data:["FODMAP_FREE"],name:"FODMAP"},
    {id:"kosher", data:["KOSHER"],name:"kosher"},
    {id: "noOil", data : ["NO_OIL_ADDED"],name:"no-oil-added"},
    {id: "milk", data:["DAIRY_FREE", "MILK_FREE"],name:"milk-free"},
    {id:"glutenFree", data:["GLUTEN_FREE", "WHEAT_FREE"],name:"gluten-free"},
    {id:"eggFree", data:["EGG_FREE"],name:"egg-free"},
    {id:"peanutFree", data:["PEANUT_FREE"],name:"peanut-free"},
    {id:"tNutFree", data:["TREE_NUT_FREE"],name:"tree-nut-free"},
    {id:"soyFree", data:["SOY_FREE"],name:"soy-free"},
    {id:"fishFree", data:["FISH_FREE"],name:"fish-free"},
    {id:"seaFree", data:["SELLFISH_FREE","CRUSTACEAN_FREE","MOLLUSK_FREE"],name:"seafood-free"},
    {id:"celeryFree", data:["CELERY_FREE"],name:"celery-free"},
    {id:"mustardFree", data:["MUSTARD_FREE"],name:"mustard-free"},
    {id:"sesameFree", data:["SESAME_FREE"],name:"sesame-free"},
    {id:"lupineFree", data:["LUPINE_FREE"],name:"lupine-free"},
    {id:"alcFree",data:["ALCOHOL_FREE"],name:"alcohol-free"}
]

export const getDietKCal = ({imc,dietHealth,allergiesCare}) =>{
    let params = {}
    if (imc < 18.5) {
      params = {kcMin: 1600, kcMax: 2000, kMinBr: 160, kMaxBr: 600, kcMinLunch: 480, 
      kcMaxLunch: 900, kcMinDin: 320, kcMaxDin: 900, diet: dietHealth, allergy: allergiesCare}
    }else if(imc >= 18.5 && imc < 25){
      params = {kcMin: 1400, kcMax: 1800, kMinBr: 140, kMaxBr: 540, kcMinLunch: 420, 
        kcMaxLunch: 810, kcMinDin: 280, kcMaxDin: 810, diet: dietHealth, allergy: allergiesCare}
    }else if(imc >= 25 && imc < 30){
      params = {kcMin: 1200, kcMax: 1600, kMinBr: 120, kMaxBr: 480, kcMinLunch: 360, 
        kcMaxLunch: 720, kcMinDin: 240, kcMaxDin: 720, diet: dietHealth, allergy: allergiesCare}
    }else if(imc >= 30 && imc < 35){
      params = {kcMin: 1000, kcMax: 1400, kMinBr: 100, kMaxBr: 420, kcMinLunch: 300, 
        kcMaxLunch: 630, kcMinDin: 200, kcMaxDin: 630, diet: dietHealth, allergy: allergiesCare}
    }else if(imc >= 35 && imc < 40){
      params = {kcMin: 800, kcMax: 1200, kMinBr: 80, kMaxBr: 360, kcMinLunch: 240, 
        kcMaxLunch: 540, kcMinDin: 160, kcMaxDin: 540, diet: dietHealth, allergy: allergiesCare}
    }else{
      params = {kcMin: 400, kcMax: 1000, kMinBr: 40, kMaxBr: 300, kcMinLunch: 120, 
        kcMaxLunch: 450, kcMinDin: 80, kcMaxDin: 450, diet: dietHealth, allergy: allergiesCare}
    }
     return params
}
