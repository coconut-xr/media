import {
    ExtendedMediaDeviceInfo,
    StreamType,
    useMediaDevices,
    useSelectDefaultMediaDevice,
    useStreamType,
} from "co-media"
import { Error, Mic, MicOff, ScreenShare, StopScreenShare, Videocam, VideocamOff } from "@material-ui/icons"
import React, { useLayoutEffect, useRef, useState } from "react"
import { MediaDeviceButton } from "./media-device-button"

export function MediaDevices(): JSX.Element {
    const devices = useMediaDevices()

    const audioInput = useSelectDefaultMediaDevice("audioinput", devices)
    const videoInput = useSelectDefaultMediaDevice("videoinput", devices)
    const screenCapture = useSelectDefaultMediaDevice("screencapture", devices)

    const [audioStream, setAudioStream] = useState<MediaStream | undefined>(undefined)
    const [videoStream, setVideoStream] = useState<MediaStream | undefined>(undefined)
    const [screenStream, setScreenStream] = useState<MediaStream | undefined>(undefined)

    return (
        <div className="d-flex flex-column flex-grow-1">
            <div className="d-flex flex-column flex-grow-1 justify-content-center">
                {audioStream && <Stream stream={audioStream} />}
                {videoStream && <Stream stream={videoStream} />}
                {screenStream && <Stream stream={screenStream} />}
            </div>
            <div className="d-flex flex-row align-items-center justify-content-center">
                <MediaDevicesControl
                    audioInput={audioInput}
                    videoInput={videoInput}
                    screenCapture={screenCapture}
                    setAudioStream={setAudioStream}
                    setVideoStream={setVideoStream}
                    setScreenStream={setScreenStream}
                />
            </div>
        </div>
    )
}

export function MediaDevicesControl({
    audioInput,
    screenCapture,
    setAudioStream,
    setScreenStream,
    setVideoStream,
    videoInput,
}: {
    audioInput: ExtendedMediaDeviceInfo | undefined
    videoInput: ExtendedMediaDeviceInfo | undefined
    screenCapture: ExtendedMediaDeviceInfo | undefined
    setAudioStream: (stream: MediaStream | undefined) => void
    setVideoStream: (stream: MediaStream | undefined) => void
    setScreenStream: (stream: MediaStream | undefined) => void
}): JSX.Element {
    return (
        <div className="d-flex flex-row align-items-center m-3 px-2 bg-dark rounded-pill">
            {audioInput && (
                <MediaDeviceButton
                    fontSize="large"
                    className="m-3 pointer"
                    htmlColor="#fff"
                    width={300}
                    height={300}
                    OffIcon={MicOff}
                    OnIcon={Mic}
                    device={audioInput}
                    setStream={setAudioStream}
                />
            )}

            {videoInput && (
                <MediaDeviceButton
                    fontSize="large"
                    className="m-3 pointer"
                    htmlColor="#fff"
                    width={300}
                    height={300}
                    OffIcon={VideocamOff}
                    OnIcon={Videocam}
                    device={videoInput}
                    setStream={setVideoStream}
                />
            )}

            {screenCapture && (
                <MediaDeviceButton
                    fontSize="large"
                    className="m-3 pointer"
                    htmlColor="#fff"
                    width={300}
                    height={300}
                    OffIcon={StopScreenShare}
                    OnIcon={ScreenShare}
                    device={screenCapture}
                    setStream={setScreenStream}
                />
            )}
        </div>
    )
}

export function Stream({ stream }: { stream: MediaStream }): JSX.Element {
    const type = useStreamType(stream)
    const ref = useRef<HTMLVideoElement | null>(null)
    useLayoutEffect(() => {
        if (ref.current != null) {
            ref.current.srcObject = stream
            ref.current.play()
        }
    }, [stream])
    switch (type) {
        case StreamType.AUDIO:
            return <audio ref={ref} />
        case StreamType.VIDEO:
            return <video playsInline className="flex-grow-1 flex-basis-0" ref={ref} />
        default:
            ref.current = null
            return <Error />
    }
}
