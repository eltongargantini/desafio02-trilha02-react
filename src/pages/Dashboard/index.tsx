import { Component, useEffect, useState } from 'react';

import { Header } from '../../components/Header';
import api from '../../services/api';
import { Food } from '../../components/Food';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../components/hooks/useFoods';

interface FoodDashboard {
    id: number;
    name: string;
    description: string;
    price: string;
    available: boolean;
    image: string
}

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [editingFood, setEditingFood] = useState<FoodDashboard>();

  const {foods} = useFoods();

  function toggleModal () {
    setModalOpen(!modalOpen)
  }  

  function toggleEditModal () {
    setEditModalOpen(!editModalOpen)
  }

  function handleEditFood(updateFood: FoodDashboard) {
    setEditModalOpen(true);
    setEditingFood(updateFood);    
  } 

    return (
      <>
        <Header openModal={toggleModal} />
        <ModalAddFood
          modalIsOpen={modalOpen}
          setModalIsOpen={toggleModal}
        /> 
        
        <ModalEditFood
          modalIsOpen={editModalOpen}
          setModalIsOpen={toggleEditModal}
          editingFood={editingFood as FoodDashboard}
        /> 

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map(itemFood => (
              <Food key={itemFood.id}
                food={itemFood}
                handleEdit= { handleEditFood } 
              />
            ))}
        </FoodsContainer>
      </>
    );
  }

