import React from 'react'
import Router from './router/Router'

/*const {peso, altura} = useContext(Context)
 
  const [kcalMin, setKcalMin] = useState(1600)
  const [kcalMax, setKcalMax] = useState(1800)
  const [mealsId, setMealsID] = useState([]) 
  const[mealsRendered, setMealsRendered] = useState([])
  const navigation = useNavigate()
  const IMC = (peso)/(altura/100)**2
 
  useEffect(() =>{
    if (IMC < 18.5) {
      setKcalMin(1800)
      setKcalMax(2000)
    }else if(IMC >= 18.5 && IMC < 25){
      setKcalMin(1600)
      setKcalMax(1800)
    }else if(IMC >= 25 && IMC < 30){
      setKcalMin(1400)
      setKcalMax(1600)
    }else if(IMC >= 30 && IMC < 35){
      setKcalMin(1200)
      setKcalMax(1400)
    }else if(IMC >= 35 && IMC < 40){
      setKcalMin(1000)
      setKcalMax(1200)
    }else{
      setKcalMin(800)
      setKcalMax(1000)
    }
  },[peso, altura])

  console.log(kcalMin, kcalMax)

  const planResult = async (calMin, calMax) => {
    try {
      const response = await fetch('https://api.edamam.com/api/meal-planner/v1/9d99e507/select', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Edamam-Account-User': 'dmedinas',
          'Authorization': 'Basic OWQ5OWU1MDc6IDg1MGE3YmVjYTE4ZGFjNmNiMGMyMThiMDcwNzAzZDg0',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "size": 7,
          "plan": {
            "accept": {
              "all": [ ]
            },
            "fit": {
              "ENERC_KCAL": {
                "min": calMin,
                "max": calMax
              }
            },
            "sections": {
              "Breakfast": {
                "accept":{
                  "all":[{"meal":["breakfast"]}]

                },
                "fit":{
                "ENERC_KCAL":{}
              }},
              "Lunch": {
                "accept":{
                  "all":[{"meal":["lunch/dinner"]}]
                },
                "fit":{ 
                  "ENERC_KCAL": {}
                },
                  
                "exclude": [
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_x",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_y",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_z"
                ],

              },
              "Dinner": {
                "accept":{
                  "all":[{"meal":["lunch/dinner"]}]
                },
                "fit":{ 
                  "ENERC_KCAL": {}
                  
                },
                "exclude": [
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_a",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_b",
                  "http://www.edamam.com/ontologies/edamam.owl#recipe_c"
                ],

              }
            }
          }
        })
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const mealsData = async (id) => {
    try {
      const response = await fetch(`https://api.edamam.com/api/recipes/v2/${id}?type=public&app_id=9d99e507&app_key=850a7beca18dac6cb0c218b070703d84`, {
        method: "GET",
        headers: {
          "Accept": "application/json",
          "Edamam-Account-User": "dmedinas",
          "Accept-Language": "en"
        }
      })
      const data = await response.json()
      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  }

  /*useEffect(() => {
    planResult(kcalMin, kcalMax).then(data => {
      console.log(data)

      const mealsRecipeID = data.selection.map(valor => {
        const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
        const lunch = valor.sections.Lunch.assigned.split("#")[1]
        const dinner = valor.sections.Dinner.assigned.split("#")[1]
        return [breakfast, lunch, dinner]
      })
      setMealsID(mealsId.concat(...mealsRecipeID))
    })
  }, [kcalMin,kcalMax])*/
  /*useEffect(() => {
  const fetchData = async () => {
    try {

        const data = await planResult(kcalMin,kcalMax)
        const mealsRecipeID = data.selection.map(valor => {
        const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
        const lunch = valor.sections.Lunch.assigned.split("#")[1]
        const dinner = valor.sections.Dinner.assigned.split("#")[1]
        return [breakfast, lunch, dinner]
      });
      setMealsID(mealsId.concat(...mealsRecipeID));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, [kcalMin, kcalMax]);
console.log(mealsId)
  //Array de promesas paraque lleguen en orden
  useEffect(() => {
    Promise.all(mealsId.map(mealsData))
      .then(dataArray => setMealsRendered(dataArray));
  }, [mealsId]);*/
const App = () => {
  return (
    <>
      <Router />
    </>
  )
}

export default App