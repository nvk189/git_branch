import { Routes } from '@angular/router';
import { EmpoloyeeComponent } from './Components/empoloyee/empoloyee.component';

export const routes: Routes = [
    {
        path:"",component:EmpoloyeeComponent
    },
    {
        path:"employee",component:EmpoloyeeComponent
    }
];
