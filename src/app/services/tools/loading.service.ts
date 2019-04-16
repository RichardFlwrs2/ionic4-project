import { Injectable, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { StorageService } from "../auth/storage.service";
import { Subject } from "rxjs/Subject";

@Injectable()
export class LoadingService implements OnDestroy {
  session = this._sts.loadSessionData();

  // Observer
  public trigger = new Subject<boolean>();
  public state = true;

  // Subscriber
  private loadingSubscriber = this.trigger.subscribe((res: boolean) => (this.state = res));

  constructor(private _sts: StorageService) {
    // setTimeout(() => this.trigger.next(true), 2500);
  }

  ngOnDestroy() {
    this.loadingSubscriber.unsubscribe();
  }
}
