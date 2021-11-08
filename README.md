# co-media

[![Build Status](https://img.shields.io/github/workflow/status/cocoss-org/co-media/Depolyment)](https://github.com/cocoss-org/co-media/actions)&nbsp;
[![Npm package version](https://badgen.net/npm/v/co-media)](https://npmjs.com/package/co-media)&nbsp;
[![GitHub license](https://img.shields.io/github/license/cocoss-org/co-media.svg)](https://github.com/cocoss-org/co-media/blob/master/LICENSE)&nbsp;
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

# [**Examples**](https://cocoss-org.github.io/co-media)

Shows an example implementation of an conference app (not networked) styled with Material Icons and Bootstrap.

![Example](/example.gif)
