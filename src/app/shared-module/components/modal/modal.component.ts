import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons, NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
    @Input('routing_url') public routing_url = '';
    @Input('modalTitle') public modalTitle = '';
    @Input('modalBody') public modalBody = '';
    @ViewChild('content', { static: false }) content: any;
    closeResult: string;
    @Output('modalEvent') modalEvent = new EventEmitter<any>();
    modalRef: NgbModalRef;
    constructor(private modalService: NgbModal, public activeModal: NgbActiveModal) { }

    open() {
        this.modalRef = this.modalService.open(this.content);
        this.modalRef.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }

    routeToModule() {
        this.activeModal.close('Close click');
    }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
    }

    public submitForm() {
        this.modalEvent.emit();
        this.modalRef.close();
    }
}
