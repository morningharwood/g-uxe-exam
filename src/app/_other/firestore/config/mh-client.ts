import { FirebaseAppConfig } from 'angularfire2';

export class MhClientFirestore {
  public static config(): FirebaseAppConfig {
    return {
      apiKey: 'AIzaSyD9ZUsu1p-WGtL4KBad27AUGQ0KFHPrh1Y',
      authDomain: 'gxe-gallery.firebaseapp.com',
      databaseURL: 'https://gxe-gallery.firebaseio.com',
      projectId: 'gxe-gallery',
      storageBucket: 'gxe-gallery.appspot.com',
      messagingSenderId: '470078309765'
    };
  }
}
