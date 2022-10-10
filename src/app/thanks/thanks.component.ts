import { Component, OnInit } from '@angular/core';

import { ApiService } from '../api.service';
import { Hospital } from '../model/hospital';
import { ActivatedRoute } from '@angular/router';


 

@Component({
  selector: 'app-thanks',
  templateUrl: './thanks.component.html',
  styleUrls: ['./thanks.component.css']
})
export class ThanksComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}