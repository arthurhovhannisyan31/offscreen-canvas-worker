interface Action<T> {
  type: string;
  payload: T
}

type CreateAction = <T,>(type: string, payload: T) => Action<T>

interface BoxedType<T> {
  data: T
}
