import { Routes } from '@angular/router';
import { ServiceSelectionComponent } from './pages/service-selection/service-selection.component';
import { ConfirmationComponent } from './pages/confirmation/confirmation.component';

export const routes: Routes = [
    { path: '', component: ServiceSelectionComponent },
    { path: 'confirmation', component: ConfirmationComponent }
];