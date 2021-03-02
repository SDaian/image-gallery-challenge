import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'image-gallery-challenge';
  public token: string;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // const token = this.authService.getToken();
    // console.log(token);
    // if(!this.token) {
    //   this.authService.refreshToken().subscribe((response: string) => {
    //     this.authService.setToken(response);
    //   })
    // }
  }
}
