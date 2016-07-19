import {Component} from "@angular/core";
import {bootstrap} from "@angular/platform-browser-dynamic";


@Component({
  selector: "yellow-card",
  template: `
    <div class="card yellow">
      <h4>I am a yellow card</h4>
    </div>
  `
})
class YellowCard { }

@Component({
  selector: "blue-card",//this actually has nothing to do with class name BlueCard
  template: `
    <div class="card blue">
      <h4>I am a blue card ({{x}})</h4>
      <yellow-card></yellow-card>
    </div>
  `,
  directives: [YellowCard]
})
class BlueCard {
  x = Math.random();
}


@Component({
  selector: 'green-card',
  template: `
    <div class="card green" style="padding: 10px">
      <h4>I am a green card</h4>
      <blue-card></blue-card>
    </div>
  `,
  directives: [BlueCard]
})
class GreenCard { }

@Component({
  selector: 'my-app',
  template: `
    <h4>Example application showing component nesting</h4>
    <green-card></green-card>
  `,
  directives: [BlueCard, GreenCard, YellowCard]
})
class AppComponent { }

bootstrap(AppComponent);
