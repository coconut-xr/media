import { useMemo } from "react"
import { suspend } from "suspend-react"

export enum CaptureDeviceType {
    SCREEN,
    VIDEO,
    AUDIO,
}

/**
 * export type ExtendedMediaDeviceInfo =
    | MediaDeviceInfo
    | {
          kind: "screencapture"
          deviceId: "default"
      }
 */

export type ExtendedMediaDeviceInfo = {
    readonly deviceId: string
    readonly groupId?: string
    readonly kind: MediaDeviceKind | "screencapture"
    readonly label?: string
}

export function useSelectDefaultMediaDevice(
    kind: ExtendedMediaDeviceInfo["kind"],
    from: Array<ExtendedMediaDeviceInfo>
): ExtendedMediaDeviceInfo | undefined {
    return useMemo(() => {
        let result: ExtendedMediaDeviceInfo | undefined
        for (const info of from) {
            if (info.kind === kind) {
                if (info.deviceId.toLowerCase().includes("default")) {
                    return info
                } else if (result == null) {
                    result = info
                }
            }
        }
        return result
    }, [from])
}

export function requestMediaDeviceStream(info: ExtendedMediaDeviceInfo): Promise<MediaStream> {
    switch (info.kind) {
        case "audioinput":
            return navigator.mediaDevices.getUserMedia({
                audio: info,
            })
        case "videoinput":
            return navigator.mediaDevices.getUserMedia({
                video: info,
            })
        case "screencapture":
            return navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: false,
            })
    }
    return Promise.reject(`unkown media device kind "${info.kind}"`)
}

export function useMediaDevices(): Array<ExtendedMediaDeviceInfo> {
    /**
     * const externalCaptureDevices =
        "navigator" in globalThis
            ? suspend(navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices), [])
            : []
     */
    const externalCaptureDevices =
        "navigator" in globalThis
            ? suspend(async () => {
                  const devices = await navigator.mediaDevices.enumerateDevices()
                  return devices.map<ExtendedMediaDeviceInfo>((device) => ({
                      deviceId: device.deviceId,
                      kind: device.kind,
                      groupId: device.groupId,
                      label: device.label,
                  }))
              }, [])
            : []

    return useMemo<Array<ExtendedMediaDeviceInfo>>(() => {
        if ("navigator" in globalThis && "getDisplayMedia" in navigator.mediaDevices) {
            return [
                ...externalCaptureDevices,
                {
                    kind: "screencapture",
                    deviceId: "default",
                },
            ]
        } else {
            return externalCaptureDevices
        }
    }, [externalCaptureDevices])
}
