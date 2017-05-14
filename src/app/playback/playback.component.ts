import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AnimatorService } from '../services';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import {
  State,
  getPlaybackSettings,
} from '../store';
import 'rxjs/add/observable/combineLatest';

@Component({
  selector: 'app-playback',
  templateUrl: './playback.component.html',
  styleUrls: ['./playback.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlaybackComponent implements OnInit {

  playbackModel$: Observable<PlaybackModel>;

  constructor(
    private readonly store: Store<State>,
    private readonly animatorService: AnimatorService,
  ) { }

  ngOnInit() {
    this.playbackModel$ = this.store.select(getPlaybackSettings);
  }

  isSlowMotionClick() {
    this.animatorService.toggleIsSlowMotion();
  }

  playPauseButtonClick() {
    this.animatorService.toggle();
  }

  rewindClick() {
    this.animatorService.rewind();
  }

  fastForwardClick() {
    this.animatorService.fastForward();
  }

  isRepeatingClick() {
    this.animatorService.toggleIsRepeating();
  }
}

interface PlaybackModel {
  readonly isSlowMotion: boolean;
  readonly isPlaying: boolean;
  readonly isRepeating: boolean;
}