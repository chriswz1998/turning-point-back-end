/**
 * `filetype` -> `PrismaService` 方法名映射
 * 解决：Prisma Model 仅是类型，不能作为运行时值的问题
 */
export const FILE_TYPE_MODEL_MAP = {
    'Flow-Through': 'flowThrough',
    'Loss of Service': 'lossOfService',
    'Rent Supplement Request': 'rentSupplementRequest',
    'Goals and Progress': 'goalsAndProgress',
    'Safety Plan': 'safetyPlan',
    'Overdose Safety Plan': 'overdoseSafetyPlan',
    'Incident Report': 'incidentReport',
    Individuals: 'uniqueIndividual',
    uniqueIndividual: 'uniqueIndividual',
    'Shelter Diversion Follow-Up Log': 'shelterDiversionLog'
} as const

/**
 * `filetype` -> `Prisma Model` 类型定义（仅用于类型检查）
 */
export type FileTypeKeys = keyof typeof FILE_TYPE_MODEL_MAP
export type FileTypeValues = (typeof FILE_TYPE_MODEL_MAP)[FileTypeKeys]
