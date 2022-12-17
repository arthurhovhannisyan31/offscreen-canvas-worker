interface SimpleAction {
  type: string;
}

interface Action<T> extends SimpleAction{
  payload: T
}

type CreateAction = <T>(type: string, payload: T) => Action<T>

type CreateSimpleAction = (type: string) => SimpleAction<undefined>

type DedicatedWorker = Worker & (new () => Worker)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Message<T = any> {
  data: T
}
