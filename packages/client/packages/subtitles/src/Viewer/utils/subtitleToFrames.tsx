import React from "react";
import { Frame } from "../types";

const NEWLINE = '\r\n'
const INTERVAL_REGEX = /(\d\d):(\d\d):(\d\d),(\d\d\d) --> (\d\d):(\d\d):(\d\d),(\d\d\d)/

function intervalToTimes(interval: string): { startTime: number, endTime: number } {
    const matches = INTERVAL_REGEX.exec(interval)

    if (!matches) {
        throw new Error(`Incorrect interval: '{interval}'`)
    }

    return {
        startTime: parseInt(matches[4], 10) + parseInt(matches[3], 10) * 1000 + parseInt(matches[2], 10) * 60000 + parseInt(matches[1], 10) * 3600000,
        endTime: parseInt(matches[8], 10) + parseInt(matches[7], 10) * 1000 + parseInt(matches[6], 10) * 60000 + parseInt(matches[5], 10) * 3600000
    }
}

function chunkToFrame(chunk: string): Frame {
    const parts = chunk.split(NEWLINE)

    const {startTime, endTime} = intervalToTimes(parts[1])

    return {
        index: parseInt(parts[0], 10),
        startTime,
        endTime,
        text: parts.slice(2).map((p, i) => <span key={`${i}${p}`}><span dangerouslySetInnerHTML={{ __html: p }}></span><br/></span>)
    }
}

export default function subtitleToFrames(subtitle: string): Frame[] {
    return subtitle.split(`${NEWLINE}${NEWLINE}`).filter(c => !!c).map(chunkToFrame)
}