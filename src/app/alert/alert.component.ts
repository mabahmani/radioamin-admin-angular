import {Component, OnInit} from '@angular/core';
import {AlertService} from '../service/alert.service';
import {NavigationStart, Router} from '@angular/router';
import {Alert} from '../model/alert';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {

  alerts: Alert[] = [];
  alertSubscription: Subscription | undefined;
  routeSubscription: Subscription | undefined;

  constructor(private router: Router, private alertService: AlertService) {
  }

  ngOnInit(): void {
    this.alertSubscription = this.alertService.onAlert()
      .subscribe(alert => {
        this.alerts.push(alert);
      });

    // clear alerts on location change
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alerts = [];
      }
    });
  }

}
