import morphtargetDict from './morphTargetDictionary.json'

// console.log(Object.keys(morphtargetDict).length)

const zeros = new Array(Object.keys(morphtargetDict).length).fill(0);

const anim_a = zeros.slice()
anim_a[morphtargetDict['A']] = 0.5

const anim_ae = zeros.slice()
anim_ae[morphtargetDict['BigSmile']] = 0.4
anim_ae[morphtargetDict['A']] = 0.2
anim_ae[morphtargetDict['MouthDimpleLeft']] = 1.0
anim_ae[morphtargetDict['MouthDimpleRight']] = 1.0

const anim_e = anim_ae

const anim_eo = zeros.slice()
anim_eo[morphtargetDict['BigSmile']] = 0.2
anim_eo[morphtargetDict['O']] = 0.4
anim_eo[morphtargetDict['A']] = 0.4

const anim_o = zeros.slice()
anim_o[morphtargetDict['O']] = 1.0

const anim_u = zeros.slice()
anim_u[morphtargetDict['U']] = 1.0

const anim_eu = zeros.slice()
anim_eu[morphtargetDict['A']] = 0.3
anim_eu[morphtargetDict['MouthLeftUp']] = 0.4
anim_eu[morphtargetDict['MouthRightUp']] = 0.4
anim_eu[morphtargetDict['MouthStetchLeft']] = 0.7
anim_eu[morphtargetDict['MouthStetchRight']] = 0.7

const anim_i = zeros.slice()
anim_i[morphtargetDict['A']] = 0.2
anim_i[morphtargetDict['MouthLeftUp']] = 0.7
anim_i[morphtargetDict['AMouthRightUp']] = 0.7
anim_i[morphtargetDict['MouthStetchLeft']] = 1.0
anim_i[morphtargetDict['MouthStetchRight']] = 1.0


const vowel_map = {
    'base': zeros,
    'a': anim_a,
    'ae': anim_ae,
    'e': anim_e,
    'eo': anim_eo,
    'o': anim_o,
    'u': anim_u,
    'eu': anim_eu,
    'i': anim_i
}

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
  
    element.style.display = 'none';
    document.body.appendChild(element);
  
    element.click();
  
    document.body.removeChild(element);
}

// download('vowel_to_anim.json', JSON.stringify(vowel_map))

export { vowel_map }