import { Component, OnInit, Input } from '@angular/core';
import {ResultService} from '../../services/result.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  tokenResponse: any;
  resultResponse: string;
  planetSpotted: string;
  @Input() selectedVehicles: string[];
  @Input() selectedPlanets: string[];
  constructor(private resultService: ResultService, private toastr: ToastrService) {
  }
  retry(): void{
    window.location.reload();
  }
  ngOnInit(): void {
    this.resultService.getToken().subscribe(
      (response: any) => {
        this.tokenResponse = response.token;
        this.resultService.getResult(this.tokenResponse, this.selectedPlanets, this.selectedVehicles).subscribe(
          (responseFinal: any) => {
            if (responseFinal.planet_name){
              this.resultResponse = 'Mission Success !!';
              this.planetSpotted = responseFinal.planet_name;
              this.toastr.success('Success');
            }
            else {
              this.resultResponse = 'Mission Failed !';
              this.toastr.error('Failed');
            }
          },
          (err: any) => {
            this.toastr.error(err.error.error);
            this.resultResponse = 'Error!';
          }
        );
      }
    );
  }
}
