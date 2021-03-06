import { NgModule } from '@angular/core';

import { UsernameToMessageService } from 'app/shared/services/username-to-message.service';

import { ChatSingleMessageComponent } from './chat-single-message.component';
import { UserInMessageComponent } from './user-in-message/user-in-message.component';
import { TextInMessageComponent } from './text-in-message/text-in-message.component';
import { TextNodeComponent } from './text-in-message/text-node';
import { ChunkInMessageDirective } from './text-in-message/chunk-in-message.directive';

const components = [
  ChatSingleMessageComponent,
  UserInMessageComponent,
  TextInMessageComponent,
  TextNodeComponent,
  ChunkInMessageDirective,
];

@NgModule({
  imports: [],
  declarations: [...components],
  providers: [UsernameToMessageService],
  exports: [...components],
})
export class ChatSingleMessageModule {}
