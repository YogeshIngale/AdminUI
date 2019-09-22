import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-form-io',
    templateUrl: './form-io.component.html',
    styleUrls: ['./form-io.component.scss']
})
export class FormIoComponent implements OnInit, OnChanges {
    @Input('formJsonData') public formJsonData: any;
    @Output('formsDashBoardEvent') public formsDashBoardEvent = new EventEmitter<any>();
    formsContent: any;
    FormName: any;
    constructor() { }

    ngOnChanges() {
        let params = this.formJsonData;
        if ((params != undefined) && (params != null)) {
            let data = params;
            if (typeof (data['formData']) === 'string') {
                data['formData'] = data['formData'].replace(/\\"/g, '\\"');
                this.formsContent = JSON.parse(data);
                this.FormName = data.formname;
            }

            this.formsContent = data['formData'];
            this.FormName = data.formname;
        }
    }
    ngOnInit() {
    }



}
