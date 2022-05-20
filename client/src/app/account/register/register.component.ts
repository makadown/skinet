import { Component, OnInit } from '@angular/core';
import {
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { of, timer } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  errors: string[] = [];
  today = new Date();

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {
    this.errors = [];
    this.today = new Date();
  }

  ngOnInit(): void {
    this.loadCurrentUser();
  }

  /**
   * Loads current user (if there is an active token).
   * Else, it loads the login form.
   */
  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    if (token) {
      this.accountService.loadCurrentUser(token).subscribe(() => {
        this.router.navigateByUrl('/shop');
      }, console.error);
    } else {
      this.createRegisterForm();
    }
  }

  createRegisterForm() {
    this.registerForm = this.fb.group({
      displayName: [null, [Validators.required]],
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(
            '^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\\]?)$'
          ),
        ],
        [this.validateEmailNotTaken()],
      ],
      password: [null, [Validators.required]],
      // Validators.pattern(`(?=^.{6,10}$)(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\\s).*$`)
    });
  }

  onSubmit() {
    this.errors = [];
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.router.navigateByUrl('/shop');
      },
      (error) => {
        console.error(error);
        if (Array.isArray(error)) {
          this.generateErrorMessages(error);
        }
      }
    );
  }

  private generateErrorMessages(error: any[]) {
    error.forEach((item) => {
      if (typeof item === 'string') {
        this.errors.push(item);
      }
    });
  }

  /**
   * This is going to be put as a third element from the options array when creating the email formControl.
   * Such option is not going to be called as we are typing.
   * This method is going to be called ONLY if synchronous validations have passed.
   * @returns
   */
  validateEmailNotTaken(): AsyncValidatorFn {
    return (control) => {
      return timer(500).pipe(
        switchMap(() => {
          if (!control.value) {
            return of(null);
          }
          return this.accountService.checkEmailExists(control.value).pipe(
            map((res) => {
              return res ? { emailExists: true } : null;
            })
          );
        })
      );
    };
  }
}
