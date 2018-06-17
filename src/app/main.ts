import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app.module';

//for Payment
import {enableProdMode} from '';
enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
