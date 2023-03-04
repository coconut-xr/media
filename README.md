# @coconut-xr/media

[![Build Status](https://img.shields.io/github/workflow/status/coconut-xr/media/Depolyment)](https://github.com/coconut-xr/media/actions)&nbsp;
[![Npm package version](https://badgen.net/npm/v/media)](https://npmjs.com/package/@coconut-xr/media)&nbsp;
[![GitHub license](https://img.shields.io/github/license/coconut-xr/media.svg)](https://github.com/coconut-xr/media/blob/master/LICENSE)&nbsp;
[![Twitter](https://badgen.net/badge/icon/twitter?icon=twitter&label)](https://twitter.com/BelaBohlender)

React library for accessing browser media like camera, microphone, screen capture, etc.

# Functions

```typescript
function closeStream(stream: MediaStream): void
function requestMediaDeviceStream(info: ExtendedMediaDeviceInfo): Promise<MediaStream>
function getStreamType(stream: MediaStream): StreamType

function useStreamType(stream: MediaStream): StreamType
function useStreamActive(stream: MediaStream): boolean

function useSelectDefaultMediaDevice(
    kind: ExtendedMediaDeviceInfo["kind"],
    from: Array<ExtendedMediaDeviceInfo>
): ExtendedMediaDeviceInfo | undefined
function useMediaDevices(): Array<ExtendedMediaDeviceInfo>
```

# [**Examples**](https://coconut-xr.github.io/media)

Shows an example implementation of an conference app (not networked) styled with Material Icons and Bootstrap.

![Example](/example.gif)
