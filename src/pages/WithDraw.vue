<template>
    <div>
        <box gap="40px">
            <span style="font-size: 20px;font-weight: 400;">提现</span>
        </box>
        <group :title="`最多提现${maxCount}元`">
            <x-number title="提现金额" v-model="formBean.money" :min="0" :step="10" fillable/>
            <popup-picker title="选择提现方式" :data="channels" v-model="val" placeholder="选择提现方式" @on-change="handleChange"></popup-picker>
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
    data() {
        return {
            formBean: {
                money: 10,
                channel: '1', //1:wechat 2：ali
            },
            channels: 
            [
                [
                    '微信账号', '支付宝账号'
                ]
            ],
            val: ['微信账号'],
        }
    },
    computed: {
        ...mapState(['user']),
        maxCount() {
            return parseInt(this.user.money/10)*10
        }
    },
    methods: {
        handleOk() {
            if (this.formBean.money > this.maxCount) {
                this.$vux.toast.text('超过提现上限')
                return 
            }
            if (!this.user.wechat_account && this.formBean.channel == '1') {
                this.$vux.alert.show({
                    title: '微信账号还未完善',
                    onHide : _ => {
                        this.$router.push('/edit-profile')
                    }
                })
                return
            }
            if (!this.user.alipay_account && this.formBean.channel == '2') {
                this.$vux.alert.show({
                    title: '支付宝账号还未完善',
                    onHide : _ => {
                        this.$router.push('/edit-profile')
                    }
                })
                return
            }
            withdraw(this.formBean).then(r => {
                this.$router.push('/success')
            }) 
        },
        handleChange(val) {
            // console.log('val change', val)
            let t = val[0]
            this.formBean.channel = t === '微信账号' ? '1' : '2'
        }
    }
}
</script>
