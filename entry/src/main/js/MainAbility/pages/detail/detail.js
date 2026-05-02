import router from '@ohos.router';
import device from '@system.device';

export default {
    data: {
        place: null,
        similarPlaces: [],
        similarPlacesStr: '',
        hasSimilarPlaces: false,
        placeIdx: '0',
        name: '',
        type: '',
        shortDescription: '',
        fullDescription: '',
        address: '',
        latitude: null,
        longitude: null,
        regularOpen: '',
        regularClose: '',
        boxOfficeClose: '',
        nightOpen: '',
        nightClose: '',
        hasNight: false,
        phone1: '',
        phone2: '',
        email: '',
        ticketPurchaseLink: '',
        descHeight: 100,
        addrHeight: 80,
        contactHeight: 160,
        cw: 340,
        dw: '100%',
        nw: '100%',
        imgH: 160,
        headerH: 310,
        hoursJustify: 'space-around',
        isCircular: true,
        linkExists: false
    },
    calcTextHeight: function (text, charsPerLine, lineHeight, extra) {
        if (!text || text.length === 0) {
            return extra + lineHeight;
        }
        let lines = Math.ceil(text.length / charsPerLine);
        if (lines < 1) {
            lines = 1;
        }
        return lines * lineHeight + extra;
    },
    recalcHeights: function () {
        let cpl = Math.floor((this.cw - 40) / 15);
        this.descHeight = this.calcTextHeight(this.shortDescription, cpl, 32, 12);
        this.addrHeight = this.calcTextHeight(this.address, cpl, 32, 64);
        let contactLines = 0;
        if (this.phone1) {contactLines++};
        if (this.phone2) {contactLines++};
        if (this.email) {contactLines++};
        this.contactHeight = 50 + contactLines * 26;
    },
    onInit() {
        if (this.place) {
            let p = JSON.parse(this.place);
            this.name = p.name || '';
            this.type = p.type || '';
            this.shortDescription = p.shortDescription || '';
            this.fullDescription = p.fullDescription || '';
            this.address = p.address || '';
            this.latitude = p.latitude || 0;
            this.longitude = p.longitude || 0;
            if (p.open_close_hours && p.open_close_hours.regular) {
                let r = p.open_close_hours.regular;
                this.regularOpen = r.opening_time || '';
                this.regularClose = r.closing_time || '';
                this.boxOfficeClose = r.box_office_closing_time || '';
            }
            if (p.open_close_hours && p.open_close_hours.night &&
                p.open_close_hours.night.opening_time !== '00:00') {
                let n = p.open_close_hours.night;
                this.nightOpen = n.opening_time || '';
                this.nightClose = n.closing_time || '';
                this.hasNight = true;
            }
            if (p.contact) {
                this.phone1 = p.contact.phone_1 || '';
                this.phone2 = p.contact.phone_2 || '';
                this.email = p.contact.email || '';
            }
            if (p.ticketPurchaseLink && p.ticketPurchaseLink !== '') {
                this.ticketPurchaseLink = p.ticketPurchaseLink;
                this.linkExists = true;
            }
        }
        this.recalcHeights();
        if (this.similarPlacesStr) {
            this.similarPlaces = JSON.parse(this.similarPlacesStr);
            this.hasSimilarPlaces = this.similarPlaces.length > 0;
        }
        let self = this;
        device.getInfo({
            success: function (data) {
                let sw = data.windowWidth || 454;
                if (sw <= 300) {
                    // Small rectangle device
                    self.cw = 256;
                    self.dw = '99%';
                    self.nw = '99%';
                    self.imgH = 120;
                    self.headerH = 270;
                    self.hoursJustify = 'space-between';
                    self.isCircular = false;
                }
                if (sw > 300 && sw <= 350) {
                    // Medium rectangle device
                    self.cw = 330;
                    self.dw = '99%';
                    self.nw = '99%';
                    self.isCircular = false;
                }
                if (sw > 350 && sw <= 420) {
                    // Large rectangle device
                    self.cw = 370;
                    self.dw = '99%';
                    self.nw = '99%';
                    self.isCircular = false;
                }
                self.recalcHeights();
            },
            fail: function () {
            }
        });
    },
    goBack() {
        router.replace({
            uri: 'pages/index/index'
        });
    },
    onSwipe(e) {
        if (e.direction === 'right') {
            this.goBack();
        }
    },
    onQrClick() {
        router.replace({
            uri: 'pages/qr/qr',
            params: {
                link: this.ticketPurchaseLink
            }
        });
    },
    onSimilarPlaceClick(similarPlace) {
        let currentPlace = JSON.parse(this.place);
        let newSimilar = this.similarPlaces.filter(function (p) {
            return p.originalIdx !== similarPlace.originalIdx;
        });
        newSimilar.push(currentPlace);
        router.replace({
            uri: 'pages/detail/detail',
            params: {
                place: JSON.stringify(similarPlace),
                placeIdx: similarPlace.originalIdx,
                similarPlacesStr: JSON.stringify(newSimilar)
            }
        });
    }
};