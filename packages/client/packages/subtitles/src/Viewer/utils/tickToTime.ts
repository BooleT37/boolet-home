export default function tickToTime(tick: number): string {
    const ms = tick % 1000
    tick = Math.trunc(tick / 1000)
    const sec = tick % 60
    tick = Math.trunc(tick / 60)
    const min = tick % 60
    tick = Math.trunc(tick / 60)
    return `${tick.toString().padStart(2, '0')}:${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')},${ms.toString().padEnd(3, '0')}`
}