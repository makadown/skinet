import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-test-error',
  templateUrl: './test-error.component.html',
  styleUrls: ['./test-error.component.scss']
})
export class TestErrorComponent implements OnInit {

  baseUrl = environment.apiUrl;
  validationErrors: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {}

  get404Error(): void {
    this.validationErrors = [];
    this.http.get(this.baseUrl + 'products/32000')
      .subscribe( console.log, console.log );
  }

  get500Error(): void {
    this.validationErrors = [];
    this.http.get(this.baseUrl + 'buggy/servererror')
      .subscribe( console.log, console.log );
  }

  get400Error(): void {
    this.validationErrors = [];
    this.http.get(this.baseUrl + 'buggy/badrequest')
      .subscribe( console.log, console.log );
  }

  get400ValidationError(): void {
    this.validationErrors = [];
    this.http.get(this.baseUrl + 'products/forty-two')
      .subscribe( console.log, error => {
        console.log(error);
        this.validationErrors = error;
      });
  }
}
