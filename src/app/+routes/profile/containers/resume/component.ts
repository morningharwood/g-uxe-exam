import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { selectFeature } from '../../components/video-block/actions/index';
import * as content from './content/data';
import { ResumeBlock } from './interfaces/index';


@Component({
  selector: 'mh-resume-profile',
  templateUrl: './component.html',
  styleUrls: ['./component.scss'],
})
export class ResumeContainerComponent {
  public me = content.me;
  public experiences: ResumeBlock[] = content.experiences;
  public educations: ResumeBlock[] = content.educations;
  public awards: any = content.awards;
  public techniques: string[] = content.techniques;
  public socials = content.socials;
  public visited = content.visited;
  public interests: string[] = content.interests;
  public inspiration = content.inspiration;
  public inspirationPodCast = content.inspirationPodCast;
  public selectedVideoObs: Observable<any>;
  public header = 'Résumé';

  constructor(private store: Store<any>) {
    this.selectedVideoObs = store.select(selectFeature);
  }
}
