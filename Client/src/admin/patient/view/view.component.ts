import { Component, OnInit } from "@angular/core";
import { PatientService } from "src/admin/services/patient.service";

@Component({
  selector: "patient-view",
  templateUrl: "./view.component.html",
  styleUrls: ["./view.component.sass"],
})
export class ViewwComponent implements OnInit {
  model: any = {
    acID: "",
  };

  Patients: string[] = [];

  Patient: any = {
    PatID: "",
    fName: "First Name",
    lName: "Last Name",
    phone: "123456789",
    city: "city",
    state: "state",
    image: "",
  };

  PatientDetails: any = [this.Patient];

  loaded: boolean = false;
  loadComplete: boolean = false;

  showProgressCard: boolean = false;
  showProgressWarn: boolean = false;
  progressMsg: string = "";

  showCard: any;
  showWarn: any;
  showSuccess: any;
  progressTxt: any;
  buttonTxt: any;
  patId: any;
  patAdrr: any;

  constructor(private patientService: PatientService) {
    this.progressMsg = "Loading Patient Accounts From Blockchain";

    this.PatientDetails = patientService.PatientDetails;
  }

  ngOnInit(): void {
    this.getPatients()
  }

  loadDrDetails() {
    this.getPatients();
  }

  getPatients() {
    this.showProgressCard = true;
    this.showProgressWarn = false;
    this.progressMsg = "Loading....";

    this.PatientDetails = [];
    this.Patient = this.patientService.Patients;
    // this.progressMsg = 'Found ' + this.Patients.length + ' Accounts';
    this.patientService.getPatientDetails().subscribe((data: any) => {
      console.log(data);
      let Patients = data;
      this.PatientDetails = Patients.data;
      this.showProgressCard = false;
      this.loadComplete = true;
      this.loaded = true;
    });
  }


  onDeletePatient(patId: any, patAdrr: any) {
    this.showCard = true;
    this.showWarn = true;
    this.progressTxt =
      "Are you sure you want to delete the Patient from the Network.";
    this.buttonTxt = '<i class="fas fa-trash "></i> &nbsp Delete';
    this.patId = patId;
    this.patAdrr = patAdrr
  }

  delete() {
    this.showWarn = false;
    this.progressTxt = "Deleting Patient....";
    this.patientService.deletePatient(this.patId,this.patAdrr).then((data: any) => {
      if (data) {
        this.progressTxt = "Patient Deleted from Network";
        this.showSuccess = true;
        this.getPatients()
      }
    });
  }

  cardClose() {
    this.showCard = false;
    this.showWarn = false;
    this.showSuccess = false;
  }
}
