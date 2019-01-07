import axios from "axios";
import {
  GET_INVENTORY,
  SET_INVENTORY_LOADING,
  GET_ERRORS,
  EQUIP_ITEM,
  GET_CHARACTER,
  SET_CHARACTER_LOADING,
  GET_EQUIPMENT,
} from "./types";

export const getCharacter = () => dispatch => {
  axios.get("/api/characters")
    .then(res => {
      dispatch(setCharacterLoading())
      dispatch({
        type:GET_CHARACTER,
        payload: res.data
      })
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    )
}

export const getEquipment = () => dispatch => {
  axios.get("/api/characters/equipment")
  .then(res => {
    dispatch(setCharacterLoading())
    dispatch({
      type: GET_EQUIPMENT,
      payload: res.data
    })
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: {}
    })
  )
}

export const getInventory = () => dispatch => {
  axios
    .get("/api/characters/inventory")
    .then(res => {
      dispatch(setInventoryLoading());
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      });
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

export const equipItem = itemId => dispatch => {
  axios.put(`/api/characters/equip-item/${itemId}`).then(res => {
    dispatch({
      type: EQUIP_ITEM,
      payload: res.data
    })
    axios.get("/api/characters/equipment")
    .then(res => {
      dispatch(setCharacterLoading())
      dispatch({
        type: GET_EQUIPMENT,
        payload: res.data
      })
    axios.get("/api/characters/inventory").then(res => {
      dispatch(setInventoryLoading());
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      })
    
      }).catch(err =>
        dispatch({
          type: GET_ERRORS,
          payload: {}
        })
      )
    
    })
      
  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    })
  );;
};

export const unequipItem = slot => dispatch => {
  axios.put(`/api/characters/unequip/${slot}`)
    .then(res => {
      if(res.data.inventoryfull){
        dispatch({
          type: GET_ERRORS,
          payload: res.data
        })
      } else {
      axios.get('/api/characters/equipment').then(res =>{
      dispatch(setCharacterLoading())
      dispatch({
        type: GET_EQUIPMENT,
        payload: res.data
      })
    })
      axios.get("/api/characters/inventory").then(res => {
        dispatch(setInventoryLoading());
        dispatch({
          type: GET_INVENTORY,
          payload: res.data
        })
        }).catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: {}
          })
        )
        }
    })
}

export const destroyItem = itemId => dispatch => {
  axios.delete(`/api/characters/destroy-item/${itemId}`).then(res => {
    axios.get("/api/characters/inventory").then(res => {
      dispatch(setInventoryLoading())
      dispatch({
        type: GET_INVENTORY,
        payload: res.data
      })
    })

  }).catch(err =>
    dispatch({
      type: GET_ERRORS,
      payload: {error:"error destroying item"}
    }))
}

export const setInventoryLoading = () => {
  return {
    type: SET_INVENTORY_LOADING
  };
};
export const setCharacterLoading = () => {
  return {
    type: SET_CHARACTER_LOADING
  };
};
