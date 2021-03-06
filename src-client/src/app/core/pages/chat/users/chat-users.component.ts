import {
  Component,
  OnInit,
  Input,
  HostBinding,
  OnDestroy,
  OnChanges,
} from '@angular/core';
import { SubSink } from 'subsink';

import { NavbarUserControlSerivce } from 'app/core/components/navbar/navbar-user-control.service';
import { SettingsModel } from 'app/shared/services/settings/settings.model';
import { UserForBox } from 'app/shared/models/user-for-box.model';

@Component({
  selector: '#chat-users',
  templateUrl: './chat-users.component.html',
  styleUrls: ['chat-users.component.scss'],
})
export class ChatUsersComponent implements OnInit, OnDestroy, OnChanges {
  @Input() settings: SettingsModel;
  @Input() chatUsers: UserForBox[];

  private subs = new SubSink();

  constructor(private navbarUserControlSerivce: NavbarUserControlSerivce) {}

  public set isUsersHidden(value: boolean) {
    this._isUsersHidden = value;
    this._slideIn = !value && this.settings.isOnTablet;
    // if (this._slideIn) {
    //   setTimeout(() => {
    //     this._slideIn = false;
    //   }, 2000);
    // }
  }
  public get isUsersHidden(): boolean {
    return this._isUsersHidden;
  }

  @HostBinding('class.is-users-on-tablet')
  _isUserOnTablet: boolean;
  @HostBinding('class.is-one-fifth')
  _isOneFifth: boolean;
  @HostBinding('class.is-hidden')
  _isUsersHidden: boolean;
  @HostBinding('class.animate__slideInRight')
  @HostBinding('class.animate__animated')
  _slideIn: boolean;
  ngOnInit() {
    this.subscribeToUserButton();
    this.viewSettings();
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  ngOnChanges(changes) {
    this.viewSettings();
  }

  hideUsersBar() {
    this.navbarUserControlSerivce.changeUserTabStatus(true);
  }

  private viewSettings() {
    this._isUserOnTablet = this.settings.isOnTablet;
    this._isOneFifth = !this.settings.isOnTablet;
    this.isUsersHidden = this.settings.isOnTablet;
  }

  private subscribeToUserButton() {
    this.subs.sink = this.navbarUserControlSerivce.userTabDisabled$.subscribe(
      (isUserTabDisabled) => {
        if (this.isUsersHidden !== isUserTabDisabled) {
          this.isUsersHidden = isUserTabDisabled;
        }
      }
    );
  }
}
