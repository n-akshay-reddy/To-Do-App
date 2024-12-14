import React, { useState } from "react";

function App() {
  const [inputText, setInputText] = useState("");
  const [items, setItems] = useState([]);
  const [undoItem, setUndoItem] = useState(null);

  function handleChange(event) {
    const newValue = event.target.value;
    setInputText(newValue);
  }

  function addItem() {
    if (inputText.trim() === "") return;
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), text: inputText, completed: false },
    ]);
    setInputText("");
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addItem();
    }
  }

  function toggleComplete(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  }

  function deleteItem(id) {
    const deletedItem = items.find((item) => item.id === id);
    setUndoItem(deletedItem);
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));

    setTimeout(() => {
      setUndoItem(null);
    }, 4000);
  }

  function undoDelete() {
    if (undoItem) {
      setItems((prevItems) => [...prevItems, undoItem]);
      setUndoItem(null);
    }
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          type="text"
          value={inputText}
        />
        <button onClick={addItem}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {items.map((todoItem) => (
            <li
              key={todoItem.id}
              style={{
                textDecoration: todoItem.completed ? "line-through" : "none",
                cursor: "pointer",
              }}
              onClick={() => toggleComplete(todoItem.id)}
            >
              {todoItem.text}
              <button
                style={{ marginLeft: "10px" }}
                onClick={(e) => {
                  e.stopPropagation(); // Prevents toggling when clicking delete
                  deleteItem(todoItem.id);
                }}
              >
                &#x2716;
              </button>
            </li>
          ))}
        </ul>
      </div>
      {undoItem && (
        <button className="undo-button" onClick={undoDelete}>
          Undo
        </button>
      )}
    </div>
  );
}

export default App;
