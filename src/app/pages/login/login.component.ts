import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from "@angular/router";
import { MatFormField } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatInput, MatInputModule } from '@angular/material/input';

import { HttpService } from '../../shared/services/http.service';

@Component({
  selector: 'app-login',
  imports: [
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatInputModule,
    ReactiveFormsModule,
    MatButton,
    HttpClientModule
  ],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [HttpService]
})
export class LoginComponent {
  formSignIn: FormGroup = new FormGroup({
    email: new FormControl('', [ Validators.required, Validators.email ]),
    password: new FormControl('', [ Validators.required ])
  });
  hide = signal(true);
  errorMessage = signal('');


  constructor(private httpService: HttpService, private router: Router) {}

  updateErrorMessage() {
    const {controls} = this.formSignIn;
    if (controls['email'].hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (controls['email'].hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
    }
  }
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }



  // Вход
  submitLogin(): void {
    const { email, password } = this.formSignIn.value;
    const lgn: any = { email, password };
    this.httpService.loginRequest(lgn).subscribe({
      next:(data: any) => {
        this.router.navigate(["/calendar"]).then();
      },
      error: error => {
        console.log(error)
      }
    });
  }
}
