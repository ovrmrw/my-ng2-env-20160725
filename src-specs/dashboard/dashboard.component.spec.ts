/* >>> boilerplate */
import assert from 'power-assert';
import lodash from 'lodash';
import { inject, async, fakeAsync, tick, addProviders, TestComponentBuilder, ComponentFixture } from '@angular/core/testing';
import { asyncPower, fakeAsyncPower, setTimeoutPromise, elements, elementText } from '../../test-ng2/testing.helper';
/* <<< boilerplate */


////////////////////////////////////////////////////////////////////////
// modules
import { DashboardComponent } from '../../src/dashboard/dashboard.component';
import { HeroService } from '../../src/webapi/hero.service';
import { Hero } from '../../src/types';

import { HTTP_PROVIDERS } from '@angular/http';
import { Router } from '@angular/router';


////////////////////////////////////////////////////////////////////////
// mocks
class MockHeroService {
  private heroes: Hero[] = [
    { id: 11, name: 'Mr. Nice' },
    { id: 12, name: 'Narco' },
    { id: 13, name: 'Bombasto' },
    { id: 14, name: 'Celeritas' },
    { id: 15, name: 'Magneta' },
    { id: 16, name: 'RubberMan' },
    { id: 17, name: 'Dynama' },
    { id: 18, name: 'Dr IQ' },
    { id: 19, name: 'Magma' },
    { id: 20, name: 'Tornado' }
  ];
  getHeroesAsPromise(): Promise<Hero[]> {
    return Promise.resolve(this.heroes);
  }
}
class Mock { }


////////////////////////////////////////////////////////////////////////
// tests
describe('TEST: Dashboard Component', () => {
  /* >>> boilerplate */
  let builder: TestComponentBuilder;

  beforeEach(() => {
    addProviders([
      HTTP_PROVIDERS,
      { provide: HeroService, useClass: MockHeroService },
      { provide: Router, useClass: Mock },
    ]);
  });

  beforeEach(inject([TestComponentBuilder], (tcb) => {
    builder = tcb;
  }));
  /* <<< boilerplate */


  it('can create, should have title, should have 4 heroes', fakeAsyncPower(() => {
    let fixture: ComponentFixture<DashboardComponent> | undefined;
    builder.createAsync(DashboardComponent).then(f => fixture = f);
    tick();
    if (fixture) {
      const el = fixture.nativeElement as HTMLElement;
      const component = fixture.componentRef.instance;
      assert(!!fixture);
      assert(elementText(el, 'h3') === 'Top Heroes');
      assert(component.heroes.length === 0);
      component.ngOnInit();
      tick();
      assert(component.heroes.length === 4);
    }
  }));

});
