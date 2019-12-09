import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './spinner/spinner.component';

@NgModule({
  imports: [FormsModule, ReactiveFormsModule],
  declarations: [SpinnerComponent],
  exports: [FormsModule, ReactiveFormsModule,  SpinnerComponent],
  providers: []
})
export class SharedModule {}
