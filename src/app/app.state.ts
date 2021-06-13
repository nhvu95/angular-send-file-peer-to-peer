import { Injectable } from '@angular/core';
import {
  State, Store
} from '@ngxs/store';

interface _AppStateModel {
  screen: 'sender' | 'receiver';

}

export interface AppStateModel extends Partial<_AppStateModel> {}

@State<AppStateModel>({
  name: 'appState',
  defaults: {
  },
})
@Injectable()
export class AppState {
  constructor(private store: Store) {

  }
}
