import { Space, Button, Select } from "@arco-design/web-react"
import { useEffect, useState } from "react"
import { ArrayTransformer } from "./components/Searcher"

const App = () => {

  const [but1, sbut1] = useState(0)
  const [but2, sbut2] = useState(0)
  const [but3, sbut3] = useState(0)
  const [but4, sbut4] = useState(0)
  const [but5, sbut5] = useState(0)
  const [but6, sbut6] = useState(0)

  const GetTextFromNumber = (num: number) => {
    return ['光', '暗', '冰', '火', '雷', '风'][num]
  }

  const [phase, sphase] = useState(0)
  const [a, sa] = useState<boolean>(false)

  const [target, starget] = useState(0)
  const [dl, sdl] = useState([0, 0, 0, 0, 0, 0])
  useEffect(() => {
    const searcher = new ArrayTransformer(target)
    if (searcher.isTargetState([but1, but2, but3, but4, but5, but6])) {
      sdl([0, 0, 0, 0, 0, 0])
      return
    }
    sdl([but1, but2, but3, but4, but5, but6].map((v, i) => {
      const ss = [but1, but2, but3, but4, but5, but6].map((v, idx) => {
        if (phase % 2 != 0) {
          if (idx - i == 0) {
            return v + 1
          }
          if (idx - i == 1 || idx - i == -1) {
            return v - 1
          }
          return v
        } else {
          if (idx - i == 0) {
            return v + 1
          }
          return v
        }
      }).map(v => (v + 6) % 6)
      if (searcher.isTargetState(ss)) {
        return 1
      }
      const path = searcher.findShortestPath(ss, phase + 1)
      if (path) {
        return path.steps + 1
      } else {
        return 999
      }
    }))
  }, [phase, but1, but2, but3, but4, but5, but6, target])

  useEffect(() => {
    console.log(dl)
  }, [dl])

  const [sb, ssb] = useState<boolean>(true)

  return <>
    <div style={{ marginLeft: '40px', marginTop: '20px' }}>
      顺位为 光、暗、冰、火、雷、风
    </div>
    <Space style={{ marginLeft: '20px', marginTop: '20px' }} >
      <Button style={{ width: '60px' }} onClick={() => {
        sbut1((but1 + 1) % 6)
        if (phase % 2 != 0) {
          sbut2((but2 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but1)}
        {sb && dl[0]}
      </Button>
      <Button style={{ width: '60px' }} onClick={() => {
        sbut2((but2 + 1) % 6)
        if (phase % 2 != 0) {
          sbut1((but1 - 1 + 6) % 6)
          sbut3((but3 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but2)}
        {sb && dl[1]}
      </Button>
      <Button style={{ width: '60px' }} onClick={() => {
        sbut3((but3 + 1) % 6)
        if (phase % 2 != 0) {
          sbut2((but2 - 1 + 6) % 6)
          sbut4((but4 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but3)}
        {sb && dl[2]}
      </Button>
      <Button style={{ width: '60px' }} onClick={() => {
        sbut4((but4 + 1) % 6)
        if (phase % 2 != 0) {
          sbut3((but3 - 1 + 6) % 6)
          sbut5((but5 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but4)}
        {sb && dl[3]}
      </Button>
      <Button style={{ width: '60px' }} onClick={() => {
        sbut5((but5 + 1) % 6)
        if (phase % 2 != 0) {
          sbut4((but4 - 1 + 6) % 6)
          sbut6((but6 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but5)}
        {sb && dl[4]}
      </Button>
      <Button style={{ width: '60px' }} onClick={() => {
        sbut6((but6 + 1) % 6)
        if (phase % 2 != 0) {
          sbut5((but5 - 1 + 6) % 6)
        }

        if (a) {
          sphase(phase + 1)
        }
      }} >
        {GetTextFromNumber(but6)}
        {sb && dl[5]}
      </Button>

      <div>
        目标元素:
      </div>
      <Select placeholder="选择" onChange={v => {
        starget(v)
      }}
        style={{ width: '80px' }}>
        <Select.Option value={0}>光</Select.Option>
        <Select.Option value={1}>暗</Select.Option>
        <Select.Option value={2}>冰</Select.Option>
        <Select.Option value={3}>火</Select.Option>
        <Select.Option value={4}>雷</Select.Option>
        <Select.Option value={5}>风</Select.Option>
        <Select.Option value={6}>混沌</Select.Option>6
      </Select>
    </Space>
    <Space style={{ marginTop: '20px' }} >
      <div style={{ marginLeft: '40px' }}>
        调和次数:
        {
          phase
        }
      </div>
      <Button.Group >
        <Button onClick={() => {
          sphase(0)

          sbut1(0)
          sbut2(0)
          sbut3(0)
          sbut4(0)
          sbut5(0)
          sbut6(0)

          sa(false)
        }} >
          重置
        </Button>
        <Button onClick={() => {
          sphase(1)
          sa(true)
        }} >
          开始调和
        </Button>
        <Button onClick={() => {
          sbut1(Math.floor(Math.random() * 6))
          sbut2(Math.floor(Math.random() * 6))
          sbut3(Math.floor(Math.random() * 6))
          sbut4(Math.floor(Math.random() * 6))
          sbut5(Math.floor(Math.random() * 6))
          sbut6(Math.floor(Math.random() * 6))

          sphase(1)
          sa(true)
        }} >
          随机开始
        </Button>
        <Button onClick={() => {
          ssb(!sb)
        }} >
          {sb ? '关闭步数' : '开启步数'}
        </Button>
      </Button.Group>
    </Space>
  </>
}

export default App