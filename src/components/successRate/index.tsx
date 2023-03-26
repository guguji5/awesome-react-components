import React, { useRef, useEffect } from 'react'
interface Props {
  width?: number
  height?: number
  type: 'error' | 'success'
  value: number
}
const colorsMap = {
  error: ['#E62412', '#F07C71'],
  success: ['#65D5B1', '#B1E8D7'],
}
const linesCount = 39
const withBgLinesCount = 20
const getPixelRatio = (context) => {
  const backingStore = context.backingStorePixelRatio || 1
  return (window.devicePixelRatio || 1) / backingStore
}
export default function index(props: Props) {
  const { width = 156, height = 36, type } = props
  let value = props.value
  if (value > 100 || value < 0) {
    value = 0
  }
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const drawLinesCount = Math.floor((value / 100) * linesCount)
    const drawWithBgLinesCount =
      drawLinesCount > 0 ? (drawLinesCount + 1) / 2 : 0
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    const ratio = getPixelRatio(ctx)
    const cwidth = width * ratio
    const cheight = height * ratio
    const lineWidth = cwidth / linesCount
    const lineRoundSize = 3 * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    canvas.width = cwidth
    canvas.height = cheight
    ctx.clearRect(0, 0, cwidth, cheight)
    ctx.save()
    const clg = ctx.createLinearGradient(0, 0, cwidth, 0)
    clg.addColorStop(0, colorsMap[type][0])
    clg.addColorStop(1, colorsMap[type][1])
    ctx.fillStyle = clg
    ctx.rect(0, 0, cwidth, cheight)
    ctx.fill()
    ctx.globalCompositeOperation = 'destination-in'
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = 'black'
    ctx.lineCap = 'round'
    for (let i = 0; i <= drawWithBgLinesCount; i++) {
      const x = i * 2 * lineWidth + lineWidth / 2
      ctx.moveTo(x, 0 + lineRoundSize)
      ctx.lineTo(x, cheight - lineRoundSize)
    }
    ctx.stroke()
    ctx.closePath()
    ctx.restore()
    ctx.beginPath()
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = '#F0F0F0'
    ctx.lineCap = 'round'
    for (let i = drawWithBgLinesCount; i < withBgLinesCount; i++) {
      const x = i * 2 * lineWidth + lineWidth / 2
      ctx.moveTo(x, 0 + lineRoundSize)
      ctx.lineTo(x, cheight - lineRoundSize)
    }
    ctx.stroke()
    ctx.closePath()
  }, [type, value])
  return <canvas ref={canvasRef} />
}
