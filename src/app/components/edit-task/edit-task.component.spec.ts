import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskComponent } from './edit-task.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('EditTaskComponent', () => {
  let component: EditTaskComponent;
  let fixture: ComponentFixture<EditTaskComponent>;

  const fakeActivatedRoute: ActivatedRoute = {
    snapshot: {
      data: { id: '1' },
      paramMap: {
        get(): string {
          return '123';
        },
      },
    }
  } as unknown as ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditTaskComponent, RouterModule.forRoot([])],
      providers: [{provide: ActivatedRoute, useValue: fakeActivatedRoute}, provideAnimations()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
