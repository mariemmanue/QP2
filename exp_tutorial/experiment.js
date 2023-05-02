const jsPsych = initJsPsych();
let timeline = [];


const irb = {
    // Which plugin to use
    type: jsPsychHtmlButtonResponse,
    // What should be displayed on the screen
    stimulus: '<p><font size="3">We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
    // What should the button(s) say
    choices: ['Continue']
};

// push to the timeline
timeline.push(irb)

const demo = {
    type: jsPsychSurvey,
    pages: [
        [
          {
              type: 'html',
              prompt: 'Please answer the following questions.'
          },
            {
                type: 'multi-select',
                prompt: 'Race/Ethnicity: (may select multiple)',
                name: 'race',
                options: ['American Indian or Alaskan Native', 'Asian / Pacific Islander',
                'Black', 'Hispanic', 'White']
            },
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Woman', 'Man', 'Non-binary/Non-conforming']
            },
            {
                type: 'multi-choice',
                prompt: 'Do you think the police are generally honest?',
                name: 'police honest',
                options: ['Yes', 'No']
            },
            {
                type: 'multi-choice',
                prompt: 'Do they respect a person\'s basic rights?',
                name: 'police rights',
                options: ['Yes', 'No']
            },
            {
                type: 'multi-choice',
                prompt: 'Do the police usually listen to people\’s views before making a decision?',
                name: 'police listen',
                options: ['Yes', 'No']
            },
            {
                type: 'multi-choice',
                prompt: 'Do you generally trust the police?',
                name: 'police trust',
                options: ['Yes', 'No']
            },
            {
                type: 'multi-choice',
                prompt: 'Have you been stopped by the police?',
                name: 'police stop',
                options: ['Yes', 'No']
            },
            {
                type: 'likert',
                prompt: 'How fairly do you feel you had been treated in your last police encounter?',
                name: 'police stop',
                options: ['Extremely fairly', 'Very Fairly', 'Somewhat Fairly','Not so fairly', 'Not at all Fairly']
            }
        ]
    ]
};

timeline.push(demo)


const instructions = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "In this experiment, you will see a series of article headlines and corresponding leads. You will also answer a number of questions following each headline!",
    choices: [" "]
};
timeline.push(instructions);

// var json = JSON.stringify("Exp1Stim.json");
// var js_sim = JSON.parse(json);


const questionnaire = {
    type: jsPsychSurvey,
    pages: [
        [
            {
                type: 'html',
                prompt: 'Please answer the following questions.'
            },
            {
                type: 'multi-choice',
                prompt: 'Did you read the instructions and do you think you did the task correctly?',
                name: 'correct',
                options: ['Yes', 'No', 'I was confused']
            }
        ],
        [
            {
                type: 'drop-down',
                prompt: 'Gender:',
                name: 'gender',
                options: ['Female', 'Male', 'Non-binary/Non-conforming', 'Other']
            }
        ]
    ]
};

timeline.push(questionnaire)






jsPsych.run(timeline)
