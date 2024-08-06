import { Component, OnInit } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';

@Component({
  selector: 'patient-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.sass'],
})
export class AdddComponent implements OnInit {
  model: any = {
    patID: '',
    fName: '',
    lName: '',
    phone: '',
    city: '',
    state: '',
  };

  show: boolean = false;
  msg_text: string = '';
  warn: boolean = false;
  success: boolean = false;

  ipfs: any;

  constructor(private blockchainService: BlockchainService) { }

  ngOnInit(): void {
    this.ipfs = this.blockchainService.ipfs;
  }

  onSubmit() {
    this.show = true;
    this.warn = false
    this.msg_text = 'Adding Patient to the Network...';
    console.log(this.model);
    // this.checkAddProgress()
    if (this.model.patID == '' || this.model.fName == '' || this.model.lName == ''
      || this.model.phone == '' || this.model.city == '' || this.model.state == '') {
      this.msg_text = 'fill all the fields'
      this.warn = true
      return
    }
    if (this.model.patID.length != 42 || !this.model.patID.startsWith('0x')) {
      this.msg_text = 'Please add valid Id';
      this.warn = true;
      return
    }
    this.blockchainService
      .addPatient(this.model.patID, this.model)
      .then((r) => {
        console.log(r);
        this.msg_text = 'Patient Added to the network'
        this.success = true
      })
      .catch((err) => {
        console.log(err);
        this.msg_text = 'Failed to add pateint to network'
        this.warn = true
      });

      let form = new FormData();
      form.append('fName', "" + this.model.fName);
      form.append('lName', "" + this.model.lName);
      form.append('phone', "" + this.model.phone);
      form.append('city', "" + this.model.city);
      form.append('state', "" + this.model.state);
      form.append('patID', "" + this.model.patID);

    this.blockchainService.addPatient(form).then((data: any) => {
      console.log(data);
      if (data.status == 'success') {
        this.msg_text += '<br>User Added to the Blockchain';
        console.log('User added Successfully');
        this.success = true;
        this.model = {};
      } else {
        this.warn = !this.warn;
        this.msg_text =
          'Adding Patient Failed<br> <small class="fw-light text-danger"><b>"</b>' +
          this.model.patID +
          '<b>"</b></small><br>1.not a valid address or <br>2.Already have a role';
      }
    });
  }
    onClose() {
      this.show = false;
      this.warn = false;
    }
  
    async dataURItoBlob(dataURI: any): Promise<any> {
      return new Promise((resolve, reject) => {
        const byteString = window.atob(dataURI.replace(/^[^,]+,/, ''));
        const arrayBuffer = new ArrayBuffer(byteString.length);
        const int8Array = new Uint8Array(arrayBuffer);
        for (let i = 0; i < byteString.length; i++) {
          int8Array[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([int8Array], { type: 'image/png' });
        resolve(blob);
      });
    }
  
}
