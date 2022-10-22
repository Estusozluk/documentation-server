import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  returnUrl: string;

  constructor(private AuthService: AuthService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  async login(username, password) {
    const isUserExists = await this.AuthService.signIn(username, password);

    if (isUserExists) {
      this.router.navigateByUrl(this.returnUrl);
    } else {
      alert("Wrong data provided!");
    }

  }

}
