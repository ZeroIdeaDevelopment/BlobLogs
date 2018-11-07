module.exports = (inputFormat, inputVariables) => {
    let depthCounter = 0;
    let inVar = false;
    let variables = [];
    let tmp = '';
    let out = inputFormat;

    for (let char of inputFormat) {
        if (char === '{') {
            if (inVar) throw new Error();
            inVar = true;
        } else if (char === '}') {
            if (!inVar) throw new Error();
            inVar = false;
        } else {
            if (inVar) {
                tmp += char;
            }
        }
        if (!inVar) {
            let t = tmp.split('.');
            if (t.length > 1) {
                variables.push({
                    parent: t[0],
                    child: t[1]
                });
            } else {
                if (t[0] !== '') {
                    variables.push({
                        parent: t[0]
                    });
                }
            }
            tmp = '';
        }
    }

    for (let vari of variables) {
        if (inputVariables[vari.parent] === undefined) continue;
        if (typeof inputVariables[vari.parent] === 'object') {
            for (let child in inputVariables[vari.parent]) {
                if (vari.child !== child) continue;
                out = out.replace(new RegExp('{' + vari.parent + '.' + vari.child + '}'), inputVariables[vari.parent][vari.child]);
            }
        } else {
            out = out.replace(new RegExp('{' + vari.parent + '}'), inputVariables[vari.parent]);
        }
    }

    return out;
};