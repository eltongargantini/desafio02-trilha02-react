import { Component, createRef, useEffect, useRef, useState } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input/index';
import { boolean, string } from 'yup';
import { FormHandles } from '@unform/core';
import { useFoods } from '../hooks/useFoods';

interface Food {
  id: number;
  name: string;
  description: string;
  price: string;
  available: boolean;
  image: string;
}

interface ModalEditFoodsProps {
  modalIsOpen: boolean;
  setModalIsOpen: () => void;
  editingFood: Food;
}

export function ModalEditFood ( { modalIsOpen, setModalIsOpen, editingFood } : ModalEditFoodsProps) {    
  const { updateFood } = useFoods();
  const formRef = createRef<FormHandles>();
  
  async function handleSubmit () {
    const food: Food = {
      id: editingFood.id,
      name: String(formRef.current?.getData().name),
      description: String(formRef.current?.getData().description),
      price: String(formRef.current?.getData().price),
      available: Boolean(formRef.current?.getData().available),
      image: String(formRef.current?.getData().image),
    };
        
    updateFood(food);
    setModalIsOpen();
  } 

  /* handleSubmit = async (data) => {
    const { setIsOpen, handleUpdateFood } = this.props;

    handleUpdateFood(data);
    setIsOpen();
  }; */
  
  return (
     <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal> 
  );
}


