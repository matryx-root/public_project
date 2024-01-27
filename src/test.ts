// This file is required by karma.conf.js and loads recursively all the .spec and framework files
// Este archivo es requerido por karma.conf.js y carga recursivamente todos los archivos .spec y framework.

import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// Primeramente, inicializar el entorno de pruebas de Angular.
getTestBed().initTestEnvironment(
  BrowserDynamicTestingModule,
  platformBrowserDynamicTesting()
);
