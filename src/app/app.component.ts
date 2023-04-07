import { ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import {MediaMatcher} from '@angular/cdk/layout';
import { AuthenticationService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'learningRes_RecMaster';
  userRole: any;
  public collapsed = false;
  //title = 'techqweb';

  blankUrl = '';
	currentUrl: string = '';
	checkoutUrls = ['/'];
  checkoutRegUrls = ['/register'];
  shouldRun = /(^|.)(stackblitz|webcontainer).(io|com)$/.test(window.location.host);

  isExpanded = true;
  state = 'collapsed';

  mobileQuery!: MediaQueryList;
  private _mobileQueryListener!: () => void;
 
  toggleSidenav() {
    this.isExpanded = !this.isExpanded;
    this.collapsed = !this.collapsed
  }

	constructor(private router: Router,changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,private authenticationService: AuthenticationService,) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
		
	}

  ngOnInit() {
    this.userRole = localStorage.getItem('userRole');
    
    // this.router.events.pipe(
    //   filter((e): e is NavigationEnd => e instanceof NavigationEnd),
    //   map(e => {
    //     // e is now NavigationEnd
    //     this.currentUrl = e.url;
    //     setTimeout(callback => {
    //       window.scrollTo(0, 0);
    //     }, 100)
    //   })
    // );

    this.router.events.subscribe(value => {
      this.currentUrl = this.router.url.toString();
      if(value instanceof NavigationEnd){
        this.currentUrl = this.router.url;
        console.log(this.router.url.toString());
      }    
        
      });

    // this.router.events.filter(e => e instanceof NavigationEnd)
		// 	.subscribe((e: NavigationEnd) => {
		// 		this.currentUrl = e.url;
		// 		setTimeout(callback => {
		// 			window.scrollTo(0, 0);
		// 		}, 100)
		// 	});
  }


  isCheckoutRoute() {
		if (!this.currentUrl) {
			return false;
		}
		const index = this.checkoutUrls.indexOf(this.currentUrl);
    const index2 = this.checkoutRegUrls.indexOf(this.currentUrl);
		if ((index >= 0) || (index2 >= 0)) {
			return true;
		} else {
			return false;
		}
	}

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  logOut(){
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
}
