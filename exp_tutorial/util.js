function create_js_stim(json_object) {
    let js_stim = [];
    for (let i = 0; i < json_object.length; i++) {
        obj = {};
        obj.Group = json_object[i].Group;
        obj.data = {};
        obj.data.correct = json_object[i].correct;
        js_stim.push(obj)
    }
    return js_stim;
}
