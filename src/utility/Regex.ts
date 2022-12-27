export const invisChars = new RegExp(
     /[\u034f\u2800\u{E0000}\u180e\ufeff\u2000-\u200d\u206D]/gu
);
export const racism = new RegExp(
     /(?:(?:\b(?<![-=\.])|monka)(?:[Nnñ]|[Ii7]V)|[\/|]\\[\/|])[\s\.]*?[liI1y!j\/|]+[\s\.]*?(?:[GgbB6934Q🅱qğĜƃ၅5\*][\s\.]*?){2,}(?!arcS|l|Ktlw|ylul|ie217|64|\d? ?times)/
);
export const accents = new RegExp(/[\u0300-\u036f]/g);
export const punctuation = new RegExp(/[!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]/g);
export const nonEnglish = new RegExp(/[^\x00-\x7F]+/gu);
export const slurs =
     /amerykaniec|angol|arabus|asfalt|bambus|brudas|brudaska|Brytol|chachoł|chinol|ciapaty|czarnuch|fryc|gudłaj|helmut|japoniec|kacap|kacapka|kebab|kitajec|koszerny|kozojebca|kudłacz|makaroniarz|małpa|Moskal|negatyw|parch|pejsaty|rezun|Rusek|Ruska|skośnooki|syfiara|syfiarz|szkop|szmatogłowy|szuwaks|szwab|szwabka|turas|wietnamiec|żabojad|żółtek|żydek|Żydzisko|zabojad|zoltek|zydek|zydzisko|matoglowy|chachol|szuwak|tura|fag|f@g|f@ag|faag|f@gg|fagg|f@gg0|f@ggo/imsu;
export const test = new RegExp(/^[A-Z_\d]{4,25}$/i);
