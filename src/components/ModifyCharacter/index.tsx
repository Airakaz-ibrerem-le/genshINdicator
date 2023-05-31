import styled from 'styled-components'

import Button from '../Button'
import { ModifyCharacterProps } from './ModifyCharacter.types'
import { useState } from 'react'
import { Character, Skill, SkillType } from '@/queries/Characters/Characters.types'
import { Weapon } from '@/queries/Weapons/Weapons.types'
import { useModifyOwnedChar } from '@/queries/Characters'

const Container = styled.div`
  display: flex;
  gap: 15px;
  font-size: 16px;
  width: 100%;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.white};
  flex-direction: column;
`

const InputContainer = styled.div`
  display: flex;
  font-size: 20px;
  width: 100%;
  flex-direction: column;
`

const InlineBox = styled.div`
  display: grid;
  grid-template-columns: 1.2fr .8fr .3fr .8fr;
  grid-column-gap: 0px;
  row-gap: 30px;
  grid-row-gap: 30px;
  justify-items: center;
  align-items: center;
`

const ConfirmButton = styled(Button)`
  width: 50%;
  background: ${({ theme }) => theme.confirmGreen};
  padding: 10px 0;
`

const StyledInput = styled.input`
  width: 100%;
`

const ModifyCharacter = ({ onClose, character }: ModifyCharacterProps): JSX.Element => {
  const [modifications, setModifications] = useState<Character>(character)
  const { mutateAsync } = useModifyOwnedChar()
  const modifyField = (key: keyof Character, val: string | Skill[] | Weapon, toInt = true) => {
    if (toInt) {
      setModifications({ ...modifications, [key]: Number(val) })
    }
    else {
      setModifications({ ...modifications, [key]: val })
    }
  }

  const modifySkill = (type: SkillType, key: keyof Skill, val: string) => {
    modifications.skill[type] = { ...modifications.skill[type], [key]: Number(val) }
    console.log(modifications.skill[type])
    modifyField('skill', modifications.skill, false)
  }

  const modifyWeapon = (key: keyof Weapon, val: string) => {
    if (modifications.weapon === undefined) {
      return
    }
    modifyField('weapon', { ...modifications.weapon, [key]: Number(val) }, false)
  }

  const onConfirm = async (): Promise<void> => {
    console.log(modifications)
    await mutateAsync(modifications)
    onClose()
  }
  return (
    <Container>
      <InputContainer>
        <InlineBox>
          <span>Level : </span>
          <StyledInput type='number' max={90} defaultValue={character.level} onChange={(e) => modifyField('level', e.target.value)} />
          <span> -&gt; </span>
          <StyledInput type='number' max={90} defaultValue={character.wanted} onChange={(e) => modifyField('wanted', e.target.value)}/>
        </InlineBox>
        <InlineBox>
          <span>Auto : </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[0].level} onChange={(e) => modifySkill(SkillType.AUTO, 'level', e.target.value)}/>
          <span> -&gt; </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[0].wanted} onChange={(e) => modifySkill(SkillType.AUTO, 'wanted', e.target.value)}/>
        </InlineBox>
        <InlineBox>
          <span>Elemental : </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[1].level} onChange={(e) => modifySkill(SkillType.ELEMENTAL, 'level', e.target.value)}/>
          <span> -&gt; </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[1].wanted} onChange={(e) => modifySkill(SkillType.ELEMENTAL, 'wanted', e.target.value)}/>
        </InlineBox>
        <InlineBox>
          <span>Burst: </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[2].level} onChange={(e) => modifySkill(SkillType.BURST, 'level', e.target.value)}/>
          <span> -&gt; </span>
          <StyledInput type='number' max={10} defaultValue={character.skill[2].wanted} onChange={(e) => modifySkill(SkillType.BURST, 'wanted', e.target.value)}/>
        </InlineBox>
        {character.weapon !== undefined
          ? (
            <InlineBox>
              <span>Weapon : </span>
              <StyledInput type='number' max={90} defaultValue={character.weapon.level} onChange={(e) => modifyWeapon('level', e.target.value)}/>
              <span> -&gt; </span>
              <StyledInput type='number' max={90} defaultValue={character.weapon.wanted} onChange={(e) => modifyWeapon('wanted', e.target.value)}/>
            </InlineBox>
          )
          : <></>}
      </InputContainer>
      <ConfirmButton onClick={async () => await onConfirm()}>Confirm</ConfirmButton>
    </Container>
  )
}

export default ModifyCharacter
