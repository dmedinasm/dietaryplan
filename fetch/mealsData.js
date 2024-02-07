export const getMealsData = async (id) => {
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