import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  currentUser: {},
  userToken: null,
  tasks: [],
  setCurrentUser: () => {},
  setUserToken: () => {},
});

const tmpTasks = [
  {
    "id":1,
    "title":"Prueba",
    "description":"Prueba",
    "deadline":"2024-07-25",
    "status":"Pendiente",
    "priority":"",
    "assigned_to":""
  },
  {
    "id":2,
    "title":"Prueba",
    "description":"Prueba",
    "deadline":"2024-07-25",
    "status":"Pendiente",
    "priority":"",
    "assigned_to":""
  },
  {
    "id":3,
    "title":"Prueba",
    "description":"Prueba",
    "deadline":"2024-07-25",
    "status":"Pendiente",
    "priority":"",
    "assigned_to":""
  }
]

export const ContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [userToken, _setUserToken] = useState(localStorage.getItem('TOKEN') || '');
  const [tasks, setTasks] = useState(tmpTasks);

  const setUserToken = (token) => {
    if(token) {
      localStorage.setItem('TOKEN', token)
    } else {
      localStorage.removeItem('TOKEN')
    }
    _setUserToken(token)
  }

  return (
    <StateContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        userToken,
        setUserToken,
        tasks
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
