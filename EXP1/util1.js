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

  while (tar_count != 12) {
    for (var category in tar_category) {
      if (tar_category[category] != 3) {
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
  while (con_count != 12) {
    for (var cat in con_category) {
      if (con_category[cat] != 6) {
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
  console.log(con_count,tar_count )
  console.log(arr)
  console.log(tar_category)
  console.log(con_category)
  return arr;
}


function create_timevari(json_object) {
  let timevari = [];
  var values = Object.values(json_object);
  for (let i = 0; i < json_object.length; i++) {
    var key = Object.keys(json_object[i]);
    obj = {};
    obj.stimulus = json_object[i][key];
    timevari.push(obj)

  }
  return timevari;
}
