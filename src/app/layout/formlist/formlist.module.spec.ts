import { FormListModule } from './formlist.module';

describe('FormListModule', () => {
    let formModule: FormListModule;

    beforeEach(() => {
        formModule = new FormListModule();
    });

    it('should create an instance', () => {
        expect(formModule).toBeTruthy();
    });
});
