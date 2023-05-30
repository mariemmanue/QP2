function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function create_js_stim(js_object) {
  let json_string = JSON.stringify(js_object);
  const js_sim = JSON.parse(json_string);
  var tar_count = 0;
  var con_count = 0;
  let arr = [];
  let numbers = new Set();

  var tar_category = {
    "Agentive (Non-Cop Fatality)": 0,
    "Nonagentive (Non-Cop Fatality)": 0,
    "Agentive (Cop Fatality)": 0,
    "Nonagentive (Cop Fatality)": 0
  }
  var con_category = {
    "Agentive (Non-Cop Fatality)": 0,
    "Nonagentive (Non-Cop Fatality)": 0,
  }
  var key = Object.keys(tar_category);
  var key2 = Object.keys(con_category);

  while (tar_count != 8) {
    for (var category in tar_category) {
      if (tar_category[category] != 2) {
        var nummy = getRandomInt(0, (js_sim.length /2));
        if (!numbers.has(nummy)) {
          numbers.add(nummy);
          arr.push({Target: js_sim[nummy][category]});
          tar_category[category] = (tar_category[category]) + 1;
          tar_count += 1;
        }
      }
    }
  }
  while (con_count != 8) {
    for (var cat in con_category) {
      if (con_category[cat] != 4) {
        var num = getRandomInt((js_sim.length /2), js_sim.length);
        if (!numbers.has(num)) {
          numbers.add(num);
          arr.push({Control: js_sim[num][cat]});
          con_category[cat] = (con_category[cat]) + 1;
          con_count += 1;
        }
      }
    }

  }
  return arr;
}


function create_timevari(json_object) {
  let timevari = [];
  var cops = ["police officer", "sheriff","officers", "cops", "officer", "security guard", "state trooper", "cop", "police chief", "border patrol agent",  "police"];
  var people = ["nurse", "fisherman", "teen","owner", "vandal", "superintendent", "community leader", "patient", "doctor", "father", "driver", "teacher", "protesters", "student", "club bouncer", "waiter", "mom", "neighbor", "husband", "wife", "man"];
  var values = Object.values(json_object);
  for (let i = 0; i < json_object.length; i++) {
    var key = Object.keys(json_object[i]);
    obj = {};
    obj.key = key[0];
    obj.stimulus = json_object[i][key];
    obj.agents = {};
    var copsassign = (element) => obj.stimulus.toLowerCase().includes(element);
    var peopleassign = (element) => obj.stimulus.toLowerCase().includes(element);
    var peoples = people.filter(peopleassign);
    if (key == 'Target') {
      obj.agents.ag1 = cops.find(copsassign).toLowerCase().charAt(0).toUpperCase() + cops.find(copsassign).toLowerCase().substr(1).toLowerCase();
      obj.agents.ag2 = peoples[0].charAt(0).toUpperCase() + peoples[0].substr(1).toLowerCase();
    }
    else {
      obj.agents.ag1 = peoples[0].toLowerCase().charAt(0).toUpperCase() + peoples[0].toLowerCase().substr(1).toLowerCase();
      obj.agents.ag2 = peoples[1].toLowerCase().charAt(0).toUpperCase() + peoples[1].toLowerCase().substr(1).toLowerCase();
    }

  timevari.push(obj)
}
return timevari;
}
