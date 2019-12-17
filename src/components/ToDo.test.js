import React from 'react';
import { mount, shallow } from 'enzyme';
import ToDo from './ToDo';

describe('<ToDo/>', () => {
  const wrapper = mount(<ToDo />);

  it('Renders without crashing', () => {
    expect(wrapper.length).toEqual(1);
  });

  describe('The default UI', () => {
    it('Renders two default todo items', () => {
      expect(wrapper.find('.ToDoItem').length).toBe(2);
    });

    it('Has an input field', () => {
      expect(wrapper.find("[data-testid='ToDoInput']").length).toEqual(1);
      // expect(wrapper.find(".ToDoInput").length).toEqual(1);
    });

    it('Has an add button', () => {
      expect(wrapper.find('.ToDo-Add').length).toEqual(1);
    });
  });

  describe('Adding items', () => {
    afterAll(() => {
      wrapper.find('.ToDoItem-Delete').simulate('click');
    });

    window.alert = jest.fn();
    it('When the add button is pressed, if the input field is empty, prevent item from being added', () => {
      wrapper.find('.ToDo-Add').simulate('click');
      expect(wrapper.find('.ToDoItem').length).toBe(2);
    });

    it('When the add button is pressed, if the input field is empty, prevent item from being added', () => {
      wrapper.find('.ToDo-Add').simulate('click');
      expect(window.alert).toHaveBeenCalled();
    });

    it('When the add button is pressed, if the input field has text, it creates a new todo item', () => {
      const event = { target: { value: 'Create more tests' } };
      wrapper.find('input').simulate('change', event);
      wrapper.find('.ToDo-Add').simulate('click');

      expect(
        wrapper
          .find('.ToDoItem-Text')
          .at(2)
          .text(),
      ).toEqual('Create more tests');
    });
  });

  describe('Deleting items', () => {
    it('When the delete button is pressed for the first todo item, it removes the entire item', () => {
      wrapper
        .find('.ToDoItem-Delete')
        .first()
        .simulate('click');

      expect(wrapper.find('.ToDoItem').length).toBe(2);
    });
    it('means that because the first toDoItem was deleted, the first toDoItem should now be buy milk', () => {
      expect(
        wrapper
          .find('.ToDoItem-Text')
          .first()
          .text(),
      ).toEqual('buy milk');
    });
  });
});
