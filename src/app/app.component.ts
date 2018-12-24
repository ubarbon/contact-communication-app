import {Component} from '@angular/core';
import {TranslateService} from './service/translate/translation.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    constructor(private translate: TranslateService) {
        // set current language
        this.translate.use('en');
    }
}
