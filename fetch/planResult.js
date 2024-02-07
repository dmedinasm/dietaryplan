export const getPlanData = async (calMin, calMax, calMinBreakfast, calMaxBreakfast, calMinLunch, calMaxLunch, calMinDinner, calMaxDinner, dietH, allergyC) => {
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
            "all": [{ "diet": dietH }, { "health": allergyC }]
          },
          "fit": {
            "ENERC_KCAL": {
              "min": calMin,
              "max": calMax
            }
          },
          "sections": {
            "Breakfast": {
              "accept": {
                "all": [{ "meal": ["breakfast"] }]

              },
              "fit": {
                "ENERC_KCAL": {
                  "min": calMinBreakfast,
                  "max": calMaxBreakfast
                }
              }
            },
            "Lunch": {
              "accept": {
                "all": [{ "meal": ["lunch/dinner"] }]
              },
              "fit": {
                "ENERC_KCAL": {
                  "min": calMinLunch,
                  "max": calMaxLunch
                }
              },

              "exclude": [
                "http://www.edamam.com/ontologies/edamam.owl#recipe_x",
                "http://www.edamam.com/ontologies/edamam.owl#recipe_y",
                "http://www.edamam.com/ontologies/edamam.owl#recipe_z"
              ],

            },
            "Dinner": {
              "accept": {
                "all": [{ "meal": ["lunch/dinner"] }]
              },
              "fit": {
                "ENERC_KCAL": {
                  "min": calMinDinner,
                  "max": calMaxDinner
                }

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
    const mealsRecipeID = data.selection.map(valor => {
      const breakfast = valor.sections.Breakfast.assigned.split("#")[1]
      const lunch = valor.sections.Lunch.assigned.split("#")[1]
      const dinner = valor.sections.Dinner.assigned.split("#")[1]
      return [breakfast, lunch, dinner]
    });
    return mealsRecipeID;
  } catch (error) {
    console.error('Error:', error);
  }
};