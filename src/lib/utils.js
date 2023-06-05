
export const getBuffer = (file) =>
    new Promise((resolve, reject) => {
        const fr = new FileReader();
        fr.onload = () => resolve(fr);
        fr.onerror = (err) => reject(err);
        fr.readAsArrayBuffer(file);
    })
export const formToJson = (formData) => {
    const formObject = {};
    for (let [key, value] of formData.entries()) {
        const keys = key.split(/\[(.*?)\]/).filter(Boolean);
        let objRef = formObject;
        for (let i = 0; i < keys.length; i++) {
            const currentKey = keys[i];
            const isLastKey = i === keys.length - 1;
            if (isLastKey) {
                objRef[currentKey] = value;
            } else {
                const isArray = Number.isInteger(Number(keys[i + 1]));
                objRef[currentKey] =
                    objRef[currentKey] || (isArray ? [] : {});
                objRef = objRef[currentKey];
            }
        }
    }
    return formObject;
};

export const appendFormData = (formData1, formData2) => {
    for (const pair of formData2.entries()) {
        formData1.append(pair[0], pair[1]);
    }
    return formData1
}

export const negateString = (string) => `^((?!${string}).)*$`
// Group to unique value
export const groupToOne = function (xs, key) {
    return xs.reduce(function (rv, x) {
        rv[x[key]] = x
        return rv;
    }, {});
};
// Group to array 
export const groupToArray = function (xs, key) {
    return xs.reduce(function (rv, x) {
        (rv[x[key]] = rv[x[key]] || []).push(x);
        return rv;
    }, {});
};

export const groupToMap = function (array, key) {
    return array.reduce((acc, cur) => {
        acc.set(cur[key], [...(acc.get(cur[key]) || []), cur])
        return acc
    }, new Map())
}

export const dateToInput = (date) => {
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    return date.getFullYear() + "-" + (month) + "-" + (day);
}