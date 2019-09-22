export class CheckInInterface
{
    question : any;
    questionview:any;
    component_type : string;
    answer : string[] = [];
    input : string;
    description: string;

    count : number = 0;
    questionnaire_array_length : number = 0;
    questionnaireData : string;
    quesstionnaire_array :any[] = [];
    form: any;

    skip_question:boolean = false;
    show_next : boolean = true;
    show_previous : boolean = false;
    show_submit : boolean = false;

}