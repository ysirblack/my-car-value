import {Query, Param, Controller, Post, Get, Patch, Body, UseGuards } from '@nestjs/common';
import { CreateReportDto } from './dtos/create-report.dto';
import { ReportsService } from './reports.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { ReportDto } from './dtos/report.dto';
import { ApproveReportDto } from './dtos/approve-report.dto';
import { AdminGuard } from 'src/guards/admin.guard';
import { GetEstimateDto } from './dtos/get-estimate.dto';


@Controller('reports')
export class ReportsController {

  constructor(private reportsService: ReportsService){}


  @Post()
  @UseGuards(AuthGuard) 
  @Serialize(ReportDto)
  createReport(@Body() body: CreateReportDto, @CurrentUser() user: User){
    return this.reportsService.create(body,user);
  }

  @Get()//when meaking a query, Query decorator gets them as a string! So dto will throw error!
  getEstimate(@Query() query: GetEstimateDto){
    console.log(query);
  }


  @Patch("/:id")
  @UseGuards(AdminGuard)
  approveReport(@Param("id") id: string, @Body() body: ApproveReportDto){
    return this.reportsService.changeApproval(id, body.approved);
  }


}
