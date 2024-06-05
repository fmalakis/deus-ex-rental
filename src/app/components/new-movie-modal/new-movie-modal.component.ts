import { Component, Inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRipple } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { integerValidator } from '../../validators/integer-validator';
import { NgClass } from '@angular/common';
import { atLeastOneCheckboxValidator } from '../../validators/checkbox-group-validator';

@Component({
  selector: 'app-new-movie-modal',
  standalone: true,
  imports: [ReactiveFormsModule, MatRipple, MatDialogModule, NgClass],
  templateUrl: './new-movie-modal.component.html',
  styleUrl: './new-movie-modal.component.scss'
})
export class NewMovieModalComponent {

    newMovieForm: FormGroup | undefined;

    constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any, public dialogRef: MatDialogRef<NewMovieModalComponent>) {}

    ngOnInit():void {

        console.log(this.data)

        const categoryGroup: any = {};
        this.data.categories.forEach((category: string) => {
            categoryGroup[category] = [false]
        });

        this.newMovieForm = this.fb.group({
            title: ['', [Validators.minLength(1), Validators.maxLength(200), Validators.required]],
            duration: ['', [Validators.min(0), Validators.max(32767), integerValidator, Validators.required]],
            rating: ['',[Validators.min(0), Validators.max(10), Validators.required]],
            publicationDate: ['', [Validators.min(0), Validators.max(32767), integerValidator, Validators.required]],
            description: [''],
            categories: this.fb.group(categoryGroup, { validator: atLeastOneCheckboxValidator(1) })
        });
    }

    closeMovieModal(newMovie?: any) {
        this.dialogRef.close(newMovie);
    }

    submitNewMovie() {

        if (!this.newMovieForm?.valid) return;

        const categoriesObj = this.newMovieForm.value
        let movieCategories: string[] = [];
        for (const category in categoriesObj.categories) {
            if (categoriesObj.categories[category]) {
                movieCategories.push(category);
            }
        }

        const newMovieData = {
            categories: movieCategories,
            title: categoriesObj.title,
            pub_date: categoriesObj.publicationDate,
            duration: categoriesObj.duration,
            rating: categoriesObj.rating,
            description: categoriesObj.description
        }

        this.closeMovieModal(newMovieData);
    }

}
