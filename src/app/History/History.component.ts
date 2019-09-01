/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { HistoryService } from './History.service';
import 'rxjs/add/operator/toPromise';

@Component({
  selector: 'app-history',
  templateUrl: './History.component.html',
  styleUrls: ['./History.component.css'],
  providers: [HistoryService]
})
export class HistoryComponent implements OnInit {

  myForm: FormGroup;

  private allParticipants;
  private participant;
  private currentId;
  private errorMessage;

  email = new FormControl('', Validators.required);
  name = new FormControl('', Validators.required);
  address = new FormControl('', Validators.required);
  city = new FormControl('', Validators.required);
  postalCode = new FormControl('', Validators.required);
  country = new FormControl('', Validators.required);
  referencePerson = new FormControl('', Validators.required);


  constructor(public serviceHistory: HistoryService, fb: FormBuilder) {
    this.myForm = fb.group({
      email: this.email,
      name: this.name,
      address: this.address,
      city: this.city,
      postalCode: this.postalCode,
      country: this.country,
      referencePerson: this.referencePerson
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    const tempList = [];
    return this.serviceHistory.getAll()
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      result.forEach(participant => {
        tempList.push(participant);
      });
      this.allParticipants = tempList;
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
        this.errorMessage = error;
      }
    });
  }

	/**
   * Event handler for changing the checked state of a checkbox (handles array enumeration values)
   * @param {String} name - the name of the participant field to update
   * @param {any} value - the enumeration value for which to toggle the checked state
   */
  changeArrayValue(name: string, value: any): void {
    const index = this[name].value.indexOf(value);
    if (index === -1) {
      this[name].value.push(value);
    } else {
      this[name].value.splice(index, 1);
    }
  }

	/**
	 * Checkbox helper, determining whether an enumeration value should be selected or not (for array enumeration values
   * only). This is used for checkboxes in the participant updateDialog.
   * @param {String} name - the name of the participant field to check
   * @param {any} value - the enumeration value to check for
   * @return {Boolean} whether the specified participant field contains the provided value
   */
  hasArrayValue(name: string, value: any): boolean {
    return this[name].value.indexOf(value) !== -1;
  }
  
  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceHistory.getparticipant(id)
    .toPromise()
    .then((result) => {
      this.errorMessage = null;
      const formObject = {
        'email': null,
        'name': null,
        'address': null,
        'city': null,
        'postalCode': null,
        'country': null,
        'referencePerson': null
      };

      if (result.email) {
        formObject.email = result.email;
      } else {
        formObject.email = null;
      }

      if (result.name) {
        formObject.name = result.name;
      } else {
        formObject.name = null;
      }

      if (result.address) {
        formObject.address = result.address;
      } else {
        formObject.address = null;
      }

      if (result.city) {
        formObject.city = result.city;
      } else {
        formObject.city = null;
      }

      if (result.postalCode) {
        formObject.postalCode = result.postalCode;
      } else {
        formObject.postalCode = null;
      }

      if (result.country) {
        formObject.country = result.country;
      } else {
        formObject.country = null;
      }

      if (result.referencePerson) {
        formObject.referencePerson = result.referencePerson;
      } else {
        formObject.referencePerson = null;
      }

      this.myForm.setValue(formObject);
    })
    .catch((error) => {
      if (error === 'Server error') {
        this.errorMessage = 'Could not connect to REST server. Please check your configuration details';
      } else if (error === '404 - Not Found') {
        this.errorMessage = '404 - Could not find API route. Please check your available APIs.';
      } else {
        this.errorMessage = error;
      }
    });

  }

  resetForm(): void {
    this.myForm.setValue({
      'email': null,
      'name': null,
      'address': null,
      'city': null,
      'postalCode': null,
      'country': null,
      'referencePerson': null
    });
  }
}
