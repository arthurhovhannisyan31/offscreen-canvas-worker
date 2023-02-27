# Offscreen canvas with worker

### This applications does data fetching and processing in the background with submission of final result to main app.

## Setup for development

After cloning the project run following command `git config core.hooksPath .git-hooks` to enable git hooks.

## Description

### Application architecture
![img.png](docs/image/application-architecture.png)

### Absolut path resolution

Please keep in mind that workers are loaded as separate modules and absolut path resolution is not supported.
All relevant path imports will be added to module bundle. 
Please check source files in preview mode.

This approach might be useful for apps with complex data processing whether it long arrays or complex object merging.
Using processing of data in the background it is possible to save main application as interactive and responsive as possible.

The idea and implementation should stay simple

application should have only 2 canvases for the main page

main worker is responsible for hosting other workers

data-fetch-worker responsible for fetching and storing data

image-process-worker responsible for image drawing and processing

structure:

| main-app  | main-worker          |
|-----------|----------------------|
|           | data-fetch-worker    |
|           | image-process-worker |


Step 1 build canvas and workers 
Step 2 use transferable objects to pass data between threads.

## Used tech stack:
- Web Workers
- SharedArrayBuffer
- OffscreenCanvas
- RequestAnimationFrame
