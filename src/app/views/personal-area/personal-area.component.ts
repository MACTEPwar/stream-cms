import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app-services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss'],
})
export class PersonalAreaComponent implements OnInit {
  userInfo$: Observable<any>;
  constructor(private authService: AuthService) {
    this.userInfo$ = this.authService.currentUser$;
  }

  ngOnInit(): void {}
}
