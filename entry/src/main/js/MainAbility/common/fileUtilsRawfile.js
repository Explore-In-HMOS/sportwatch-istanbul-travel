import file from '@system.file';

/**
 * Reads a json file, and returns the json object
 * @param {string} path - path string.
 * @returns {object} - json object
 */
export function readRawfile(path) {
    let json = {};
    file.readText({

        uri: `internal://app/rawfile/${path}`,
        success: (res) => {
            json = JSON.parse(res.text)
        },
        fail: (data, err) => {
            console.error(`Tried to read path: internal://app/rawfile/ ${path}`)
            console.error(`Read file error, data: ${data}, error: ${err}`);
        }
    });
    return json;
}

function readPlace(id) {
    let raw = readRawfile(`places/${id}.json`);
    if (!raw) {
        return null;
    }
    console.debug(raw);
    return raw;
}

function readAllPlaces() {
    let manifestRaw = readRawfile('places/manifest.json');
    if (!manifestRaw) {
        return [];
    }
    let count = manifestRaw.count ?? 0;
    let places = [];
    for (let i = 0; i < count; i++) {
        let place = readPlace(i);
        if (place) {
            places.push(place);
        }
    }
    return places;
}

export default {
    readRawFile: readRawfile,
    readPlace: readPlace,
    readAllPlaces: readAllPlaces
};
