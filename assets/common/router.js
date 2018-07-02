const router = { //依据当前hash值，找到对应的组件(页面)
	'#/index/index': {
		nodeName: ['首页', '首页'],
		compontent:function(){
			return <Index/>
		} 
	},
	'#/scheme/list': {
		nodeName: ['金融方案', '列表'],
		compontent:function(){
			return <ListScheme/>
		} 
	},
	'#/scheme/form': {
		nodeName: ['金融方案', '表单'],
		compontent:function(){
			return <FormScheme/>
		} 
	},
	'#/capital/list': {
		nodeName: ['资金方管理', '列表'],
		compontent:function(){
			return <ListCapital/>
		} 
	},
	'#/capital/form': {
		nodeName: ['资金方管理', '表单'],
		compontent:function(){
			return <FormCapital/>
		} 
	},
	'#/dealer/list': {
		nodeName: ['车商管理', '列表'],
		compontent:function(){
			return <ListDealer/>
		} 
	},
	'#/dealer/form': {
		nodeName: ['车商管理', '表单'],
		compontent:function(){
			return <FormDealer/>
		} 
	},
	'#/order/list': {
		nodeName: ['订单管理', '列表'],
		compontent:function(){
			return <ListOrder/>
		} 
	},
	'#/order/form': {
		nodeName: ['订单管理', '表单'],
		compontent:function(){
			return <FormOrder/>
		} 
	},
}