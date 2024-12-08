import React, { createContext, useReducer, useEffect } from 'react';
import { initialVolunteers } from '../data/volunteers';
import { initialOlderAdult } from '../data/olderAdults';

const initialState = {
  // Determine user type: "olderAdult" or "volunteer"
  // For this demo, assume olderAdult. In a real app, you'd have login.
  userType: 'olderAdult', 
  olderAdult: initialOlderAdult,
  volunteers: initialVolunteers,
  friends: [], // friends are volunteers the older adult added
  calls: [],   // track call history
  // If user is volunteer, we would track their profile and requests similarly.
};

function reducer(state, action) {
  switch (action.type) {
    case 'UPDATE_OLDER_ADULT':
      return { ...state, olderAdult: { ...state.olderAdult, ...action.payload } };
    case 'UPDATE_VOLUNTEER':
      return {
        ...state,
        volunteers: state.volunteers.map(v => v.id === action.payload.id ? { ...v, ...action.payload } : v),
      };
    case 'ADD_FRIEND':
      if (!state.friends.find(f => f.id === action.payload.id)) {
        return { ...state, friends: [...state.friends, action.payload] };
      }
      return state;
    case 'REMOVE_FRIEND':
      return { ...state, friends: state.friends.filter(f => f.id !== action.payload.id) };
    case 'ADD_CALL':
      return { ...state, calls: [...state.calls, action.payload] };
    case 'SET_USER_TYPE':
      return { ...state, userType: action.payload };
    // Persist or load states could be handled here
    default:
      return state;
  }
}

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const localData = localStorage.getItem('appState');
  const parsed = localData ? JSON.parse(localData) : initialState;
  const [state, dispatch] = useReducer(reducer, parsed);

  useEffect(() => {
    localStorage.setItem('appState', JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
