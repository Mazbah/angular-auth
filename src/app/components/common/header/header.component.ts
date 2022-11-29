import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../authentication/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Account } from '../../authentication/models/account.model';
import { ApplicationConstants } from 'src/app/core/application.constants';
import { environment } from 'src/environments/environment';
// import { CourseService } from '../../course/course.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  user : Account | null | undefined;
  userInfo : any = [];
  isAuthenticated: boolean = false;
  profilePic !: string;
  BASE_URL = environment.baseUrl;

  constructor(
    private auth: AuthService,
    // private courseService: CourseService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.getAuthenticationDetails();
    // this.courseService.getUserInfo(this.user?.user.userId).subscribe(res => {
    //   this.userInfo = res.body.result;
    // })
  }

  getAuthenticationDetails(): void {
    this.user = this.auth.userValue;
    if (this.user) {
      this.isAuthenticated = true;
    }
  }

  getImagePath(): any{
    return this.user?.user.profilePic;
  }

  setImagePath(link: any): any{
    if(this.userInfo.profilePic === null){
      console.log('null');
      return '../../../assets/image/user-icon.svg'
    }
    else {
      return this.BASE_URL + link;
    }
  }

  logOut(){
    let request = {
      userId: this.user?.user.userId
    }
    // this.auth.logout(ApplicationConstants.FRONTEND, request);
  }
}
