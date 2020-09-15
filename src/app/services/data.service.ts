import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  planetUrl = 'https://findfalcone.herokuapp.com/planets';
  vehicleUrl = 'https://findfalcone.herokuapp.com/vehicles';
  getPlanets(): any{
    return this.http.get(this.planetUrl);
  }
  getVehicles(): any{
    return this.http.get(this.vehicleUrl);
  }
  getIndex(item: string, data: any[]): number {
    let i: any;
    // tslint:disable-next-line: forin
    for (i in data) {
        // tslint:disable-next-line: triple-equals
        if (data[i].name == item) {
          return i;
        }
    }
    return -1;
  }
  getSpeed(planet: string, vehicle: string, planets: any[], vehicles: any[]): number{
    let pIdx: number;
    let vIdx: number;
    pIdx = this.getIndex(planet, planets);
    vIdx = this.getIndex(vehicle, vehicles);
    if (planets[pIdx].distance > vehicles[vIdx].max_distance){
      return -1;
    }
    else {
      return (planets[pIdx].distance / vehicles[vIdx].speed);
    }
  }
  getUpdatedList(vehicles: any, selectedVehicle: string): any {
    const newVehicleList = vehicles.map(
      (vehicle) => {
        if (vehicle.name === selectedVehicle.split('_')[1]){
          if (vehicle.total_no > 0) {
            vehicle.total_no--;
          }
        }
        // else if (selectedVehicle.split('_')[2] !== '' && vehicle.name === selectedVehicle.split('_')[2]){
        //     vehicle.total_no++;
        // }
        return vehicle;
      }
    );
    return newVehicleList;
  }
  constructor(private http: HttpClient) { }
}
