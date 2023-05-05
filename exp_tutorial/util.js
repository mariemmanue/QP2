function getRandomInt(min, max) {
   return Math.floor(Math.random() * (max - min)) + min;
}

function create_js_stim(js_object) {
    let json_string = JSON.stringify(js_object);
    const js_sim = JSON.parse(json_string);
    var tar_count = 0;
    var con_count = 0;
    let arr = [];

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

    for (var object in js_sim) { // loop through array of json objects/ csv rows
      if (js_sim[object]["Group"] == "Target") { // if Target condition
        var nummy = getRandomInt(0, key.length); //generate random num 0-3
        arr.push({Target: js_sim[object][key[nummy]]}); // get random headline and lead
        tar_category[key[nummy]] = (tar_category[key[nummy]]) + 1;
        tar_count += 1;
      }
      else { //if Control
        let nummy = getRandomInt(0, key2.length);
        arr.push({Control: js_sim[object][key2[nummy]]}) // get random headline and lead
        con_category[key2[nummy]] = (con_category[key2[nummy]]) + 1;
        con_category[nummy] = con_category[nummy]++
        con_count += 1;
      }
    }
    // console.log(tar_category);
    // console.log(con_category);
    // console.log(Object.values(arr));
    return arr; // should return [{Target: "Headline:}, {Target: "Headline:"}]
}


function create_timevari(json_object) {
    let timevari = [];
    var values = Object.values(json_object);
    for (let i = 0; i < json_object.length; i++) {
      var key = Object.keys(json_object[i]);
      obj = {};
      obj.stimulus = json_object[i][key];
      obj.data = {};
      obj.data.title = key;
      timevari.push(obj)

    }
    return timevari;
}
