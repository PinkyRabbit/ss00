import {
  Component,
  OnInit,
  Input,
  HostBinding,
  HostListener,
  Output,
  EventEmitter,
} from '@angular/core';
import { Router } from '@angular/router';

import { UserModel } from 'app/shared/models/user.model';
import { UsernameToMessageService } from 'app/shared/services/username-to-message.service';

@Component({
  selector: 'span[user-in-message]',
  template: `{{ user.username }}{{ withComma ? ', ' : '' }}`,
  styleUrls: ['user-in-message.component.scss'],
})
export class UserInMessageComponent implements OnInit {
  @Input() user: UserModel;
  @Input() withComma = false;

  constructor(
    private router: Router,
    private usernameToMessageService: UsernameToMessageService
  ) {}

  @HostBinding('style.color') color: string;
  @HostBinding('class.font-1') isFont1: boolean;
  @HostBinding('class.font-2') isFont2: boolean;
  @HostBinding('class.font-3') isFont3: boolean;
  @HostBinding('class.font-4') isFont4: boolean;
  @HostBinding('class.font-5') isFont5: boolean;
  @HostBinding('class.font-6') isFont6: boolean;
  @HostBinding('class.font-7') isFont7: boolean;
  @HostBinding('class.font-8') isFont8: boolean;

  @HostListener('click', ['$event']) click = this.onClick;
  @HostListener('contextmenu', ['$event']) rightClick = this.onRightClick;
  // @HostListener('mouseover') onMouseOver() {
  //   this.ChangeBgColor('red');
  // }
  // @HostListener('click') onClick() {
  //   window.alert('Host Element Clicked');
  // }
  // @HostListener('mouseleave') onMouseLeave() {
  //   this.ChangeBgColor('black');
  // }
  // @HostListener('dblclick') onDoubleClick(event) {
  // .. do double click logic, just like binding (dbclick) to an element
  // }
  // https://github.com/angular/components/issues/5007#issuecomment-315645280

  ngOnInit() {
    this.color = this.pickHlsColor(this.user.nameColor);
    for (let i = 1; i < 9; i += 1) {
      const propname = `isFont{i}`;
      this[propname] = this.pickFont(i);
    }
  }

  pickFont(type): boolean {
    return this.user.nameFont === `font-${type}`;
  }

  pickHlsColor(value) {
    const n = value.split(',');
    return `hsl(${n[0]}, ${n[1]}%, ${n[2]}%)`;
  }

  onClick(e) {
    this.usernameToMessageService.selectUsername(this.user.username);
  }

  onRightClick(e) {
    e.preventDefault();
    alert(`onRightClick ${this.user.username}`);
  }
}
