// // Consolidate state logic with a reducer 
// // https://react.dev/learn/extracting-state-logic-into-a-reducer#consolidate-state-logic-with-a-reducer

// // import { useState } from 'react';
// // import AddTask from './AddTask.js';
// // import TaskList from './TaskList.js';

// // export default function TaskApp() {
// //   const [tasks, setTasks] = useState(initialTasks);

// //   function handleAddTask(text) {
// //     setTasks([
// //       ...tasks,
// //       {
// //         id: nextId++,
// //         text: text,
// //         done: false,
// //       },
// //     ]);
// //   }

// //   function handleChangeTask(task) {
// //     setTasks(
// //       tasks.map((t) => {
// //         if (t.id === task.id) {
// //           return task;
// //         } else {
// //           return t;
// //         }
// //       })
// //     );
// //   }

// //   function handleDeleteTask(taskId) {
// //     setTasks(tasks.filter((t) => t.id !== taskId));
// //   }

// //   return (
// //     <>
// //       <h1>Prague itinerary</h1>
// //       <AddTask onAddTask={handleAddTask} />
// //       <TaskList
// //         tasks={tasks}
// //         onChangeTask={handleChangeTask}
// //         onDeleteTask={handleDeleteTask}
// //       />
// //     </>
// //   );
// // }

// // let nextId = 3;
// // const initialTasks = [
// //   {id: 0, text: 'Visit Kafka Museum', done: true},
// //   {id: 1, text: 'Watch a puppet show', done: false},
// //   {id: 2, text: 'Lennon Wall pic', done: false},
// // ];


// import { useReducer } from 'react';
// import AddTask from './AddTask.js';
// import TaskList from './TaskList.js';

// export default function TaskApp() {
//   const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

//   function handleAddTask(text) {
//     dispatch({
//       type: 'added',
//       id: nextId++,
//       text: text,
//     });
//   }

//   function handleChangeTask(task) {
//     dispatch({
//       type: 'changed',
//       task: task,
//     });
//   }

//   function handleDeleteTask(taskId) {
//     dispatch({
//       type: 'deleted',
//       id: taskId,
//     });
//   }

//   return (
//     <>
//       <h1>Prague itinerary</h1>
//       <AddTask onAddTask={handleAddTask} />
//       <TaskList
//         tasks={tasks}
//         onChangeTask={handleChangeTask}
//         onDeleteTask={handleDeleteTask}
//       />
//     </>
//   );
// }

// function tasksReducer(tasks, action) {
//   switch (action.type) {
//     case 'added': {
//       return [
//         ...tasks,
//         {
//           id: action.id,
//           text: action.text,
//           done: false,
//         },
//       ];
//     }
//     case 'changed': {
//       return tasks.map((t) => {
//         if (t.id === action.task.id) {
//           return action.task;
//         } else {
//           return t;
//         }
//       });
//     }
//     case 'deleted': {
//       return tasks.filter((t) => t.id !== action.id);
//     }
//     default: {
//       throw Error('Unknown action: ' + action.type);
//     }
//   }
// }

// let nextId = 3;
// const initialTasks = [
//   {id: 0, text: 'Visit Kafka Museum', done: true},
//   {id: 1, text: 'Watch a puppet show', done: false},
//   {id: 2, text: 'Lennon Wall pic', done: false},
// ];


// Writing concise reducers with Immer 
// https://react.dev/learn/extracting-state-logic-into-a-reducer#writing-concise-reducers-with-immer

import { useImmerReducer } from 'use-immer';
import AddTask from './AddTask.js';
import TaskList from './TaskList.js';

function tasksReducer(draft, action) {
  switch (action.type) {
    case 'added': {
      draft.push({
        id: action.id,
        text: action.text,
        done: false,
      });
      break;
    }
    case 'changed': {
      const index = draft.findIndex((t) => t.id === action.task.id);
      draft[index] = action.task;
      break;
    }
    case 'deleted': {
      return draft.filter((t) => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function TaskApp() {
  const [tasks, dispatch] = useImmerReducer(tasksReducer, initialTasks);

  function handleAddTask(text) {
    dispatch({
      type: 'added',
      id: nextId++,
      text: text,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId,
    });
  }

  return (
    <>
      <h1>Prague itinerary</h1>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
    </>
  );
}

let nextId = 3;
const initialTasks = [
  {id: 0, text: 'Visit Kafka Museum', done: true},
  {id: 1, text: 'Watch a puppet show', done: false},
  {id: 2, text: 'Lennon Wall pic', done: false},
];
