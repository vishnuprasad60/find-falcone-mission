import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatSelect} from '@angular/material/select';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit{
  @Output() eventEmitter = new EventEmitter();
  myControl = new FormControl();
  @Input() data: any;
  @Input() id: string;
  selectedValue: string;
  matSelect: MatSelect;
  constructor() {
  }
  onSelect(dest: any): void {
    this.selectedValue = this.id + '_' + dest;
    this.eventEmitter.emit(this.selectedValue);
  }
  // tslint:disable-next-line: typedef
  ngOnInit() {
  }
}