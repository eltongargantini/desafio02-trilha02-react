import { Component, createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';
import { useFoods } from '../hooks/useFoods';

interface Food {
  name: string;
  description: string;
  price: string;
  image: string;
}

interface ModalAddFoodsProps {
  modalIsOpen: boolean;
  setModalIsOpen: () => void;
}

export function ModalAddFood( { modalIsOpen, setModalIsOpen } : ModalAddFoodsProps) {  
  const { addFood } = useFoods();
  const formRef = createRef<FormHandles>();  

  async function handleSubmit() {
    const food: Food = {
      name: String(formRef.current?.getData().name),
      description: String(formRef.current?.getData().description),
      price: String(formRef.current?.getData().price),
      image: String(formRef.current?.getData().image),
    };

    addFood(food);
    setModalIsOpen();
  };

  return (
    <Modal isOpen={modalIsOpen} setIsOpen={setModalIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};


