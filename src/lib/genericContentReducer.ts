
// --- Action Interfaces ---
export interface UpdateContentAction {
  type: 'UPDATE_CONTENT';
  payload: {
    keys: string[];
    value: any;
  };
}

export interface UpdateStyleAction {
  type: 'UPDATE_STYLE';
  payload: {
    key: string;
    value: string;
  };
}

// Esta acción es para reemplazar el estado completo, útil para el modo de edición.
export interface ResetStateAction {
  type: 'RESET_STATE';
  payload: any; // El estado completo de la campaña a cargar
}

export type GenericAction = UpdateContentAction | UpdateStyleAction | ResetStateAction;

// --- Helper Function (Inmutabilidad) ---
const updateNestedState = (state: any, keys: string[], value: any): any => {
  if (keys.length === 0) {
    return value;
  }
  const [firstKey, ...restKeys] = keys;
  const currentState = state || {};
  return {
    ...currentState,
    [firstKey]: updateNestedState(currentState[firstKey], restKeys, value),
  };
};

// --- Reducer Genérico ---
export const genericContentReducer = (state: any, action: GenericAction): any => {
  switch (action.type) {
    case 'RESET_STATE':
      return action.payload;

    case 'UPDATE_CONTENT': {
      const { keys, value } = action.payload;
      return updateNestedState(state, keys, value);
    }

    case 'UPDATE_STYLE': {
      const { key, value } = action.payload;
      return {
        ...state,
        style: {
          ...state.style,
          [key]: value,
        },
      };
    }

    default:
      return state;
  }
};
