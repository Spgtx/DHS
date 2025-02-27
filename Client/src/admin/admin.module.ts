import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { SidebarComponent } from './admin-dashboard/sidebar/sidebar.component';
import { HeaderComponent } from './admin-dashboard/header/header.component';
import { DoctorComponent } from './doctor/doctor.component';
import { ViewComponent } from './doctor/view/view.component';
import { AddComponent } from './doctor/add/add.component';
import { PatientComponent } from './patient/patient.component';
import { ViewwComponent } from './patient/view/view.component';
import { AdddComponent } from './patient/add/add.component';
import { FormsModule } from '@angular/forms';
import { DoctorService } from './services/doctor.service';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { CardComponent } from './dashboard-home/card/card.component';
import { UtilsModule } from 'src/utils/utils.module';
import { AppointmentComponent } from './appointment/appointment.component';
import { PatientService } from './services/patient.service';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    SidebarComponent,
    HeaderComponent,
    DoctorComponent,
    PatientComponent,
    ViewComponent,
    AddComponent,
    ViewwComponent,
    AdddComponent,
    DashboardHomeComponent,
    CardComponent,
    AppointmentComponent
  ],
  imports: [CommonModule, AdminRoutingModule, FormsModule,UtilsModule],
  providers: [DoctorService, PatientService],
})
export class AdminModule {}
