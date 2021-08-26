export function nonUnique(l) {
    l.sort()
    var not_uniques = []
    for (let i=0; i<l.length-1; i++) {
        if (l[i] == l[i+1]) {
            not_uniques.push(l[i])
        }

    }

    return not_uniques
}