export class MainSW {
  constructor(sw) {
    this.worker = sw;
        this.setup(
          this.onInstall,
          this.onActivate,
          this.onFetch,
          this.onMessage,
        );
  }

  setup(
    installHandler,
    activateHandler,
    fetchHandler,
    messageHandler,
  ) {
    this.worker.oninstall = installHandler;
    this.worker.onactivate = activateHandler;
    this.worker.onfetch = fetchHandler;
    this.worker.onmessage = messageHandler;
  }

  skipWaiting() {
    // Force activation
    return this.worker.skipWaiting();
  }

  claim() {
    // Claim the service work for this client, forcing `controllerchange` event
    return this.worker.clients.claim();
  }
  init = async () => {

  };

  onInstall = (_e) => {
    _e.waitUntil(this.skipWaiting());
    _e.waitUntil(this.init());
  };

  onActivate = (_e) => {
    _e.waitUntil(this.claim());
  };

  getClients = async (senderId = "") => {
    const clients = await this.worker.clients?.matchAll({
      includeUncontrolled: true,
    }) ?? [];

    return clients.filter((client) => client.id !== senderId);
  };

  onFetch = async (
    event,
  ) => {
    console.log({
      event
    });
  };

  async dispose() {
  }

  onMessage = async () => {};
}

new MainSW(self);

export default {};

console.log('hello');
