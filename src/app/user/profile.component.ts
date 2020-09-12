import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { NotificationService } from '../notification.service';
import { EventService } from '../events';

@Component({
  templateUrl: './profile.component.html',
  styles: [
    `
      em {
        float: right;
        color: #e05c65;
        padding-left: 10px;
      }
      .error input {
        background-color: #e3c3c5;
      }
      .error ::-webkit-input-placeholder {
        color: #999;
      }
      .error::-moz-placeholder {
        color: #999;
      }
      .error:-moz-placeholder {
        color: #999;
      }
      .error:ms-input-placeholder {
        color: #999;
      }
    `,
  ],
})
export class ProfileComponent implements OnInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private eventService: EventService,
    private notifyService: NotificationService
  ) {}
  profileForm: FormGroup;

  ngOnInit() {
    const firstName = new FormControl(this.authService.currentUser.firstName, [
      Validators.required,
      Validators.pattern('[a-zA-Z].*'),
    ]);

    const lastName = new FormControl(
      this.authService.currentUser.lastName,
      Validators.required
    );

    // tslint:disable-next-line: no-unused-expression
    body: new FormControl('', Validators.required),
      (this.profileForm = new FormGroup({
        firstName,
        lastName,
      }));
  }

  cancel() {
    this.router.navigate(['events']);
  }
  saveProfile(formValues) {
    // console.log('Le formulaire est -il valide? ' + this.profileForm.valid);

    if (this.profileForm.valid) {
      this.authService
        .updateCurrentUser(formValues.firstName, formValues.lastName)
        .subscribe(() => {
          this.showToasterSuccess('Profile Saved successfully.');
          this.router.navigate(['events']);
        });
    }
  }

  get f() {
    return this.profileForm.controls;
  }
  submit() {
    console.log(this.profileForm.value);
  }
  showToasterSuccess(eventName) {
    this.notifyService.showSuccess('Exbil.Apps', eventName);
  }
  logout() {
    this.authService.logOut().subscribe(() => {
      this.router.navigate(['/user/login']);
    });
  }
}
