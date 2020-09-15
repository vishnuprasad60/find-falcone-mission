import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import {MatRadioGroup} from '@angular/material/radio';


@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  @Output() eventEmitter = new EventEmitter();
  matRadioGroup: MatRadioGroup;
  @Input() vehicles: string[];
  @Input() id: string;
  @Input() speed: number;
  selectedVehicle = '';
  constructor() { }

  ngOnInit(): void {
  }
  radioChange(veh: any): void {
    let prev = '';
    if (document.querySelector('.mat-radio-checked')) {
      prev = document.querySelector('.mat-radio-checked').getAttribute('ng-reflect-value');
    }
    this.selectedVehicle = this.id + '_' + veh.value + '_' + prev;
    this.eventEmitter.emit(this.selectedVehicle);
  }
}
