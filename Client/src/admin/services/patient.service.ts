import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BlockchainService } from 'src/services/blockchain.service';
import { IpfsService } from 'src/services/ipfs.service';
import Web3 from "web3";

const Contract = require("../../../build/contracts/Contract.json");

@Injectable({
  providedIn: 'root',
})
export class PatientService {
  API = "http://localhost:8000/api/patient/"

  web3: any;
  abi: any = {};
  netWorkData: any = {};
  netId: any;
  contract: any;
  account: any;
  address: any;

  ipfs: any;

  msg_text: string = "";

  result: any;

  Patients: any;

  PatientDetails: string[] =[];

  ptInfoload: boolean = false;

  addprogress:boolean = false;
  added:boolean = false
  failed:boolean = false

  constructor(
    private blockchainService: BlockchainService,
    private ipfsService: IpfsService,
    private http: HttpClient
  ) {


    this.web3 = blockchainService.getWeb3();

    this.contract = blockchainService.getContract();
    
    this.web3.eth.getAccounts((err: any, accs: any) => {
      this.account = accs[0];
    });

    this.web3.eth.net.getId().then((r: number) => {
      this.netId = r;
      this.abi = Contract.abi;
      this.netWorkData = Contract.networks[this.netId];

      console.log(this.netWorkData);

      if (this.netWorkData) {
        this.address = this.netWorkData.address;
        this.contract = this.web3.eth.Contract(this.abi, this.address);

        console.log(this.contract.methods.getAdmin.call());
        this.Patients = this.contract.methods.getAllDrs
          .call()
          .then((docs: string[]) => {
            this.Patients = docs;
            console.log(this.Patients);
          });
        console.log("Patients", this.Patients);
      } else {
        console.log("Contract not Deployed");
      }
    });

    //IPFS
    this.ipfs = ipfsService.getIPFS();
  }


  async addPatient(pat_id: any, data: any) {
    console.log("adding Patient");
    this.contract = this.blockchainService.getContract()

    this.ipfs.addJSON(data).then((IPFSHash: any) => {
      console.log("IPFS hash : ",IPFSHash);
      this.contract.methods
        .addPatInfo(pat_id, IPFSHash)
        .send({ from: this.account })
        .on("confirmation",(result: any) => {
          console.log("result",result);
          if(result){
            this.addprogress = true
            this.added = true
          }
        })
        .catch((err: any) => {
          console.log("error",err);
          this.addprogress = true
          this.added = false
          this.failed = true
        });
    });
  }



  getAcccount() {
    console.log('geting Account...');
    let getacc = setInterval(() => {
      this.account = this.blockchainService.getAccount();
      if (this.account != null) {
        clearInterval(getacc);
        return this.account;
      }
    }, 1000);
  }

  deletePatient(id: any, patID: any): Promise<any> {
    console.log(id);
    
    return new Promise((resolve, reject) => {
      this.http.delete(this.API + patID + "/").subscribe((res: any) => {
        console.log(res);
        if (res.data) {
          this.contract.methods
            .delPatient(patID)
            .send({ from: this.account })
            .on("confirmation", (r: any) => {
              this.http.delete(this.API + patID + "/").subscribe((res: any) => {
                if (res.data) {
                  resolve(true);
                }
              });
            });
        } else {
          reject(false);
        }
      });
    });
  }

  getPatientDetails() {
    return this.http.get(this.API);
  }

}

  
