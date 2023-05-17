import { configureStore, combineReducers, compose, applyMiddleware } from "@reduxjs/toolkit";
// import videoReducer from './videoSlice';
import { persistStore, persistReducer, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER, FLUSH } from 'redux-persist';
import storage from "redux-persist/lib/storage";
import { userReducer } from "./userReducer";
import thunk from "redux-thunk";

  const persistConfig = {
    key: 'root',
    version: 1,
    storage,
  }

  const rootReducer = combineReducers({
          user: userReducer
  }); 

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (thunk) => thunk({
      serializableCheck: {
        ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
  }, compose(applyMiddleware(thunk)));

  export const persistor = persistStore(store);

