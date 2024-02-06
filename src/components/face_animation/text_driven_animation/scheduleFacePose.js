const vowel_eng = [
    "a",
    "ae",
    "ya",
    "yae",
    "eo",
    "e",
    "yeo",
    "ye",
    "o",
    "wa",
    "wae",
    "oe",
    "yo",
    "u",
    "wo",
    "we",
    "wi",
    "yu",
    "eu",
    "ui",
    "i",
]
const vowel_kor = [
    "ㅏ",
    "ㅐ",
    "ㅑ",
    "ㅒ",
    "ㅓ",
    "ㅔ",
    "ㅕ",
    "ㅖ",
    "ㅗ",
    "ㅘ",
    "ㅙ",
    "ㅚ",
    "ㅛ",
    "ㅜ",
    "ㅝ",
    "ㅞ",
    "ㅟ",
    "ㅠ",
    "ㅡ",
    "ㅢ",
    "ㅣ",
]
var dict_engkor_vowel = {}
vowel_eng.forEach((key, i) => dict_engkor_vowel[key] = vowel_kor[i]);
var dict_koreng_vowel = {}
vowel_kor.forEach((key, i) => dict_koreng_vowel[key] = vowel_eng[i]);
const tongue_vowels = {"ㅑ": "ㅏ", "ㅕ": "ㅓ", "ㅠ": "ㅜ", "ㅖ": "ㅔ", "ㅛ": "ㅗ", "ㅒ": "ㅐ"}
const dual_vowels = {
    "ㅘ": ["ㅗ", "ㅏ"],
    "ㅙ": ["ㅗ", "ㅐ"],
    "ㅚ": ["ㅗ", "ㅣ"],
    "ㅝ": ["ㅜ", "ㅓ"],
    "ㅞ": ["ㅜ", "ㅔ"],
    "ㅟ": ["ㅜ", "ㅣ"],
    "ㅢ": ["ㅡ", "ㅣ"],
}
const vowel_pattern = /[wy]?[aeiou]+/
const lip_pattern = /[mbp].?/
const silence_pattern = /[?.,\s]/

export default function scheduleFacePose(token, duration) {
    // console.log(token)
    // console.log(duration)

    // 1. list of tuple로 구성 (phoneme, accumulated frame until current phoneme, frame_len)
    var cumul_frm_len = [0]
    var step
    var result = []
    duration.reduce(
        (p, c) => {
            cumul_frm_len.push(p+c)
            return p+c
        }, 0
    )
    cumul_frm_len.pop()
    for (step = 0; step < duration.length; step++) {
        // 2. 모음이 들어간 경우, 순음인 경우, 공백인 경우 추출
        const t = token[step]
        if (t.match(vowel_pattern) || t.match(lip_pattern) || t.match(silence_pattern)){
            result.push([token[step], cumul_frm_len[step], duration[step]])
        }
    }
    
    // 3. Simplify vowel
    var result_simple_vowel = []
    var eng_vowel, kor_vowel, alter_kor_vowel, alter_eng_vowel, new_e
    var alter_kor_vowels, div_len_frame, alter_eng_vowel1, alter_eng_vowel2, new_e1, new_e2
    for (const e of result) {
        if (e[0].match(vowel_pattern)) {
            eng_vowel = e[0]
            kor_vowel = dict_engkor_vowel[eng_vowel]
            if (kor_vowel in tongue_vowels) {
                alter_kor_vowel = tongue_vowels[kor_vowel]
                alter_eng_vowel = dict_koreng_vowel[alter_kor_vowel]
                new_e = [alter_eng_vowel, e[1], e[2]]
                result_simple_vowel.push(new_e)
            }
            else if (kor_vowel in dual_vowels) {
                alter_kor_vowels = dual_vowels[kor_vowel]
                div_len_frame = e[2] / 2
                alter_eng_vowel1 = dict_koreng_vowel[alter_kor_vowels[0]]
                alter_eng_vowel2 = dict_koreng_vowel[alter_kor_vowels[1]]
                new_e1 = [alter_eng_vowel1, e[1], div_len_frame]
                new_e2 = [alter_eng_vowel2, e[1] + div_len_frame, div_len_frame]
                result_simple_vowel.push(new_e1)
                result_simple_vowel.push(new_e2)
            }
            else {
                result_simple_vowel.push(e)
            }
        }
        else {
            result_simple_vowel.push(e)
        }
    }
    
    // 4. insert frame index / and alter lip and silence to base pose
    var output = []
    var _phmn, _frame_idx
    for (var el of result_simple_vowel) {
        _phmn = el[0]
        if (el[0].match(lip_pattern) || el[0].match(silence_pattern)) {
            _phmn = "base"
        }
        _frame_idx = el[1] + el[2] / 2
        output.push([_phmn, _frame_idx])
    }

    // 5. stretch final mouth close
    output[output.length - 1][1] += 10

    // 6. 단순 전체 shift
    const shift_len = 0
    if (shift_len !== 0) {
        output = output.map(x => [x[0], x[1] - shift_len])
    }
    
    return output
}