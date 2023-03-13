type AnyArgsFunction = (...args: any) => void;

interface Action<T> {
  type: string;
  payload: T
}

type SimpleAction = Action<unknown>;

type CreateAction = <T>(type: string, payload: T) => Action<T>

type CreateMessage = <T>(payload: T) => Message<T>

type CreateSimpleAction = (type: string) => SimpleAction

type DedicatedWorker = Worker & (new () => Worker)

type PostMessage<P> = (message: P, transfer?: Transferable[]) => void;

type PostAction<A> = (message: A) => void;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface Message<T = any> {
  data: T
}
