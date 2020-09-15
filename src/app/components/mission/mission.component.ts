import { Component, OnInit } from '@angular/core';
import {DataService} from '../../services/data.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.css']
})
export class MissionComponent implements OnInit {
  planets: any[];
  vehicles: any[];
  selectedVehicles: string[];
  selectedPlanets: string[];
  maxCount: any[];
  totalMissions: number;
  speed: number;
  confirm: boolean;
  constructor(private dataService: DataService, private toastr: ToastrService) {
   }
  onSelectPlanet(planet: string): void {
    // tslint:disable-next-line: radix
    const idx: number = parseInt(planet.split('_')[0]);
    this.selectedPlanets.splice(idx, 1, planet.split('_')[1]);
  }
  onSelectVehicle(selectedVehicle: string): void {
    // tslint:disable-next-line: radix
    const idx: number = parseInt(selectedVehicle.split('_')[0]);
    if (this.selectedPlanets[idx]) {
      this.speed = this.getSpeed(this.selectedPlanets[idx], selectedVehicle.split('_')[1]);
      if (this.speed >= 0) {
      this.selectedVehicles.splice(idx, 1, selectedVehicle.split('_')[1]);
      this.vehicles = this.dataService.getUpdatedList(this.vehicles, selectedVehicle);
    }
    else {
      this.toastr.error('This vehicle has shorter range. Choose another!');
    }
  }
  else{
    this.toastr.error('Please select destination first!');
  }
}
getSpeed(planet: string, vehicle: string): number{
    const speed = this.dataService.getSpeed(planet, vehicle, this.planets, this.vehicles);
    return speed;
  }
  findResult(): void {
    this.confirm = true;
  }
  counter(i: number): any {
    return new Array(i);
  }
  resetData(): void {
    window.location.reload();
  }
  ngOnInit(): void {
    this.selectedVehicles = [];
    this.selectedVehicles.fill('', 0, 3);
    this.selectedPlanets = [];
    this.selectedPlanets.fill('', 0, 3);
    this.totalMissions = 4;
    this.speed = 0;
    this.confirm = false;
    this.dataService.getPlanets().subscribe(
      (planet: any[]) => {
        this.planets = planet;
      }
    );
    this.dataService.getVehicles().subscribe(
      (vehicle: any[]) => {
        this.vehicles = vehicle;
      }
    );
  }
}
