const jsPsych = initJsPsych(
  {
    show_progress_bar: true
  }
);
let timeline = [];

const irb = {
  // Which plugin to use
  type: jsPsychHtmlButtonResponse,
  // What should be displayed on the screen
  stimulus: '<p>We invite you to participate in a research study on language production and comprehension. Your experimenter will ask you to do a linguistic task such as reading sentences or words, naming pictures or describing scenes, making up sentences of your own, or participating in a simple language game. <br><br>There are no risks or benefits of any kind involved in this study. <br><br>You will be paid for your participation at the posted rate.<br><br>If you have read this form and have decided to participate in this experiment, please understand your participation is voluntary and you have the right to withdraw your consent or discontinue participation at anytime without penalty or loss of benefits to which you are otherwise entitled. You have the right to refuse to do particular tasks. Your individual privacy will be maintained in all published and written data resulting from the study. You may print this form for your records.<br><br>CONTACT INFORMATION: If you have any questions, concerns or complaints about this research study, its procedures, risks and benefits, you should contact the Protocol Director Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study is being conducted, or if you have any concerns, complaints, or general questions about the research or your rights as a participant, please contact the Stanford Institutional Review Board (IRB) to speak to someone independent of the research team at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB, Stanford University, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto, CA 94306 USA.<br><br>If you agree to participate, please proceed to the study tasks.</font></p>',
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
        'Black', 'Hispanic', 'White'],
        required: false
      },
      {
        type: 'drop-down',
        prompt: 'Gender:',
        name: 'gender',
        options: ['Woman', 'Man', 'Non-binary/Non-conforming'],
        required: false
      },
      {
        type: 'multi-choice',
        prompt: 'What is your age?',
        name: 'age',
        options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        required: false
      },
      {
        type: 'multi-choice',
        prompt: 'Do you think the police are generally honest?',
        name: 'police honest',
        options: ['Yes', 'No'],
        required: false
      },
      {
        type: 'multi-choice',
        prompt: 'Do they respect a person\'s basic rights?',
        name: 'police rights',
        options: ['Yes', 'No'],
        required: false
      },
      {
        type: 'multi-choice',
        prompt: 'Do the police usually listen to people\’s views before making a decision?',
        name: 'police listen',
        options: ['Yes', 'No'],
        required: false
      },
      {
        type: 'multi-choice',
        prompt: 'Do you generally trust the police?',
        name: 'police trust',
        options: ['Yes', 'No'],
        required: false
      },
      {
        type: 'likert',
        prompt: 'How conservative would you rate yourself?',
        name: 'conservative',
        required: false,
        likert_scale_min_label: 'Not at all',
        likert_scale_max_label: 'Extremely Conservative',
        likert_scale_values: [
          {value: 1},
          {value: 2},
          {value: 3},
          {value: 4},
          {value: 5}
        ]
      },
      {
        type: 'likert',
        prompt: 'How liberal would you rate yourself?',
        name: 'police stop',
        required: false,
        likert_scale_min_label: 'Not at all',
        likert_scale_max_label: 'Extremely Liberal',
        likert_scale_values: [
          {value: 1},
          {value: 2},
          {value: 3},
          {value: 4},
          {value: 5}
        ]
      }
    ]
  ]
};


const instructions = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p>In this experiment, you will see a total of 24 article headlines. You will also answer a number of questions following each headline. Please press the spacebar to continue.</p>",
  choices: [" "]
};
timeline.push(instructions);


const triggerwarning = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<p>Please note that the various topics presented in headlines involve events related to death, violence and murder, which may be distressing for some viewers. If you are still interested in continuing, please press the spacebar.</p>",
  choices: [" "]
};
timeline.push(triggerwarning);

const girly = create_js_stim(trial_objects);
const tv_array = create_timevari(girly);
const trial_questions = {
  timeline: [
    {
      type: jsPsychHtmlButtonResponse,
      response_ends_trial: true,
      stimulus: function () {
        const html = jsPsych.timelineVariable('stimulus');
        return html;
      },
      choices: ["Next"],
      button_html: '<button class="jspsych-btn">Next</button>',
      prompt: '<font size="2">After reading the headline carefully, press next to continue.'
    },
    {
      type: jsPsychSurvey,
      pages:[
        [
          {
            type: 'multi-choice',
            prompt: 'Who was harmed?',
            name: 'harm',
            options: function () {
              var agents = jsPsych.timelineVariable('agents');
              var options_array = [agents.ag1, agents.ag2];
              return options_array;
            },
            required: false
          },
        ]
      ]
    },
    {
      type: jsPsychSurvey,
      pages:[
        [
          {
            type: 'multi-choice',
            prompt: 'Who caused the harm?',
            name: 'harmer',
            options: function () {
              var agents = jsPsych.timelineVariable('agents');
              var options_array = [agents.ag1, agents.ag2];
              return options_array;
            },
            required: false
          },
        ]
      ]
    },
    {
      type: jsPsychSurvey,
      pages:[
        [
          {
            type: 'multi-choice',
            prompt: 'Who is more to responsible for the event?',
            name: 'blame main amount',
            required: false,
            options: function () {
              const agents = jsPsych.timelineVariable('agents');
              const options_array = [
                "Entirely the " + agents.ag1,
                "Mostly the " + agents.ag1,
                "Both the " + agents.ag1 + " and " + agents.ag2 + " equally",
                "Mostly the " + agents.ag2,
                "Entirely the " + agents.ag2]
              return options_array;
            },
          },
        ]
      ]
    }
],
};


var procedure = {
  timeline: [trial_questions],
  timeline_variables: tv_array,
  randomize_order: true
};

timeline.push(procedure)




const quest_intstructions = {
  type: jsPsychHtmlButtonResponse,
  choices: ['Continue'],
  stimulus: "<p>That's the end of the experiment! Thank you for your responses. To help us analyze our results, it would be helpful to know know a little more about you. Please answer the following questions.</p>"
};
timeline.push(quest_intstructions)


timeline.push(demo)

const thanks = {
  type: jsPsychHtmlButtonResponse,
  choices: ['Continue'],
  stimulus: "<p>Thank you for your time! Please click 'Continue' and then wait a moment until you're directed back to Prolific.</p>"
};
timeline.push(thanks)



jsPsych.run(timeline)
