const Layout = antd.Layout;
const Header = antd.Layout.Header;
const Content = antd.Layout.Content;
const Sider = antd.Layout.Sider;
const Menu = antd.Menu;
const SubMenu = antd.Menu.SubMenu;
const MenuItemGroup = antd.Menu.ItemGroup;
const Icon = antd.Icon;
const Breadcrumb = antd.Breadcrumb;
const Button = antd.Button;
const Input = antd.Input;
const Row = antd.Row;
const Table = antd.Table;
const Col = antd.Col;
const Pagination = antd.Pagination;
const TreeSelect = antd.TreeSelect;
const Modal = antd.Modal;

class HomePage extends React.Component {
	init = () => { //组件的一些初始化操作
		window.addEventListener('hashchange', () => { //监听hash
			this.hashChange();
		});
	};
	state = {
		collapsed: false,
		logo: 'assets/common/image/logo.jpg',
		footer: 'assets/common/image/footer.jpg',
		marginLeft: 200,
		nodeName: [],
		defaultOpenKeys: [],
		defaultSelectedKeys:[],
	};
	toggle = () => {
		if(this.state.marginLeft == 200) {
			this.setState({
				collapsed: !this.state.collapsed,
				logo: 'assets/common/image/smallLogo.jpg',
				footer: 'assets/common/image/smallfooter.jpg',
				marginLeft: 80,
			},()=>{
				
			});
		} else {
			this.setState({
				collapsed: !this.state.collapsed,
				logo: 'assets/common/image/logo.jpg',
				footer: 'assets/common/image/footer.jpg',
				marginLeft: 200,
			},()=>{
				
			});
		}
	};
	onOpenChange = (defaultOpenKeys) => {
		this.setState({
			defaultOpenKeys:new Array(defaultOpenKeys[defaultOpenKeys.length - 1]),
		},()=>{
				
		});
	}
	handleClick = (e) => {
		let hash = '#/' + e.key.split(",").join("/");
		window.location.hash = hash;
	};
	hashChange = () => {
		if(window.location.hash == '') window.location.hash = '#/index/index';
		let hash = window.location.hash;
		let defaultOpenKeys = hash.substr(2).split("/")[0].split("/");
		let defaultSelectedKeys = new Array(hash.substr(2).split("/").join(","));
		this.setState({
			defaultOpenKeys,
			defaultSelectedKeys,
		}, () => {
			console.log(this.state.defaultOpenKeys);
			console.log(this.state.defaultSelectedKeys);
			this.refresh();
		});
	};
	refresh = () => {
		ReactDOM.render(<div><Icon type="loading" /></div>,document.getElementById('antd-main')); //重置一下，不然无法刷新
		let $myRouter = window.router[window.location.hash];
		if($myRouter != undefined) {
			this.setState({
				nodeName: $myRouter.nodeName
			}, () => {
				setTimeout((id = 'antd-main') => { //延迟0.1秒
					ReactDOM.render($myRouter.compontent(), document.getElementById(id));
				}, 100)
			});
		} else {
			Modal.warning({
				title: '提示',
				content: '路由解析异常',
			});
		}
	}
	componentWillMount() {
		//按照路由渲染组件-->让后台知道
		this.init();
		this.hashChange();
	};
	componentDidMount() { /**/ };
	render() {
		return(
			<Layout>
				<Sider trigger={null} collapsible collapsed={this.state.collapsed} className="sider">
					<div className="logo" style={{}}>
						<img style={{marginTop:12}} src={this.state.logo}/>
					</div>
					<Menu onClick={this.handleClick} onOpenChange={this.onOpenChange} className="menu" defaultSelectedKeys={this.state.defaultSelectedKeys} defaultOpenKeys={this.state.defaultOpenKeys} mode="inline">
						<SubMenu key="index" title={<span>
							<Icon type="ant-design" /><span>首页</span></span>}>
							<Menu.Item key="index,index">首页</Menu.Item>
						</SubMenu>
						<SubMenu key="order" title={<span>
							<Icon type="file" /><span>进件管理</span></span>}>
							<Menu.Item key="order,list">列表</Menu.Item>
							<Menu.Item key="order,form">新增进件</Menu.Item>
						</SubMenu>
						<SubMenu key="scheme" title={<span>
							<Icon type="profile" /><span>金融方案</span></span>}>
							<Menu.Item key="scheme,list">列表</Menu.Item>
							<Menu.Item key="scheme,form">新增金融方案</Menu.Item>
						</SubMenu>
						<SubMenu key="dealer" title={<span>
							<Icon type="appstore" /><span>车商报备</span></span>}>
							<Menu.Item key="dealer,list">列表</Menu.Item>
							<Menu.Item key="dealer,form">新增车商报备</Menu.Item>
						</SubMenu>
						<SubMenu key="capital" title={<span>
							<Icon type="pie-chart" /><span>资金方报备</span></span>}>
							<Menu.Item key="capital,list">列表</Menu.Item>
							<Menu.Item key="capital,form">新增资金方报备</Menu.Item>
						</SubMenu>
						<SubMenu key="download" title={<span>
							<Icon type="download" /><span>下载中心</span></span>}>
							<Menu.Item key="download,download">下载中心</Menu.Item>
						</SubMenu>
					</Menu>
					<div className="logo" style={{borderTop: '1px solid #f2f2f2'}}>
						<img style={{}} src={this.state.footer}/>
					</div>
				</Sider>
				<Layout style={{ padding:0,background: '#FCFCFF',marginLeft:this.state.marginLeft,height: '100vh'}}>
					<Header style={{background: '#fff',paddingRight:20,paddingLeft:20,curdor: 'pointer',borderBottom: '1px solid #f2f2f2'}}>
						<div style={{float: 'left'}}>
							<Icon type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'} style={{marginRight:20,cursor: 'pointer'}} onClick={this.toggle} />
							<Icon type="html5" />
						</div>
						<div style={{float: 'right'}}>
							<Icon type="chrome" style={{marginRight:20}} />
							<Icon type="twitter" />
						</div>
					</Header>
					<Header style={{background: '#fff',paddingLeft:20}}>
						<Breadcrumb style={{marginTop:20}}>
							<Breadcrumb.Item>{this.state.nodeName[0]}</Breadcrumb.Item>
							<Breadcrumb.Item style={{cursor:'pointer',color:'#1890ff'}} onClick={() => { this.refresh()} }>{this.state.nodeName[1]}</Breadcrumb.Item>
						</Breadcrumb>
					</Header>
					<Content id='antd-main' style={{ padding: 18, margin: 0, minHeight: 520 ,overflow: 'auto',fontSize:12}}></Content>
				</Layout>
			</Layout>
		);
	}
}