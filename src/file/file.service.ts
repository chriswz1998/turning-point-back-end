import { BadRequestException, Injectable } from '@nestjs/common'
import { PrismaService } from '@/prisma/prisma.service'
import { UploadFileDto } from './dto/upload-file.dto'
import { FileTypeService } from '@/file-type/file-type.service'
import { RentSupplementRequestService } from '@/rent-supplement/rent-supplement.service'
import {
    FlowThrough,
    GoalsAndProgress,
    IncidentReport,
    Individuals,
    LossOfService,
    OverdoseSafetyPlan,
    RentSupplementRequest,
    SafetyPlan,
    ShelterDiversionLog,
    SiteList
} from '@prisma/client'
import { FlowThroughService } from '@/flow-through/flow-through.service'
import { LossOfServiceService } from '@/loss-of-service/loss-of-service.service'
import { GoalsAndProgressService } from '@/goals-and-progress/goals-and-progress.service'
import { SafetyPlanService } from '@/safety-plan/safety-plan.service'
import { OverdoseSafetyPlanService } from '@/overdose-safety-plan/overdose-safety-plan.service'
import { IncidentReportService } from '@/incident-report/incident-report.service'
import { IndividualsService } from '@/Individuals/Individuals.service'
import { ShelterDiversionLogService } from '@/shelter-diversion-log/shelter-diversion-log.service'
import { IntakeReportService } from '@/intake-report/intake-report.service'
import { CreateIntakeReportDto } from '@/intake-report/dto/create-intake-report.dto'
import { SiteListService } from '@/site-list/site-list.service'

@Injectable()
export class FileService {
    constructor(
        private prisma: PrismaService,
        private fileTypeService: FileTypeService,
        private rentSupplementRequestService: RentSupplementRequestService,
        private flowThroughService: FlowThroughService,
        private lossOfServiceService: LossOfServiceService,
        private goalAndProgressService: GoalsAndProgressService,
        private safetyPlanService: SafetyPlanService,
        private overdoesSafetyPlanService: OverdoseSafetyPlanService,
        private incidentReportService: IncidentReportService,
        private individualsService: IndividualsService,
        private shelterDiversionLogService: ShelterDiversionLogService,
        private intakeReportService: IntakeReportService,
        private siteListService: SiteListService
    ) {}

    async uploadFile(uploadFileDto: UploadFileDto) {
        const { filename, filetype, records } = uploadFileDto
        if (!filename || !filetype || !Array.isArray(records)) {
            throw new BadRequestException('Invalid request format')
        }

        const fileTypeName = await this.fileTypeService.findByName(filetype)

        // 创建 File 记录
        const fileRecord = await this.prisma.file.create({
            data: {
                filename,
                filetypeId: fileTypeName.id
            }
        })

        if (fileTypeName.typename === 'Rent Supplement Request') {
            await this.rentSupplementRequestService.createMany(
                records as RentSupplementRequest[],
                fileRecord.id
            )
            console.log('set data to Rent Supplement Request')
        }
        if (fileTypeName.typename === 'Intake Reporting') {
            await this.intakeReportService.CreateIntakeReport(
                records as CreateIntakeReportDto,
                fileRecord.id
            )
            console.log('set data to Intake Reporting')
        }
        if (fileTypeName.typename === 'Flow Through') {
            await this.flowThroughService.createMany(records as FlowThrough[], fileRecord.id)
            console.log('set data to Flow Through')
        }
        if (fileTypeName.typename === 'Loss of Service') {
            await this.lossOfServiceService.createMany(records as LossOfService[], fileRecord.id)
            console.log('set data to Loss of Service')
        }
        if (fileTypeName.typename === 'Goals and Progress') {
            await this.goalAndProgressService.createMany(
                records as GoalsAndProgress[],
                fileRecord.id
            )
            console.log('set data to Goals and Progress')
        }
        if (fileTypeName.typename === 'Safety Plan') {
            await this.safetyPlanService.createMany(records as SafetyPlan[], fileRecord.id)
            console.log('set data to Safety Plan')
        }
        if (fileTypeName.typename === 'Overdose Safety Plan') {
            await this.overdoesSafetyPlanService.createMany(
                records as OverdoseSafetyPlan[],
                fileRecord.id
            )
            console.log('set data to Overdose Safety Plan')
        }
        if (fileTypeName.typename === 'Incident Report') {
            await this.incidentReportService.createMany(records as IncidentReport[], fileRecord.id)
            console.log('set data to Incident Report')
        }
        if (fileTypeName.typename === 'Individuals') {
            await this.individualsService.createMany(records as Individuals[], fileRecord.id)
            console.log('set data to individuals')
        }
        if (fileTypeName.typename === 'Shelter Diversion Follow-Up Log') {
            await this.shelterDiversionLogService.createMany(
                records as ShelterDiversionLog[],
                fileRecord.id
            )
            console.log('set data to Shelter Diversion Follow-Up Log')
        }
        if (fileTypeName.typename === 'Site List') {
            await this.siteListService.createMany(records as SiteList[], fileRecord.id)
            console.log('set data to Site List')
        }

        return {
            message: 'Upload successful',
            fileId: fileRecord.id
        }
    }

    async RecentlyFiles() {
        try {
            return await this.prisma.file.findMany({
                orderBy: {
                    uploadtime: 'desc'
                },
                take: 5
            })
        } catch (e) {
            console.log(e)
        }
    }

    async FileByPage(page: number = 1, pageSize: number = 10, searchKey = '') {
        const skip = (page - 1) * pageSize
        const take = pageSize

        const lowerSearchKey = searchKey.toLowerCase()

        const where = searchKey
            ? {
                  filename: {
                      contains: lowerSearchKey
                  }
              }
            : {}

        const [data, total] = await this.prisma.$transaction([
            this.prisma.file.findMany({
                skip,
                take,
                where,
                include: {
                    filetype: true
                }
            }),
            this.prisma.file.count({ where })
        ])

        return {
            data,
            pagination: {
                page,
                pageSize,
                total,
                totalPages: Math.ceil(total / pageSize)
            }
        }
    }
}
