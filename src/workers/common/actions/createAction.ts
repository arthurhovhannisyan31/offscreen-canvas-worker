export const createSimpleAction: CreateSimpleAction = (type) => ({
  type,
});

export const createAction: CreateAction = (type, payload) => ({
  type,
  payload
});
