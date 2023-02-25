export const createSimpleAction: CreateSimpleAction = (type) => ({
  type,
  payload: undefined
});

export const createAction: CreateAction = (type, payload) => ({
  type,
  payload
});
