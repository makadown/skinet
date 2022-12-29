import { Component, OnInit } from '@angular/core';
import { AccountService } from './account/account.service';
import { BasketService } from './basket/basket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'SkiNet';
  constructor(private basketService: BasketService,
              private accountService: AccountService) {}

  ngOnInit(): void {
    this.loadBasket();
    this.loadCurrentUser();
  }

  private loadBasket() {
    const basketId = localStorage.getItem('basket_id');
    if (basketId) {
      this.basketService.getBasket(basketId).subscribe(() => {
        console.log('initialising basket...');
      }, console.error);
    }
  }

  private loadCurrentUser() {
    const token = localStorage.getItem('token');
    // we send here token even if its null because we need the service to
    // upgrade the current user 'state' even if its null.
    this.accountService.loadCurrentUser(token).subscribe(() => {
        console.log('loading current user...');
      }, console.error);
    
  }
}
