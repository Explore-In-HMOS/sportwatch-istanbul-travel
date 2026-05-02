import router from '@ohos.router';
import fileUtils from '../../common/fileUtils';

export default {
    data: {
        places: [],
        allCategories: [
            'Archaeology',
            'Palace',
            'Tower',
            'Museum',
            'Fortress',
            'Mosque'
        ],
        selectedCategoryName: 'All',
        allPlaces: []
    },
    onInit() {
        let raw = fileUtils.readAllPlaces();
        for (let i = 0; i < raw.length; i++) {
            raw[i].originalIdx = i;
        }
        this.allPlaces = raw;
        if (this.selectedCategoryName && this.selectedCategoryName !== 'All') {
            this.filterPlaces();
        } else {
            this.selectedCategoryName = 'All';
            this.places = this.allPlaces;
        }
        console.info(`Places loaded: ${this.allPlaces.length}`);
    },
    openCategoryPicker() {
        router.replace({
            uri: 'pages/category/category',
            params: {
                selectedCategoryName: this.selectedCategoryName,
                allCategories: JSON.stringify(this.allCategories)
            }
        });
    },
    filterPlaces() {
        if (this.selectedCategoryName === 'All') {
            this.places = this.allPlaces;
        } else {
            let cat = this.selectedCategoryName;
            this.places = this.allPlaces.filter(function (place) {
                return place.type === cat;
            });
        }
    },
    onItemClick(idx, place) {
        let sameCat = this.allPlaces.filter(function (p) {
            return p.type === place.type && p.originalIdx !== place.originalIdx;
        });
        router.replace({
            uri: 'pages/detail/detail',
            params: {
                place: JSON.stringify(place),
                placeIdx: place.originalIdx,
                similarPlacesStr: JSON.stringify(sameCat)
            }
        });
    }
};
