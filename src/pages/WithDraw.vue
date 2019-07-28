<template>
    <div>
        <box gap="40px">
            <span style="font-size: 20px;font-weight: 400;">提现</span>
        </box>
        <group title="只能是10的整数倍，10 20 ...">
            <x-number title="提现金额" v-model="formBean.money" :min="0" :step="10" fillable/>
            <popup-picker title="选择提现方式" :data="channels" v-model="formBean.channel"></popup-picker>
        </group>
        <box gap="100px 10px 0">
            <x-button type="primary" @click.native="handleOk">确定</x-button>
        </box>
    </div>
</template>

<script>
import { withdraw } from '@/utils/api'
import { mapState } from 'vuex'
export default {
    data: _ => ({
        formBean: {
            money: 10,
            channel: '1', //1:wechat 2：ali
        },
        channels: [
            [
              {name: '微信账号', value: '1'},
              {name: '支付宝账号', value: '2'},
            ]
        ],
        // channels: [[{
        // name: '2019届5班',
        // value: '1'
        // }, {
        // name: '2019届4班',
        // value: '2'
        // }]]
        
    }),
    computed: {
        ...mapState(['user'])
    },
    methods: {
        handleOk() {
            if (!this.user.wecaht_account && this.formBean.channel == '1') {
                this.$vux.alert.show({
                    title: '微信账号还未完善',
                    onHide : _ => {
                        this.$router.push('/edit-profile')
                    }
                })
                return
            }
            if (!this.user.ali_account && this.formBean.channel == '2') {
                this.$vux.alert.show({
                    title: '支付宝账号还未完善',
                    onHide : _ => {
                        this.$router.push('/edit-profile')
                    }
                })
                return
            }
            withdraw(this.formBean).then(r => {

            }) 
        }
    }
}
</script>
