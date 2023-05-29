enum SkillType {
  AUTO = 0,
  ELEMENTAL,
  BURST
}

export interface Weapon {
  id: number
  level: number
  wanted: number
  path: string
  name: string
  phase: number
  wantedPhase: number
}

export interface Skill {
  type: SkillType
  level: number
  wanted: number
}

export interface Character {
  id: number
  name: string
  phase: number
  wantedPhase: number
  level: number
  wanted: number
  path: string
  elementPath: string
  skill: Skill[]
  weapon: Weapon
}