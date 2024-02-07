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