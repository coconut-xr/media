import { SvgIconProps } from "@material-ui/core"
import { SvgIconComponent } from "@material-ui/icons"
import { closeStream, ExtendedMediaDeviceInfo, requestMediaDeviceStream } from "co-media"
import React, { Suspense, useLayoutEffect, useState } from "react"
import { clear, suspend } from "suspend-react"
import ReactLoading from "react-loading"

export function MediaDeviceButton({
    device,
    OffIcon,
    OnIcon,
    setStream,
    ...props
}: {
    setStream: (stream: MediaStream | undefined) => void
    device: ExtendedMediaDeviceInfo
    OnIcon: SvgIconComponent
    OffIcon: SvgIconComponent
} & SvgIconProps): JSX.Element {
    const [open, setOpen] = useState(false)
    if (open) {
        const listener = () => setOpen(false)
        const parameters = [device]
        return (
            <Suspense
                fallback={<ReactLoading className={props.className} width={35} height={35} type="spin" color="#fff" />}>
                <Request
                    request={requestMediaDeviceStream}
                    onResult={(stream, error) => {
                        setStream(stream)
                        if (stream == null) {
                            console.error(error)
                            setOpen(false)
                        } else {
                            stream.addEventListener("inactive", listener)
                        }
                    }}
                    cleanUp={(stream) => {
                        if (stream != null) {
                            closeStream(stream)
                            stream.removeEventListener("inactive", listener)
                        }
                        setStream(undefined)
                    }}
                    parameters={parameters}
                />
                <OffIcon {...props} onClick={() => setOpen(false)} />
            </Suspense>
        )
    } else {
        return <OnIcon {...props} onClick={() => setOpen(true)} />
    }
}

type Await<T> = T extends Promise<infer V> ? V : never

export function Request<Parameters extends Array<any>, Fn extends (...keys: Parameters) => Promise<any>>({
    onResult,
    parameters,
    request,
    cleanUp,
}: {
    parameters: Parameters
    request: Fn
    onResult: (value: Await<ReturnType<Fn>> | undefined, error: any) => void
    cleanUp: (value: Await<ReturnType<Fn>> | undefined, error: any) => void
}): null {
    const [value, error] = suspend(
        () =>
            request(...parameters)
                .then((value) => [value, undefined] as [Await<ReturnType<Fn>> | undefined, any])
                .catch((error) => [undefined, error] as [Await<ReturnType<Fn>> | undefined, any]),
        parameters
    )
    useLayoutEffect(() => {
        onResult(value, error)
        return () => {
            cleanUp(value, error)
            clear(parameters)
        }
    }, parameters)
    return null
}
