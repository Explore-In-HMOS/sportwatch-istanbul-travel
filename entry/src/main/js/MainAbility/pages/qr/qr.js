import router from '@ohos.router';
import device from '@system.device';

export default {
    data: {
        link: '',
        qrValue: 'https://developer.huawei.com',
        isCircular: true
    },

    onInit(){
        if (this.link !== '' && this.link ) {
            this.qrValue = this.link;
        }

        let self = this;
        device.getInfo({
            success: function (data) {
                let sw = data.windowWidth || 454;
                if (sw <= 300) {
                    self.isCircular = false;
                }
            },
            fail: function () {}
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
    }
}
