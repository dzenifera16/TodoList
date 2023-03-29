import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //faCirclePlus,
  faCheck,
  faTrash,
  faCircleXmark,
  // faTrashCan,
  //faCircleMinus,
  faTrashCanArrowUp,
  //faFloppyDisk,
  faArrowRotateBack,
  faSquareXmark,
  faPlus
} from "@fortawesome/free-solid-svg-icons";
import {
  faTrashCan,
  faPenToSquare,
  faFloppyDisk,
  faSquare,
  faSquareCheck
} from "@fortawesome/free-regular-svg-icons";

const arrayObjects = [
  {
    id: 1,
    text: "Apliet puķes",
    completed: false,
    deleted: false,
    isEdite: false
  },
  {
    id: 2,
    text: "Notīrīt palodzes",
    completed: false,
    deleted: false,
    isEdite: false
  },
  {
    id: 3,
    text: "Izpildīt mājasdarbus",
    completed: false,
    deleted: false,
    isEdite: false
  },
  {
    id: 4,
    text: "Uzprogrammēt aplikāciju",
    completed: false,
    deleted: false,
    isEdite: false
  }
];

export default function TodoViewComp() {
  const [todoList, setTodoList] = useState(arrayObjects);
  const [viewType, setViewType] = useState(0);
  const [editText, setEditText] = useState("");
  const [InputText, setInputText] = useState("");

  function RemoveAll() {
    setTodoList([]);
  }

  function completeTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: true };
      }

      return todo;
    });

    setTodoList(newTodoList);
  }
  function deleteTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, deleted: true };
      }
      return todo;
    });

    setTodoList(newTodoList);
  }
  function RestoreTodoItem(itemId) {
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, completed: false, deleted: false, isEdite: false };
      }

      return todo;
    });

    setTodoList(newTodoList);
  }
  function RemoveDeleted(itemId) {
    const newTodoList = todoList.filter((todo) => todo.deleted === false);
    setTodoList(newTodoList);
  }
  function RemoveComleted(itemId) {
    const newTodoList = todoList.filter((todo) => todo.completed === false);
    setTodoList(newTodoList);
  }
  function ChangeViewType(viewType) {
    setViewType(viewType);
  }
  let newList = [];

  if (viewType === 0) {
    newList = todoList;
  } else if (viewType === 1) {
    newList = todoList.filter((todo) => todo.deleted === true);
  } else if (viewType === 2) {
    newList = todoList.filter((todo) => todo.completed === true);
  } else if (viewType === 3) {
    newList = todoList.filter(
      (todo) => todo.completed === false && todo.deleted === false
    );
  }

  function editTodoItem(itemId) {
    setEditText("");
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        setEditText(todo.text);
        return { ...todo, isEdite: true };
      } else {
        return { ...todo, isEdite: false };
      }
    });

    setTodoList(newTodoList);
  }
  function SaveTodoItem(itemId) {
    if (editText.length === 0) return;
    const newTodoList = todoList.map((todo) => {
      if (todo.id === itemId) {
        return { ...todo, isEdite: false, text: editText };
      }

      return todo;
    });
    setTodoList(newTodoList);
    setEditText("");
  }
  function getNewId() {
    let maxId = 0;
    todoList.map((item) => {
      if (item.id > maxId) {
        maxId = item.id;
      }
    });
    return maxId + 1;
  }
  function addTodoItem() {
    if (InputText.length === 0) return;
    let todoId = getNewId();

    let newTodoItem = {
      id: todoId,
      text: InputText,
      completed: false,
      deleted: false,
      isEdite: false
    };
    setTodoList([...todoList, newTodoItem]);
    setInputText("");
  }

  return (
    <div>
      <div className="RowStyle">
        <button className="BtnStyle2" onClick={() => ChangeViewType(0)}>
          Attēlot visus
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(1)}>
          Attēlot dzēstos
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(2)}>
          Attēlot pabeigtos
        </button>
        <button className="BtnStyle2" onClick={() => ChangeViewType(3)}>
          Attēlot aktīvos{" "}
        </button>
      </div>
      <div className="RowInputStyle">
        <div className="RowInputStyle1">
          <FontAwesomeIcon className="inputIcon" icon={faPenToSquare} />
          <input
            className="InputText"
            type="text"
            value={InputText}
            placeholder="Pievienot darbiņu"
            onChange={(e) => setInputText(e.target.value)}
          />

          <button className="buttonStyle" onClick={addTodoItem}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="RowInputStyle2">
          <button
            className="buttonStyleLeft"
            onClick={RemoveAll}
            title="Remove all"
          >
            <FontAwesomeIcon icon={faCircleXmark} />
          </button>
          <button
            className="buttonStyleLeft"
            onClick={RemoveDeleted}
            title="Remove deleted"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          <button
            className="buttonStyleLeft"
            onClick={RemoveComleted}
            title="Remove completed"
          >
            <FontAwesomeIcon icon={faTrashCanArrowUp} />
          </button>
        </div>
      </div>
      <div className="RowStyle">
        {newList.map((item) => {
          let spanClassName = "TodoItemText";
          if (item.completed) spanClassName = "TodoItemTextCompleted";
          if (item.deleted) spanClassName = "TodoItemTextDeleted";

          return (
            <div key={item.id} className="RowItemStyle">
              <div>
                {item.completed && <FontAwesomeIcon icon={faSquareCheck} />}
                {item.deleted && <FontAwesomeIcon icon={faSquareXmark} />}
                {!item.completed && !item.deleted && (
                  <FontAwesomeIcon icon={faSquare} />
                )}
              </div>

              <div className="RowItemStyleText">
                {!item.isEdite && (
                  <span className={spanClassName}>{item.text}</span>
                )}
                {item.isEdite && (
                  <input
                    type="text"
                    className="RowItemStyleInput"
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                    autoFocus
                  />
                )}
              </div>

              <div>
                {!item.completed && !item.deleted && !item.isEdite && (
                  <>
                    <button
                      className="todoItemBtn"
                      onClick={() => completeTodoItem(item.id)}
                      title="Completed"
                    >
                      <FontAwesomeIcon icon={faCheck} />
                    </button>
                    <button
                      className="todoItemBtn"
                      onClick={() => deleteTodoItem(item.id)}
                      title="Delete"
                    >
                      <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                    <button
                      className="todoItemBtn"
                      onClick={() => editTodoItem(item.id)}
                      title="Edit"
                    >
                      <FontAwesomeIcon icon={faPenToSquare} />
                    </button>
                  </>
                )}

                {item.isEdite && (
                  <button
                    className="todoItemBtn"
                    onClick={() => SaveTodoItem(item.id)}
                    title="Save"
                  >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                  </button>
                )}
                {(item.completed || item.deleted || item.isEdite) && (
                  <button
                    className="todoItemBtn"
                    onClick={() => RestoreTodoItem(item.id)}
                    title="Restore"
                  >
                    <FontAwesomeIcon icon={faArrowRotateBack} />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
