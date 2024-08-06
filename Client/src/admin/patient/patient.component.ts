import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { localAPI } from 'src/environments/environment';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.sass']
})
export class PatientComponent implements OnInit {
  account: any;
  contract: any;
  patientDetails: any;
  
  ipfs: any;

  constructor(private patientService: PatientService) {}

  async ngOnInit() {
    this.patientDetails = await this.patientService.getPatientDetails();
    // Use patientDetails data here
  }

}
