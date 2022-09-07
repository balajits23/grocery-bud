import React, { useEffect, useState } from "react";
import Alert from "./Alert";
import List from "./List";

let getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  let [name, setName] = useState();
  let [list, setList] = useState(getLocalStorage);
  let [isEditing, setIsEditing] = useState(false);
  let [editId, setEditId] = useState(null);
  let [alert, setAlert] = useState({ show: false, type: "", msg: "" });

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      setList(
        list.map((item) => {
          if (editId === item.id) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setIsEditing(false);
      setEditId(null);
      showAlert(true, "success", "value changed");
    } else {
      showAlert(true, "success", "item added to the list");
      let newItems = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItems]);
      setName("");
    }
  };

  let showAlert = (show = false, type = "", msg = "") => {
    setAlert({ show, type, msg });
  };

  let handleClear = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  let editItem = (id) => {
    let specificItem = list.find((item) => item.id == id);
    setIsEditing(true);
    setEditId(id);
    setName(specificItem.title);
  };

  let removeItems = (id) => {
    let removeItem = list.filter((item) => item.id != id);
    setList(removeItem);
    showAlert(true, "danger", "item is removed");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <section className="section-center">
      <form className="grocery-form" onSubmit={handleSubmit}>
        {alert.show && <Alert {...alert} removeAlert={showAlert} />}
        <h3>grocery bud</h3>
        <div className="form-control">
          <input
            type="text"
            className="grocery"
            onChange={(e) => setName(e.target.value)}
            value={name}
            placeholder="e.g eggs"
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>
      {list.length > 0 && (
        <div className="grocery-container">
          <List items={list} removeItems={removeItems} editItem={editItem} />
          <button className="clear-btn" onClick={handleClear}>
            clear all
          </button>
        </div>
      )}
    </section>
  );
};

export default App;
