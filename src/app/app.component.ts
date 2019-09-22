import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    constructor() {
    }

    ngOnInit() {
        let dummyFormdataObj =
        {
            "refpackageid": 7, "refassigntopatientid": 12, "form": {
                "refformid": 0, "formid": 19, "formcode": "Vaginal Delivery - Day 3", "formname": "Vaginal Delivery - Day 3", "descrption": null, "formData": [
                    {
                        "label": "Welcome to Day 3. You may be experiencing some new problems that we can help with?",
                        "optionsLabelPosition": "right",
                        "values": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "shortcut": ""
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "shortcut": ""
                            }
                        ],
                        "inline": false,
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "radio",
                        "input": true,
                        "key": "welcomeToDay3YouMayBeExperiencingSomeNewProblemsThatWeCanHelpWith",
                        "defaultValue": "",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": "",
                            "when": "",
                            "json": ""
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "Are you experiencing any “pain down there”?",
                        "optionsLabelPosition": "right",
                        "values": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "shortcut": ""
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "shortcut": ""
                            }
                        ],
                        "tabindex": "1",
                        "inline": false,
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "radio",
                        "input": true,
                        "key": "areYouExperiencingAnyPainDownThere",
                        "defaultValue": "",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": true,
                            "when": "welcomeToDay3YouMayBeExperiencingSomeNewProblemsThatWeCanHelpWith",
                            "json": "",
                            "eq": "yes"
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "HTML",
                        "className": "",
                        "attrs": [
                            {
                                "attr": "",
                                "value": ""
                            }
                        ],
                        "content": "<p>The tear down there <br>\r\n1.\tMany women (especially ?rst time moms) will tear during a vaginal delivery. <br>\r\n2.\tDon’t be scared to wash your stitches. Washing them is necessary to keep the stitches clean, prevent infection, and help you to heal well. Use regular soap and water. Avoid alcohol or hydrogen peroxide! Vagina = Va-gentle. <br>\r\n3.\tSit on a donut pillow Sitz baths (shallow bath in warm water to wash genital area) Witch hazel (Tucks) Dermoplast spray Change your pad frequently to keep the area clean and dry Pack of crushed ice or a bag of frozen peas for up to 20 minutes at a time to the perineum. It is important to maintain good blood ?ow to the area for healing so your body will need a break from the ice packs for at least 20-40 minutes (frostbite on lady bits = bad). Some companies also make speci?c postpartum support panties that have special pockets for ice packs to soothe your perineum. In the meantime, you can alternate with a witch hazel pad or apply dermoplast spray.</p>",
                        "refreshOnChange": false,
                        "tabindex": "1",
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "htmlelement",
                        "input": false,
                        "key": "html",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": true,
                            "when": "areYouExperiencingAnyPainDownThere",
                            "json": "",
                            "eq": "yes"
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "Are you experiencing Constipation? ",
                        "optionsLabelPosition": "right",
                        "values": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "shortcut": ""
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "shortcut": ""
                            }
                        ],
                        "tabindex": "2",
                        "inline": false,
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "radio",
                        "input": true,
                        "key": "areYouExperiencingConstipation",
                        "defaultValue": "",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": "",
                            "when": "",
                            "json": ""
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "HTML",
                        "className": "",
                        "attrs": [
                            {
                                "attr": "",
                                "value": ""
                            }
                        ],
                        "content": "<p>Bowel function Bloating, constipation, and gas pains can put a lot of pressure on stitches and can cause severe abdominal pain and cramping. Pregnancy hormones, anesthesia, opioid pain medication (like hydrocodone and codeine), iron supplements, surgery, dehydration, and bedrest can all slow down bowel function and worsen constipation. Make sure that you have adequate ?uid and ?ber intake. Take stool softeners as needed. Docusate sodium (Colace) and Miralax can be purchased overthe-counter without a prescription. These medications are safe during pregnancy as well as with breast- feeding. Warm prune juice and caffeinated tea/coffee can also help to encourage return of normal bowel function.  Citrucel is a great over the counter aid. As a last resort, stimulant laxatives (like Sennakot and Dulcolax), a rectal suppository, or an enema can help to reset your digestive system. Don’t be scared to have a bowel movement. “The longer it sets, the harder poop gets.”</p>",
                        "refreshOnChange": false,
                        "tabindex": "2",
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "htmlelement",
                        "input": false,
                        "key": "html2",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": true,
                            "when": "areYouExperiencingConstipation",
                            "json": "",
                            "eq": "yes"
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "Would you like more information on constipation?",
                        "optionsLabelPosition": "right",
                        "values": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "shortcut": ""
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "shortcut": ""
                            }
                        ],
                        "tabindex": "3",
                        "inline": false,
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "radio",
                        "input": true,
                        "key": "wouldYouLikeMoreInformationOnConstipation",
                        "defaultValue": "",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": "",
                            "when": "",
                            "json": ""
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "HTML",
                        "className": "",
                        "attrs": [
                            {
                                "attr": "",
                                "value": ""
                            }
                        ],
                        "content": "<p>It’s almost better if your stool is “a little too soft,” that way you will not need to strain when going to the bathroom. Remember how the nurse told you to “push like you are constipated” when it was time to deliver you baby? Now that your baby has been safely delivered, you should stop pushing! You’ll want to minimize the tension to that area, especially if you have stitches.\r\nC section then: It’s almost better if your stool is “a little too soft,” that way you will not need to strain when going to the bathroom. Pushing to use the bathroom applies a lot of tension on the various layers of stitches. Before you reach for more opioid pain medication, consider when you last had a bowel movement? Taking stool softeners may actually be more helpful for your abdominal pain if it has been 1-2 days since your last normal bowel movement or if your last bowel movement felt like passing little rocks.</p>\r\n",
                        "refreshOnChange": false,
                        "tabindex": "3",
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "htmlelement",
                        "input": false,
                        "key": "html3",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": true,
                            "when": "wouldYouLikeMoreInformationOnConstipation",
                            "json": "",
                            "eq": "yes"
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "Are you experiencing hemorrhoids?",
                        "optionsLabelPosition": "right",
                        "values": [
                            {
                                "label": "Yes",
                                "value": "yes",
                                "shortcut": ""
                            },
                            {
                                "label": "No",
                                "value": "no",
                                "shortcut": ""
                            }
                        ],
                        "tabindex": "4",
                        "inline": false,
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "radio",
                        "input": true,
                        "key": "areYouExperiencingHemorrhoids",
                        "defaultValue": "",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": "",
                            "when": "",
                            "json": ""
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    },
                    {
                        "label": "HTML",
                        "className": "",
                        "attrs": [
                            {
                                "attr": "",
                                "value": ""
                            }
                        ],
                        "content": "<p>Hemorrhoids are swollen veins in the anus and lower rectum. Hemorrhoids commonly develop during pregnancy due to the increased pelvic pressured from carrying the baby. Hemorrhoids can get worse from pushing during labor or straining due to constipation. Hemorrhoids may cause bleeding, pain, itching, or irritation in the anal region.  Hemorrhoids can resolve on their own. <br>         \r\n1.\tPain and swelling may be managed with over-the-counter creams and suppositories (like Preparation H) and witch hazel (Tucks pads). <br> \r\n2.\tIncrease ?uid and ?ber intake to avoid constipation, which makes hemorrhoids worse.   <br>\r\n3.\tSitz baths <br>       \r\n4.\tDonut pillow to decrease direct pressure to hemorrhoids when sitting.   <br>    \r\n5.\tPain medication, like acetaminophen (Tylenol), ibuprofen (Advil, Motrin), or naproxen (Aleve).  Stronger opioid pain medication will make constipation worse and therefore, make the hemorrhoids worse in the long run.</p>",
                        "refreshOnChange": false,
                        "tabindex": "4",
                        "mask": false,
                        "tableView": true,
                        "alwaysEnabled": false,
                        "type": "htmlelement",
                        "input": false,
                        "key": "html4",
                        "validate": {
                            "customMessage": "",
                            "json": ""
                        },
                        "conditional": {
                            "show": true,
                            "when": "areYouExperiencingHemorrhoids",
                            "json": "",
                            "eq": "yes"
                        },
                        "encrypted": false,
                        "properties": {},
                        "customConditional": "",
                        "logic": [],
                        "reorder": false
                    }
                ], "answeredFormData": null, "isactive": false, "createddate": null, "modifieddate": null, "createdby": null, "modifiedby": null, "isDeleted": false, "answeredFormStatus": false, "answereddatetime": null, "showtodatetime": "2019-09-15 10:00:00", "showtoday": 6, "formAssignId": 0, "planSettingId": 0, "refPlanSettingId": 448, "answerdPlanId": 0, "makeChangesInAssignnedForm": false
            }, "refpatientid": "9", "refuserid": "4"
        };
        localStorage.setItem('data', JSON.stringify(dummyFormdataObj));
    }
}
