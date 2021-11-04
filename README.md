# co-media

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
