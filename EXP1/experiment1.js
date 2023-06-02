const jsPsych = initJsPsych({
  show_progress_bar: true,
  message_progress_bar: 'Progress on Experimental Questions',
  auto_update_progress_bar: false
});
let timeline = [];

const irb = {
  //   // Which plugin to use
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <img src='alpslogo.png'width="200" height="90">
  <div class="irb">
  <h2>Stanford interActional Language Processing Lab</h2>
  We invite you to participate in a research study on language.
  You will read a number of headlines and answer simple questions about them.
  Be sure to please read the headlines carefully, but respond according to your
  first impression. This study will take about 15 minutes.
  Please read the legal information below. If you agree to participate after reading,
  press the button below to start the experiment.
  </div>
  <div class="legal">
  Legal information: <br><br> There are no risks or benefits of any kind involved in this study.
  You will be paid for your participation at the posted rate. If you have read this form
  and have decided to participate in this experiment, please understand your participation
  is voluntary and you have the right to withdraw your consent or discontinue participation
  at anytime without penalty or loss of benefits to which you are otherwise entitled.
  You have the right to refuse to do particular tasks. Your individual privacy will be
  maintained in all published and written data resulting from the study. You may print
  this form for your records.<br><br>
  CONTACT INFORMATION: <br><br>
  If you have any questions\, concerns or complaints about this research study\,
  its procedures\, risks and benefits\, you should contact the Protocol Director
  Meghan Sumner at (650)-725-9336. If you are not satisfied with how this study
  is being conducted, or if you have any concerns, complaints, or general questions
  about the research or your rights as a participant, please contact the Stanford
  Institutional Review Board (IRB) to speak to someone independent of the research team
  at (650)-723-2480 or toll free at 1-866-680-2906. You can also write to the Stanford IRB\,
  Stanford University\, 3000 El Camino Real, Five Palo Alto Square, 4th Floor, Palo Alto,
  CA 94306 USA.
  </div>
  `,
  choices: ['Start Experiment']
};

// push to the timeline
timeline.push(irb)



const demo = {
  type: jsPsychSurvey,
  button_label_finish: "Submit",
  button_label_next: 'Continue',
  required_question_label: "*" ,
  required_error: "Please answer the question.",
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
        required: true
      },
      {
        type: 'drop-down',
        prompt: 'Gender:',
        name: 'gender',
        options: ['Woman', 'Man', 'Non-binary/Non-conforming'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: 'What is your age?',
        name: 'age',
        options: ['18-24', '25-34', '35-44', '45-54', '55-64', '65+'],
        required: true
      },
    ],
    [
      {
        type: 'html',
        prompt: 'Please answer the following questions.'
      },
      {
        type: 'multi-choice',
        prompt: 'Do you think that the police are generally honest?',
        name: 'police honest',
        options: ['Yes', 'No'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: 'Do the police respect a person\'s basic rights?',
        name: 'police rights',
        options: ['Yes', 'No'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: 'Do the police usually listen to people\'s views before making a decision?',
        name: 'police listen',
        options: ['Yes', 'No'],
        required: true
      },
      {
        type: 'multi-choice',
        prompt: 'Do you generally trust the police?',
        name: 'police trust',
        options: ['Yes', 'No'],
        required: true
      },
    ],
    [
      {
        type: 'html',
        prompt: 'Please answer the following questions.'
      },
      {
        type: 'multi-choice',
        prompt: 'What political party do you identify closest with?',
        name: 'political party',
        options: ['Democratic', 'Republican', 'Libertarian', 'Green', 'Independent'],
        required: true
      },
      {
        type: 'likert',
        prompt: 'How conservative would you rate yourself?',
        name: 'conservative',
        required: true,
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
        required: true,
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
  type: jsPsychHtmlButtonResponse,
  stimulus: `
  <p>In this experiment, you will see a total of 16 article headlines.
  You will also answer a number of questions following each headline.
  Please note that the various topics presented in headlines involve events related to
  death, violence and murder, which may be distressing for some viewers.
  Click 'Next', if you are still interested in continuing.</p>
  `,
  choices: ["Next"],
  on_start: function () {
    jsPsych.setProgressBar(0);
  }
};
timeline.push(instructions);

const girly = create_js_stim(trial_objects);
const tv_array = create_timevari(girly);
var headline = {
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
      prompt: '<font size="2.5">After reading the headline carefully, press next to continue.'
    },
    {
      type: jsPsychSurvey,
      required_question_label: "*" ,
      required_error: "Please answer the question.",
      pages:[
        [
          {
            type: 'multi-choice',
            prompt: 'Who was harmed?',
            name: 'harm',
            columns: 0,
            options: function () {
              var agents = jsPsych.timelineVariable('agents');
              var options_array = [agents.ag1, agents.ag2, "Other"];
              return options_array;
            },
            required: true
          },
        ],
      ],
      button_label_next: 'Continue',
      button_label_back: 'Previous',
      button_label_finish: 'Submit',
    }
  ],
  on_timeline_finish: function() {
    var curr = jsPsych.getProgressBarCompleted();
    jsPsych.setProgressBar(curr + (1/(tv_array.length * 3)));
  }
};


var q2 = {
  timeline: [
    {
      type: jsPsychSurvey,
      required_question_label: "*" ,
      required_error: "Please answer the question.",
      pages:[
        [
          {
            type: 'multi-choice',
            prompt: 'Who caused the harm?',
            columns: 0,
            name: 'harmer',
            options: function () {
              var agents = jsPsych.timelineVariable('agents');
              var options_array = [agents.ag1, agents.ag2, "Other"];
              return options_array;
            },
            required: true
          },
        ],
      ],
      button_label_next: 'Continue',
      button_label_back: 'Previous',
      button_label_finish: 'Submit',
    }
  ],
  on_timeline_finish: function() {
    var curr = jsPsych.getProgressBarCompleted();
    jsPsych.setProgressBar(curr + (1/(tv_array.length * 3)));
  }
};

var q3 = {
  timeline: [
    {
      type: jsPsychSurvey,
      required_question_label: "*" ,
      required_error: "Please answer the question.",
      pages:[
        [
          {
            type: 'likert-table',
            prompt: ' ',
            statements: [
              {prompt: 'Who is to blame for the harmful event?', name: 'blame amount'},
              {prompt: 'Who is responsible for the harmful event?', name: 'responisble amount'},

            ],
            required: true,
            options: function() {
              const agents = jsPsych.timelineVariable('agents');
              const options_array = [
                "Only the " + agents.ag1,
                "Mostly the  " + agents.ag1,
                "Both the  " + agents.ag1 + " and " + agents.ag2 + " equally",
                "Mostly the  " + agents.ag2,
                "Only the " + agents.ag2]
                return options_array;
              },
            },
            {
              type: 'text',
              textbox_rows: 5,
              textbox_columns: 40,
              prompt: function() {
                return "If you would have preferred to give a different response, please provide more detail on how you would assign blame and responsibility for the harmful event."
              },
              name: 'blame other',
              required: false
            }
          ]
        ],
        button_label_next: 'Continue',
        button_label_back: 'Previous',
        button_label_finish: 'Submit',
      }
    ],
    on_timeline_finish: function() {
      var curr = jsPsych.getProgressBarCompleted();
      jsPsych.setProgressBar(curr + (1/(tv_array.length * 3)));
    }
  };

  var more_info = {
    type: jsPsychSurvey,
    pages: [
      [
        {
          type: 'text',
          prompt: function() {
            var data_last = jsPsych.data.getLastTrialData().values()[0];
            const agents = jsPsych.timelineVariable('agents');
            if(data_last.response["harm"]){
              return "Who was harmed, if not either the " + agents.ag1 + " or the " +agents.ag2 + "?"
            }
            else if (data_last.response["harmer"]) {
              return "Who was the harmer, if not either the " + agents.ag1 + " or the " +agents.ag2 + "?"
            }
          },
          textbox_rows: 5,
          textbox_columns: 40,
          name: 'who other',
          required: true,
        },
      ],
    ],
    button_label_next: 'Continue',
    button_label_back: 'Previous',
    button_label_finish: 'Submit',
  };

  var other_harm = {
    timeline: [more_info],
    conditional_function: function(){
      var data_last = jsPsych.data.getLastTrialData().values()[0];
      if(data_last.response["harm"] == "Other"){
        return true;
      }
      else {
        return false;
      }
    }
  };


  var other_harmer = {
    timeline: [more_info],
    conditional_function: function(){
      var data_last = jsPsych.data.getLastTrialData().values()[0];
      if(data_last.response["harmer"] == "Other"){
        return true;
      }
      else {
        return false;
      }
    }
  };




  var procedure = {
    timeline: [headline, other_harm, q2, other_harmer, q3],
    timeline_variables: tv_array,
    randomize_order: true
  };

  // timeline.push(procedure)




  const quest_intstructions = {
    type: jsPsychHtmlButtonResponse,
    choices: ['Continue'],
    stimulus: "<p>That's the end of the experiment! Thank you for your responses. To help us analyze our results, it would be helpful to know a little more about you. Please answer the following questions.</p>"
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
