import { useEffect, useState } from "react";

export enum StreamType {
  VIDEO,
  AUDIO,
  NONE,
}

export function getStreamType(stream: MediaStream): StreamType {
  return stream.getVideoTracks().length > 0
    ? StreamType.VIDEO
    : stream.getAudioTracks().length > 0
    ? StreamType.AUDIO
    : StreamType.NONE;
}

export function useStreamType(stream: MediaStream): StreamType {
  const [streamType, setStreamType] = useState<StreamType>(() => getStreamType(stream));
  useEffect(() => {
    const listener = () => setStreamType(getStreamType(stream));
    stream.addEventListener("addtrack", listener);
    stream.addEventListener("removetrack", listener);
    listener();
    return () => {
      stream.removeEventListener("addtrack", listener);
      stream.removeEventListener("removetrack", listener);
    };
  }, [stream, setStreamType]);
  return streamType;
}

export function closeStream(stream: MediaStream): void {
  stream.getTracks().forEach((track) => {
    if (track.readyState == "live") {
      track.stop();
    }
  });
}

export function useStreamActive(stream: MediaStream): boolean {
  const [active, setActive] = useState(() => stream.active);
  useEffect(() => {
    const listener = () => setActive(stream.active);
    stream.addEventListener("active", listener);
    stream.addEventListener("inactive", listener);
  }, [stream]);
  return active;
}
