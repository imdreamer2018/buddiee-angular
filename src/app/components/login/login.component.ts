import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../service/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;
  validateForm!: FormGroup;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private message: NzMessageService,
              private route: ActivatedRoute,
              private router: Router) {
    if (this.authService.currentUserValue()) {
      this.router.navigate(['/']);
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
  }

  submitForm(value: {username: string, password: string, remember: boolean}): void {
    const loginUserDto = {
      username: value.username,
      password: value.password,
      rememberMe: value.remember,
    };
    this.authService.login(loginUserDto)
      .subscribe(
        () => {
          this.message.success('登陆成功！');
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.message.error(error);
        }
      );
  }

}
