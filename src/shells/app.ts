import { AppState } from './../services/app-state';
import { AuthorizeStep } from './../services/authorize-step';
import { autoinject, Aurelia } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import { RouterConfiguration } from 'aurelia-router';
import 'jquery-nicescroll';

declare var $: any;

@autoinject()
export class App {
  public router: Router;

  constructor(private appState:AppState, private aurelia:Aurelia){}
  public configureRouter(config: RouterConfiguration, router: Router) {
    config.title = 'App';
    config.options.root = '/';
    config.addPipelineStep('authorize', AuthorizeStep);
    config.map([
      { name: 'base',  route: '',       moduleId: './pointer' },
      { name: 'words', route: '/words', moduleId: '../routes/words/child-router',  title: 'Words', nav: true },
    ]);
    this.router = router;
  }

  public attached() {
    $('a.launch.icon.item').on('click', function () {
      $('.ui.sidebar').sidebar('toggle');
    });
    $('body').niceScroll({autohidemode: true});
    $('.hamburger').on('click', function () {
      if ('show' === $(this).data('name')) {
        $('.toc, .logo').animate({
          width: '135px'
        }, 350);
        $(this).data('name', 'hide');
      } else {
        $('.toc, .logo').animate({
          width: '235px'
        }, 350);
        $(this).data('name', 'show');
      }
    });
  }
  public logout() {
    this.appState.loading=true;
    this.appState.message = "Logging out..!"
    this.appState.logout().then(()=>{
      this.aurelia.setRoot('shells/login');
    });
  }
}