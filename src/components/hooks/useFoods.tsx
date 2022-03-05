import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import api from '../../services/api';


interface Food {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string
}

interface FoodsProviderProps {
    children: ReactNode;
}

interface FoodsContextData {
    foods: Food[];
    deleteFood: (idFood: number) => void;
    updateFood: (updateFood: Food) => void;
    addFood: (addFood: Omit<Food, 'id' | 'available'>) => void;
}

const FoodsContext = createContext<FoodsContextData>({} as FoodsContextData);

export function FoodsProvider({ children }: FoodsProviderProps) {
  const [foods, setFoods] = useState<Food[]>([]);

  useEffect(() => {
      api.get('/foods')
          .then(response => setFoods(response.data))
  }, []);

  async function deleteFood(idFood: number) {
      await api.delete(`/foods/${idFood}`);

      const foodsFiltered = foods.filter(food => food.id !== idFood);

      setFoods(foodsFiltered);  
  };


  async function updateFood(updateFood: Food) {        
    const previousFood = foods.find(food => food.id === updateFood.id);    

    try {
      const foodUpdated = await api.put(`/foods/${updateFood.id}`,
        { ...updateFood },
      );
        
      const foodsUpdated = foods.map(f =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
        
      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  };
  
  async function addFood(addFood: Omit<Food, 'id' | 'available'>) {        
    try {
      const response = await api.post('/foods', 
        { ...addFood, available: true },
      );
        
      const foodsUpdated = [...foods, response.data];
        
      setFoods(foodsUpdated);

    } catch (err) {
      console.log(err);
    }
  } ;

    return (
        <FoodsContext.Provider value={{ foods, deleteFood, updateFood, addFood }}>
            {children}
        </FoodsContext.Provider>
    )

}

export function useFoods() {
    const context = useContext(FoodsContext);

    return context;
}