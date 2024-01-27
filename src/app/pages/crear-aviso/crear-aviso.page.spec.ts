import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CrearAvisoPage } from './crear-aviso.page';
import {async} from "rxjs";

describe('CrearAvisoPage', () => {
  let component: CrearAvisoPage;
  let fixture: ComponentFixture<CrearAvisoPage>;

  // @ts-ignore
  beforeEach(async(() => {
    fixture = TestBed.createComponent(CrearAvisoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
