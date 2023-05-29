import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FormServiceService } from './form-service.service';

import { Form, Field } from './form.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent implements OnInit {
  
  title = 'dynamic-form-app';
  data: any;

  dynamicForm!: FormGroup;
  formFields: any[] = [];

  constructor(
    private dataService: FormServiceService,
    private formBuilder: FormBuilder) {
      
      this.dynamicForm = this.formBuilder.group({});
    }

  ngOnInit() {
    this.dataService.getFormFields().subscribe(fields => {
      this.formFields = fields;
      this.dynamicForm = this.createControl();
    });
  }

  createControl() {
    const group = this.formBuilder.group({});
    this.formFields.sort((a, b) => a.order - b.order);
    this.formFields.forEach(field => {
      const control = this.formBuilder.control(
        field.value, this.bindValidations(field.validations || [])
      );
      group.addControl(field.fieldModel, control);
    });
    return group;
  }

  bindValidations(validations: any[]) {
    if (validations.length > 0) {
      const validList: any[] = [];
      validations.forEach(valid => {
        
        const typeValidation: string = valid.type;

        if (typeValidation === 'required') {
          validList.push(Validators.required);
        } 
        else if (typeValidation === 'min') {
          validList.push(Validators.min(valid.value));
        } 
        else if (typeValidation === 'max') {
          validList.push(Validators.max(valid.value));
        } 
      });
      return Validators.compose(validList);
    }
    return null;
  }

  onSubmit() {
    console.log('Submit test, values');
    console.log(this.dynamicForm.value);
    console.log(this.dynamicForm.controls);
  }
  


  getValidationMessage(field: Field | undefined, validationType: string): string | undefined {
    if (field && field.validations) {
      const validation = field.validations.find(v => v.type === validationType);

      if (validationType === 'min' && validation) {
        return `The minimum value is ${validation.value}`;
      } 
      else if (validationType === 'max' && validation) {
        return `The maxT value is ${validation.value}`;
      } 

      return validation?.message;
    }
    return undefined;
  }
}
