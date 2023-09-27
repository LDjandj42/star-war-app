import { Component, forwardRef, OnInit, Input, ChangeDetectorRef, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { StarwarsService } from '../starwars.service';
import { Species } from '../interface';
import { Observable, take } from 'rxjs';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CustomInputComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class CustomInputComponent implements ControlValueAccessor, OnInit {
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

  speciesList$: Observable<Species[]>;
  

  speciesNameCtrl:FormControl<string> = new FormControl<string>('');

  constructor(private starwarsService: StarwarsService, private changeDetectorRef: ChangeDetectorRef) { }


  ngOnInit(): void{
    this.speciesList$ = this.starwarsService.getSpeciesList()
  }

  writeValue(value: string){
    this.speciesList$.pipe(
      take(1),

    ).subscribe(() => this.speciesNameCtrl.setValue(value));
    
  }

  onChange = (speciesName: string): void => {};

  onTouched = (): void => {};

  registerOnChange(onChange: () => void): void {
    this.onChange = onChange;
    this.speciesNameCtrl.valueChanges.subscribe((speciesName: string) =>{
      this.onChange(speciesName);
    });
  }

  registerOnTouched(onTouched: () => void): void {
    this.onTouched = onTouched;
  }

  onOpenedChange(): void {
    console.log("test");
    this.onTouched();
    if (!this.touched) {
      this.touch.emit();
    }
    this.changeDetectorRef.markForCheck();
  }

  public markAsTouched(): void {
    if (!this.touched) {
      this.onTouched();
      this.speciesNameCtrl.markAsTouched();
      this.changeDetectorRef.markForCheck();
    }
  }
  
}