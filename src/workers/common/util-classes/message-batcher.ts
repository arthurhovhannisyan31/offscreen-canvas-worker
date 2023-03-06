export class MessageBatcher {
  messagesList: Message[] = [];
  timeoutID?: ReturnType<typeof setTimeout>;

  constructor(protected interval = 50) {}

  batchMessage(message: Message, cb: AnyArgsFunction): void {
    this.messagesList.push(message);
    if (!this.timeoutID){
      this.timeoutID = setTimeout(() => {
        this.postBatchedMessages(cb);
        this.timeoutID = undefined;
      }, this.interval);
    }
  }

  postBatchedMessages(cb: AnyArgsFunction): void{
    const messages = this.messagesList.slice();
    this.messagesList = [];
    messages.forEach(cb);
  }
}
