import React, { FunctionComponent, useEffect } from 'react';
import { TodoList } from './TodoList';
import { LoadTodoList, TodoNotificationSaga } from '../../../../application';
import { useCommand, useSaga } from '../../../core/react-clean-use-case/useCases';

export const HomePage: FunctionComponent = () => {
  useSaga(TodoNotificationSaga);
  const loadTodoList = useCommand(LoadTodoList);

  useEffect(() => {
    loadTodoList.execute();
  }, []);

  return (
    <div>
      <div className="mb-4">
        <a href="#about">About</a>
      </div>
      <TodoList />
    </div>
  );
};
