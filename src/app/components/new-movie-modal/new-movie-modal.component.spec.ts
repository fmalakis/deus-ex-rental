import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NewMovieModalComponent } from './new-movie-modal.component';
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

describe('NewMovieModalComponent', () => {
    let component: NewMovieModalComponent;
    let fixture: ComponentFixture<NewMovieModalComponent>;
    let dialogRef: MatDialogRef<NewMovieModalComponent>;
    let fb: FormBuilder;

    const mockDialogRef = {
        close: jasmine.createSpy('close')
    };

    const mockData = {
        categories: ['Action', 'Comedy', 'Drama']
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ ReactiveFormsModule, NewMovieModalComponent ],
            providers: [
                { provide: MatDialogRef, useValue: mockDialogRef },
                { provide: MAT_DIALOG_DATA, useValue: mockData },
                FormBuilder
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NewMovieModalComponent);
        component = fixture.componentInstance;
        fb = TestBed.inject(FormBuilder);
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should initialize the form with categories', () => {
        component.ngOnInit();
        expect(component.newMovieForm).toBeDefined();
        expect(component.newMovieForm?.get('title')).toBeDefined();
        expect(component.newMovieForm?.get('duration')).toBeDefined();
        expect(component.newMovieForm?.get('rating')).toBeDefined();
        expect(component.newMovieForm?.get('publicationDate')).toBeDefined();
        expect(component.newMovieForm?.get('description')).toBeDefined();
        
        const categoriesFormGroup = component.newMovieForm?.get('categories') as FormGroup;
        expect(categoriesFormGroup).toBeDefined();
        expect(Object.keys(categoriesFormGroup.controls)).toEqual(mockData.categories);
    });

    it('should close the modal without data when closeMovieModal is called without arguments', () => {
        component.closeMovieModal();
        expect(mockDialogRef.close).toHaveBeenCalledWith(undefined);
    });

    it('should close the modal with data when closeMovieModal is called with arguments', () => {
        const mockNewMovie = { title: 'Test Movie' };
        component.closeMovieModal(mockNewMovie);
        expect(mockDialogRef.close).toHaveBeenCalledWith(mockNewMovie);
    });

    it('should not submit an invalid form', () => {
        component.ngOnInit();
    
        spyOn(component, 'closeMovieModal');
    
        component.submitNewMovie();
    
        expect(component.closeMovieModal).not.toHaveBeenCalled();
    });
    

    it('should submit a valid form and close the modal', () => {
        component.ngOnInit();
        component.newMovieForm?.setValue({
            title: 'Test Movie',
            duration: 120,
            rating: 8,
            publicationDate: 2023,
            description: 'Test Description',
            categories: { 'Action': true, 'Comedy': false, 'Drama': true }
        });
        component.submitNewMovie();
        expect(mockDialogRef.close).toHaveBeenCalledWith({
            title: 'Test Movie',
            duration: 120,
            rating: 8,
            pub_date: 2023,
            description: 'Test Description',
            categories: ['Action', 'Drama']
        });
    });

    it('should mark invalid fields as error on submit', () => {
        component.ngOnInit();
        const titleControl = component.newMovieForm?.get('title');
        titleControl?.setValue('');
        component.submitNewMovie();
        // expect(titleControl?.touched).toBeTruthy();
        expect(titleControl?.errors).toBeTruthy();
    });
});
