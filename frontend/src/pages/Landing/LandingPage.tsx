import { useState } from 'react'
import { LabelColorsType } from '@/assets/styles/colorThemes'
import ListBox, {renderSpan} from "@/components/common/ListBox"
import ColorSelectButton from '@/components/color/ColorSelectButton'
import CreateLabel from '@/components/label/CreateLabel'

function LandingPage() {
  const [selected, setSelected] = useState('a')
  const [color, setColor] = useState<LabelColorsType>('labelRed')
  const list = ['a','b','c','d','e']
  return (
    <>
    <div>LandingPage</div>
    <ListBox list={renderSpan(list)} topList={<CreateLabel color={color} setColor={setColor} />} selected={selected} setSelected={setSelected} />
    <div className='flex justify-center'>
    <ColorSelectButton color={color} setColor={setColor}/>
    </div>
    </>
  )
}

export default LandingPage