import router from '@ohos.router';

export default {
    data: {
        categoryItems: [],
        selectedCategoryName: 'All',
        allCategories: ''
    },
    onInit() {
        let names = ['All'];
        if (this.allCategories) {
            names = names.concat(JSON.parse(this.allCategories));
        }
        let selected = this.selectedCategoryName || 'All';
        let items = [];
        for (let i = 0; i < names.length; i++) {
            items.push({
                name: names[i],
                textColor: names[i] === selected ? '#FFFFFF' : '#1A1A2E',
                bgColor: names[i] === selected ? '#C0392B' : '#FFFFFF'
            });
        }
        this.categoryItems = items;
    },
    selectCategory(name) {
        router.replace({
            uri: 'pages/index/index',
            params: {
                selectedCategoryName: name
            }
        });
    },
    onSwipe(e) {
        if (e.direction === 'right') {
            this.goBack();
        }
    },
    goBack() {
        router.replace({
            uri: 'pages/index/index',
            params: {
                selectedCategoryName: this.selectedCategoryName
            }
        });
    }
};
