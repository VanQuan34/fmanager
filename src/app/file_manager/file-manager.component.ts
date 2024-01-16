// login.component.ts
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { ColorEvent } from 'ngx-color';
import { ToastTranslateService } from 'src/app/api/common/toast-translate.service';
import { AddComponentToBodyService } from '../api/common/add-component-to-body.service';
import { TranslateService } from '@ngx-translate/core';
import { MoWbColorComponent } from '../components/color/color.component';
import { Utils } from './utils/utils';
import { CacheKeys } from '../common/define/cache-keys.define';
interface IColorRgb {
  r: number,
  g: number,
  b: number,
  a: any;
}
@Component({
  selector: 'file-manager-components',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss']
})
export class FileManagerComponents implements OnInit {

  isToggle: boolean;
  color: Object;
  hexColor: String;
  rgbaColor: Object;
  colorFont: string;
  isShow: boolean;
  presetColors: any;

  @ViewChild('colorSelect') _colorSelect: ElementRef;

  constructor(
    public _domService: AddComponentToBodyService,
    public _injector: Injector,
    public _toast: ToastTranslateService,
    public _changeDetection: ChangeDetectorRef,
    public _translate: TranslateService,
    public _componentFactoryResolver: ComponentFactoryResolver
    ){}

  ngOnInit(): void {
    const theme = localStorage.getItem(CacheKeys.KEY_THEME);
    let currentTheme = theme && JSON.parse(theme);
    this.colorFont = currentTheme && currentTheme['--pri'] || '#226FF5';
    this.presetColors = ['#D0021B', '#F5A623', '#F8E71C', '#8B572A', '#7ED321', '#417505', '#BD10E0', '#9013FE', '#4A90E2', '#50E3C2', '#B8E986', '#000000', '#4A4A4A', '#9B9B9B', '#FFFFFF']
  }

  ngAfterViewInit(){
    console.log('_colorSelect=', this._colorSelect);
  }

  handleOnClickNav(e: boolean){
    this.isToggle = e;
    console.log('this.isToggle=', this.isToggle);
  }

  handleOnClickOverlay(e: MouseEvent){
    this.isToggle = !this.isToggle;
  }

  handleChange($event: ColorEvent) {
    this.color = $event.color;
    this.hexColor = $event.color.hex;
    this.rgbaColor = $event.color.rgb;
    const rgba: IColorRgb = $event.color.rgb;
    this.colorFont = `rgb(${rgba.r +','+ rgba.g+','+ rgba.b+','+ rgba.a})`;
    console.log('this.rgbaColor=', this.rgbaColor, rgba.r);
  }

  handleOnClickToggleColor(e: MouseEvent){
    this.isShow = !this.isShow;
    const zIndex = 2500;
    const modalRef =  this._componentFactoryResolver.resolveComponentFactory(MoWbColorComponent).create(this._injector);
    modalRef.instance.width = 240;
    modalRef.instance.parentEL = this._colorSelect;

    modalRef.instance.onChangeColor.subscribe((color: any) => { 
      this.colorFont = color;
    });

    modalRef.instance.onAcceptColor.subscribe((color: any) => { 
      this.colorFont = color;
      Utils.buildRootColor(color);
    });

    modalRef.instance.onClose.subscribe((event: any) => { 
      this._domService.removeComponentFromBody(modalRef);
      this._changeDetection.detectChanges();
    });
    
    this._domService.addDomToBody(modalRef);
  }



}
