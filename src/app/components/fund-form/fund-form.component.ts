import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Utility } from 'src/app/utilities/utility';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-fund-form',
  templateUrl: './fund-form.component.html',
  styleUrls: ['./fund-form.component.css']
})
export class FundFormComponent {

  fundForm!: FormGroup;
  startDate = Utility.stockStartDate;
  today = Utility.today;
  formFieldWidth = Utility.formFieldWidth;
  isLoading = false;

  constructor(private formBuilder: FormBuilder, private dataTransferService: DataTransferService, private snackbarService: SnackbarService, public modal: DynamicDialogRef) {
  }

  ngOnInit() {
    this.fundForm = this.formBuilder.group({
      transactionDate: ['', Validators.required],
      creditedAmount: [0],
      debitedAmount: [0]
    });
  }

  onFormSubmit() {
    if (this.fundForm.valid && (this.fundForm.value.creditedAmount + this.fundForm.value.debitedAmount != 0)) {
      this.isLoading = true;
      this.fundForm.patchValue({ transactionDate: Utility.formatDate(this.fundForm.value.transactionDate) });
      this.dataTransferService.addFund(this.fundForm.value).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackbarService.openSnackBar('success', 'Fund added sucessfully');
          this.modal.close();
        },
        error: () => {
          this.isLoading = false;
          this.snackbarService.openSnackBar('error', 'Fund not added');
          this.modal.close();
        }
      });
    }
    else {
      this.snackbarService.openSnackBar('warn', 'Enter all the fields correctly');
    }
  }

  closeModal() {
    this.modal.close();
    this.snackbarService.openSnackBar('warn', 'Last transaction cancelled');
  }

}
