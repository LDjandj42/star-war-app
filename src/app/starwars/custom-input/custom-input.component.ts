import { Component, forwardRef, OnInit,OnDestroy, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, Validators } from '@angular/forms';
import { StarwarsService } from '../starwars.service';
import { Species } from '../interface';
import { Observable, Subject, take, takeUntil } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: CustomInputComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CustomInputComponent implements ControlValueAccessor, OnInit, Validator, OnDestroy {
  @Input() set required(value: boolean | string) {
    const required: boolean = value === false ? false : true;
    if (required) {
      this.speciesNameCtrl.setValidators([Validators.required]);
    } else {
      this.speciesNameCtrl.clearValidators();
    }
    this.changeDetectorRef.markForCheck();
  }

  get required(): boolean {
    return this.speciesNameCtrl.hasValidator(Validators.required);
  }

  @Input() set touched(value: boolean) {
    if (value && this.touched === false) {
      this.markAsTouched();
    }
    this.changeDetectorRef.markForCheck();
  }
  get touched(): boolean {
    return this.speciesNameCtrl.touched;
  }

  get disabled(): boolean {
    return this.speciesNameCtrl.disabled;
  }
  
  @Output()
  touch: EventEmitter<void> = new EventEmitter<void>()
  

  private _onDestroy$ = new Subject<void>();
  speciesList$: Observable<Species[]>;
  

  speciesNameCtrl:FormControl<string> = new FormControl<string>('');

  constructor(private starwarsService: StarwarsService, private changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit(): void{
    this.speciesList$ = this.starwarsService.getSpeciesList()
  }

  ngOnDestroy(): void {
    this._onDestroy$.next();
    this._onDestroy$.complete();
  }

  writeValue(value: string){
    this.speciesList$.pipe(
      take(1)
    ).subscribe(() => this.speciesNameCtrl.setValue(value));
    
  }

  onChange = (speciesName: string): void => {};

  onTouched = (): void => {};

  registerOnChange(onChange: () => void): void {
    this.onChange = onChange;
    this.speciesNameCtrl.valueChanges.pipe(
      takeUntil(this._onDestroy$)
    ).subscribe((speciesName: string) =>{
      this.onChange(speciesName);
    });
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  onOpenedChange(): void {
    this.onTouched();
    if (!this.touched) {
      this.touch.emit();
    }
    this.changeDetectorRef.markForCheck();
  }
  
  validate(control: AbstractControl<any, any>): ValidationErrors {
    return this.speciesNameCtrl.errors;
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.speciesNameCtrl.markAsTouched();
      this.changeDetectorRef.markForCheck();
    }
  }
  
}