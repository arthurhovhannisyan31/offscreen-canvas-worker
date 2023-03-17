# Offscreen canvas with worker

### Description
This application has split core logic. Main thread is responsible for hosting DOM elements and UI interactions. Worker thread(s) responsible for data fetching, processing and submission to the main thread.

### Application logic and data flow.
Main thread contains DOM element, including canvases, references to which are transferred to worker thread using [transferControlToOffscreen](https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/transferControlToOffscreen).
Worker thread uses `modules` to host several classes, communication between which is provided with message dispatcher.
Worker modules implement logic specific to the unit and can do data fetching, data calculation, data visualization (using reference to canvas) and read/write operations on SharedArrayBuffer.

Also, worker modules are able to submit messages with data to the main thread and provide all observers with updates. 
One example is root store observer, which propagates the message from the worker to all store entries and updates the store values.

### How to use
This app allows browser to print current dom state to screen despite the blocking of main thread, hence you can run heavy task in the main thread and see how canvas data updated from the worker thread.
Please play around with "Start heavy task" button and iterations number input to see the difference.

Also, you can control which module should be running, you can control state of the worker modules with respective buttons: FPS module, Twins module, all modules. 

### Application architecture
![img.png](docs/image/application-architecture.png)

### Preview
Please run `yarn build && yarn preview` to run the app in preview mode.

### Used tech stack:
- TypeScript
- Vite
- React
- MobX
- Jest

### Used browser API:
- Web Workers
- SharedArrayBuffer
- OffscreenCanvas
- RequestAnimationFrame

### Setup for development

Make sure to run `yarn prepare` to enable all git hooks.
Good luck, son!
